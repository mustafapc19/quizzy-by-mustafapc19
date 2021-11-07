# frozen_string_literal: true

class AttemptsController < ApplicationController
  def index
    puts params
    @quiz = Quiz.find_by(slug: params[:slug])

    unless @quiz
      return
    end

    @questions = @quiz.quiz_question.map do |question|
      {
        "question" => question,
        "options" => question.quiz_option.map {
          |option| { id: option.id, name: option.name } }
      }
    end
  end
end
