# frozen_string_literal: true

class QuizzesController < ApplicationController
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index
  before_action :authenticate_user_using_x_auth_token
  before_action :load_quiz, only: %i[show update destroy]

  def index
    @quizzes = policy_scope(Quiz)
  end

  def create
    quiz = @current_user.quizzes.new(quiz_params)
    authorize quiz
    if quiz.save
      render status: :ok,
        json: { notice: t("successfully_created", entity: "Quiz") }
    else
      errors = quiz.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def update
    authorize @quiz

    if quiz_params[:publish]
      @quiz.set_slug
      @quiz.save
    else
      @quiz.update(quiz_params)
    end

    unless @quiz.errors
      render status: :unprocessable_entity,
        json: { error: @quiz.errors.full_messages.to_sentence }
    end
  end

  def destroy
    authorize @quiz
    if @quiz.destroy
      render status: :ok, json: {}
    else
      render status: :unprocessable_entity,
        json: { error: @quiz.errors.full_messages.to_sentence }
    end
  end

  private

    def quiz_params
      params.require(:quiz).permit(:name, :id, :publish)
    end

    def load_quiz
      @quiz = current_user.quizzes.find_by(id: params[:id])
      unless @quiz
        render status: :not_found, json: { error: t("quiz.not_found") }
      end
    end
end
