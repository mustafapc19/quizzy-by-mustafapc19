# frozen_string_literal: true

class QuestionsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :load_quiz
  before_action :authorize_and_find_question, only: %i[show update destroy]
  after_action :verify_authorized

  def index
    authorize @quiz
    @questions = @quiz.questions
  end

  def create
    authorize @quiz

    question = @quiz.questions.new()
    question.attributes = question_params

    if question.save
      render status: :ok,
        json: { notice: t("successfully_created", entity: "Question") }
    else
      errors = question.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def show
    unless @question
      render status: :not_found, json: { error: t("question.not_found") }
    end
  end

  def update
    @question.attributes = question_params

    if @question.save
      render status: :ok,
        json: { notice: t("successfully_updated", entity: "Question") }
    else
      errors = @question.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def destroy
    if @question.destroy
      render status: :ok, json: {}
    else
      render status: :unprocessable_entity,
        json: { error: @question.errors.full_messages.to_sentence }
    end
end

  private

    def question_params
      params.require(:question).permit(:name, options_attributes: [[:name, :correct, :id, :_destroy]])
    end

    def load_quiz
      @quiz = @current_user.quizzes.find_by(id: params[:quiz_id])
      unless @quiz
        render status: :not_found, json: { error: t("quiz.not_found") }
      end
    end

    def authorize_and_find_question
      authorize @quiz
      @question = @quiz.questions.find_by(id: params[:id])
    end
end
