# frozen_string_literal: true

require "test_helper"

class AttemptAnswerTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)

    @quiz = @user.quizzes.new(name: "test")

    @question = @quiz.questions.new(name: "question")
    @option = @question.options.new(name: "option")
    @question.save

    @attempt = @user.attempts.new(
      quiz_id: @quiz.id)
    @attempt_answer = @attempt.attempt_answers.new(
      question_id: @question.id,
      option_id: @option.id)
    @attempt.save
  end

  def test_attempt_should_not_be_valid_and_saved_without_question
    @attempt_answer.update(question_id: nil)
    assert @attempt_answer.invalid?
  end

  def test_attempt_should_not_be_valid_and_saved_without_attempt
    assert_not @attempt_answer.update(attempt_id: nil)
  end

  def test_attempt_should_have_unique_set_of_question_and_attempt
    @attempt_answer_second = @attempt.attempt_answers.new(
      question_id: @question.id,
      option_id: @option.id)
    assert @attempt_answer_second.invalid?
  end
end
