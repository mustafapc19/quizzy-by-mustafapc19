# frozen_string_literal: true

class Public::AttemptsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, except: :index
  before_action :load_attempt, only: [:create, :update]
  before_action :load_quiz_by_slug, only: [:index]

  def index
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
    unless @attempt
      @attempt = @current_user.attempts.new(quiz_id: attempt_param[:quiz_id])
      unless @attempt.save
        render status: :unprocessable_entity,
          json: { error: @attempt.errors.full_messages.to_sentence }
      end
    end
  end

  def show
    @attempt = @current_user.attempts.find_by(id: params[:id])
    unless @attempt
      render status: :not_found, json: { error: t("attempt.not_found") }
    end

    @attempt_answers = @attempt.attempt_answers
  end

  def update
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

    def load_attempt
      @attempt = @current_user.attempts.find_by(quiz_id: attempt_param[:quiz_id])
    end

    def load_quiz_by_slug
      @quiz = Quiz.find_by(slug: params[:slug])
    end
end
