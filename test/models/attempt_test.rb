# frozen_string_literal: true

require "test_helper"

class AttemptTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)

    @quiz = @user.quizzes.create(name: "test")

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
    @question = @quiz.questions.new(name: "question")
    @option = @question.options.new(name: "option", correct: true)
    @option_second = @question.options.new(name: "option")
    @quiz.save

    @attempt.attempt_answers.new(
      question_id: @question.id,
      option_id: @option.id)
    @attempt.save

    assert @attempt.submitted
  end

  def test_correct_answer_count_set_after_save
    @question = @quiz.questions.new(name: "question")
    @option = @question.options.new(name: "option", correct: true)
    @wrong_option = @question.options.new(name: "option")
    @quiz.save

    @attempt.attempt_answers.new(
      question_id: @question.id,
      option_id: @option.id)
    @attempt.save

    assert @attempt.correct_answers_count == 1
  end

  def test_incorrect_answer_count_set_after_save
    @question = @quiz.questions.new(name: "question")
    @option = @question.options.new(name: "option", correct: true)
    @wrong_option = @question.options.new(name: "option")
    @quiz.save

    @attempt.attempt_answers.new(
      question_id: @question.id,
      option_id: @wrong_option.id)
    @attempt.save

    assert @attempt.incorrect_answers_count == 1
  end

  def test_user_should_have_only_one_quiz_for_an_attempt
    @attempt.save
    @attempt_same = @user.attempts.new(
      quiz_id: @quiz.id)
    assert_not @attempt_same.valid?
  end
end
