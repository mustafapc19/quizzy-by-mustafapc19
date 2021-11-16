# frozen_string_literal: true

class Public::ReportsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :reject_if_not_administrator
  before_action :load_attempts, only: [:index, :export_start]

  def index
  end

  def export_start
    job_id = CreateSpreadsheetJob.perform_async(@current_user.id)

    if job_id
      render status: :ok,
        json: { job_id: job_id }
    else
      render status: :unprocessable_entity, json: { error: "Cannot export" }
    end
  end

  def export_status
    job_id = params[:id]
    status = Sidekiq::Status::status(job_id)

    if status
      render status: :ok,
        json: { status: status }
    else
      render status: :unprocessable_entity, json: { error: "Report request does not exist" }
    end
  end

  def export_download
    job_id = params[:id]
    file_path = file_path_from_job_id(job_id)

    # render status: :ok, json: { file_path: file_path }
    send_file "storage/#{file_path}", type: "application/xlsx; charset=utf-8", filename: file_path
    #
    # redirect_to file_path, status: :found
  end

  private

    def load_attempts
      @attempts = Attempt.includes(
        [:quiz, :user]
      ).where(quiz: { user_id: @current_user.id })
    end

    def file_path_from_job_id(job_id)
      "#{@current_user.first_name}-#{@current_user.last_name}-#{job_id}.xls"
    end
end
