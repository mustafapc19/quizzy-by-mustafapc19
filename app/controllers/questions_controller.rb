# frozen_string_literal: true

class QuestionsController < ApplicationController
  after_action :verify_authorized
  before_action :authenticate_user_using_x_auth_token
  before_action :load_quiz

  def index
    authorize @quiz
    @questions = @quiz.quiz_questions.map do |question|
      { "question" => question, "options" => question.quiz_option }
    end
    render status: :ok, json: @questions.to_json
  end

  def create
    authorize @quiz
    question = @quiz.quiz_questions.new(name: question_params[:name])

    question_params[:options].each do |option|
      question.quiz_option.new(option)
    end

    if question.save
      render status: :ok,
        json: { notice: t("successfully_created", entity: "Question") }
    else
      errors = question.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def update
    authorize @quiz
    question = @quiz.quiz_questions.find_by(id: params[:id])
    question.name = question_params[:name]

    question_params[:options].each do |option|
      question.quiz_option.update_or_create_by({ id: option[:id] }, option)
    end

    if question.save
      render status: :ok,
        json: { notice: t("successfully_updated", entity: "Question") }
    else
      errors = question.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def destroy
    authorize @quiz
    question = @quiz.quiz_questions.find_by(id: params[:id])
    if question.destroy
      render status: :ok, json: {}
    else
      render status: :unprocessable_entity,
        json: { error: question.errors.full_messages.to_sentence }
    end
end

  private

    def question_params
      params.require(:question).permit(:name, options: [[:name, :correct, :id]])
    end

    def load_quiz
      @quiz = @current_user.quizzes.find_by(id: params[:quiz_id])
      unless @quiz
        render status: :not_found, json: { error: t("quiz.not_found") }
      end
    end
end
