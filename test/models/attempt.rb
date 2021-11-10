# frozen_string_literal: true

require "test_helper"

class AttemptTest < ActiveSupport::TestCase
  def setup
    @user = User.new(
      first_name: "Sam", last_name: "Smith", email: "lol@example.com", password: "password",
      password_confirmation: "password")

    @quiz = @user.quizzes.new(name: "test")
    @user.save

    @attempt = @user.attempts.new(
      quiz_id: @quiz.id)
  end

  def test_invalid_without_quiz_id
    assert_not @attempt.update(quiz_id: nil)
  end

  def test_default_submitted_value_false
    @attempt.save
    assert_not @attempt.submitted
  end

  def test_submitted_true_if_answers_exist
    @quiz_question = @quiz.quiz_questions.new(name: "question")
    @quiz_option = @quiz_question.quiz_options.new(name: "option")
    @quiz_question.save
    @attempt.attempt_answers.new(
      quiz_question_id: @quiz_question.id,
      quiz_option_id: @quiz_option.id)
    @attempt.save

    assert @attempt.submitted
  end
end