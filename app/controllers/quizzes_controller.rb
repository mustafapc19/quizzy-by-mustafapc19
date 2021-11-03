# frozen_string_literal: true

class QuizzesController < ApplicationController
  after_action :verify_authorized
  before_action :authenticate_user_using_x_auth_token

  def create
    quiz = Quiz.new(quiz_params.merge(user_id: @current_user.id))
    authorize quiz
    if quiz.save
      render status: :ok,
        json: { notice: t("successfully_created", entity: "Quiz") }
    else
      errors = quiz.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  private

    def quiz_params
      params.require(:quiz).permit(:name)
    end
end
