# frozen_string_literal: true

class QuestionsController < ApplicationController
  after_action :verify_authorized
  before_action :authenticate_user_using_x_auth_token
  before_action :load_quiz

  def index
    authorize @quiz
    @questions = @quiz.quiz_question.map do |question|
      { "question" => question, "options" => question.quiz_option }
    end
    render status: :ok, json: @questions.to_json
  end

  def create
    authorize @quiz
    question = @quiz.quiz_question.new(name: question_params[:name])

    question_params[:options].each do |option|
      question.quiz_option.new(question_params[:options])
    end

    if question.save
      render status: :ok,
        json: { notice: t("successfully_created", entity: "Question") }
    else
      errors = question.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  private

    def question_params
      params.require(:question).permit(:name, options: [[:name, :correct]])
    end

    def load_quiz
      @quiz = @current_user.quizzes.find_by(id: params[:quiz_id])
      unless @quiz
        render status: :not_found, json: { error: t("quiz.not_found") }
      end
    end
end
