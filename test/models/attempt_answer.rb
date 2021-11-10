# frozen_string_literal: true

require "test_helper"

class AttemptAnswerTest < ActiveSupport::TestCase
  def setup
    @user = User.new(
      first_name: "Sam", last_name: "Smith", email: "lol@example.com", password: "password",
      password_confirmation: "password")

    @user.save
    @quiz = @user.quizzes.new(name: "test")

    @quiz_question = @quiz.quiz_questions.new(name: "question")
    @quiz_option = @quiz_question.quiz_options.new(name: "option")
    @quiz_question.save

    @attempt = @user.attempts.new(
      quiz_id: @quiz.id)
    @attempt_answer = @attempt.attempt_answers.new(
      quiz_question_id: @quiz_question.id,
      quiz_option_id: @quiz_option.id)
    @attempt.save
  end

  def test_attempt_should_not_be_valid_and_saved_without_question
    @attempt_answer.update(quiz_question_id: nil)
    assert @attempt_answer.invalid?
  end

  def test_attempt_should_not_be_valid_and_saved_without_attempt
    assert_not @attempt_answer.update(quiz_question_id: nil)
  end
end
