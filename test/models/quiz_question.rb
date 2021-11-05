# frozen_string_literal: true

require "test_helper"

class QuizQuiestionTest < ActiveSupport::TestCase
  def setup
    @user = User.new(
      first_name: "Sam", last_name: "Smith", email: "sam@example.com", password: "password",
      password_confirmation: "password")
    @user.save
    @quiz = Quiz.new(name: "test", user_id: @user.id)
    @quiz.save
    @question = QuizQuestion.new(name: "test_question", quiz_id: @quiz.id)
  end

  def test_question_should_be_valid
    assert @question.valid?
  end

  def test_question_name_should_be_present
    @question.name = ""
    assert_not @question.valid?
    assert_equal ["Name can't be blank"], @question.errors.full_messages
  end

  def test_quiz_id_should_be_present
    @question.quiz_id = nil
    assert_not @question.valid?
  end

  def test_quiz_id_should_be_valid
    @question.quiz_id = -1
    assert_not @question.valid?
    assert_equal ["Quiz must exist"], @question.errors.full_messages
  end
end
