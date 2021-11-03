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

  def update
    authorize @quiz
    if @quiz.update(quiz_params)
      render status: :ok, json: {}
    else
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
      params.require(:quiz).permit(:name, :id)
    end

    def load_quiz
      @quiz = Quiz.find_by(id: params[:id])
      unless @quiz
        render status: :not_found, json: { error: t("quiz.not_found") }
      end
    end
end
