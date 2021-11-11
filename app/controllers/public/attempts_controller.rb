# frozen_string_literal: true

class Public::AttemptsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, except: :index

  def index
    unless params[:slug]
      return
    end

    @quiz = Quiz.find_by(slug: params[:slug])

    unless @quiz
      return
    end

    @questions = @quiz.questions.map do |question|
      {
        "id" => question.id,
        "name" => question.name,
        "created_at" => question.created_at,
        "options" => question.options.map {
          |option| { id: option.id, name: option.name } }
      }
    end
  end

  def create
    @attempt = @current_user.attempts.find_by(quiz_id: attempt_param[:quiz_id])

    unless @attempt
      @attempt = @current_user.attempts.new(quiz_id: attempt_param[:quiz_id])
      unless @attempt.save
        render status: :unprocessable_entity,
          json: { error: @attempt.errors.full_messages.to_sentence }
      end
    end
  end

  def show
    @attempt = Attempt.find_by(id: params[:id])
    unless @attempt
      render status: :not_found, json: { error: t("attempt.not_found") }
    end

    @attempt_answers = @attempt.attempt_answers
  end

  def update
    @attempt = @current_user.attempts.find_by(quiz_id: attempt_param[:quiz_id])

    if @attempt
      if @attempt.submitted
        render status: :unprocessable_entity,
          json: { error: t("attempt.already_submitted") }
      end

      @attempt.attributes = attempt_param

      unless @attempt.save
        render status: :unprocessable_entity,
          json: { error: @attempt.errors.full_messages.to_sentence }
      end
    else
      render status: :not_found, json: { error: t("attempt.not_found") }
    end
  end

  private

    def attempt_param
      params.require(:attempt_attributes).permit(
        :quiz_id,
        attempt_answers_attributes: [[:question_id, :option_id]])
    end
end
