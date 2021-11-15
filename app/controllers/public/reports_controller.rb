# frozen_string_literal: true

class Public::ReportsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :reject_if_not_administrator

  def index
    @quizzes = User.includes(
      quizzes: { attempts: [:attempt_answers] })
      .where(attempts: { submitted: true })
      .find_by_id(@current_user.id).quizzes
  end
end
