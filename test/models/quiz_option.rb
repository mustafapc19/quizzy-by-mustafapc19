# frozen_string_literal: true

require "test_helper"

class QuizOptionTest < ActiveSupport::TestCase
  def setup
    @user = User.new(
      first_name: "Sam", last_name: "Smith", email: "sam@example.com", password: "password",
      password_confirmation: "password")
    @user.save
    @quiz = Quiz.new(name: "test", user_id: @user.id)
    @quiz.save
    @question = QuizQuestion.new(name: "test_question", quiz_id: @quiz.id)
    @question.save
    @option = QuizOption.new(name: "test_option", quiz_question_id: @question.id)
  end

  def test_option_should_be_valid
    assert @option.valid?
  end

  def test_option_name_should_be_present
    @option.name = ""
    assert_not @option.valid?
    assert_equal ["Name can't be blank"], @option.errors.full_messages
end

  def test_question_id_should_be_present
    @option.quiz_question_id = nil
    assert_not @option.valid?
  end

  def test_question_id_should_be_valid
    @option.quiz_question_id = -1
    assert_not @option.valid?
    assert_equal ["Quiz question must exist"], @option.errors.full_messages
  end

  def test_correct_is_false_by_default
    @option.correct = nil
    assert @option.save
    assert_not @option.correct
  end
end
