# frozen_string_literal: true

require "test_helper"

class QuizTest < ActiveSupport::TestCase
  def setup
    @user = User.new(
      first_name: "Sam", last_name: "Smith", email: "sam@example.com", password: "password",
      password_confirmation: "password")
    @user.save
    @quiz = Quiz.new(name: "test", user_id: @user.id)
  end

  def test_quiz_should_be_valid
    assert @quiz.valid?
  end

  def test_name_should_be_present
    @quiz.name = ""
    assert_not @quiz.valid?
    assert_equal ["Name can't be blank"], @quiz.errors.full_messages
  end

  def test_user_id_should_be_present
    @quiz.user_id = nil
    assert_not @quiz.valid?
  end

  def test_user_id_should_be_valid
    @quiz.user_id = -1
    assert_not @quiz.valid?
    assert_equal ["User must exist"], @quiz.errors.full_messages
  end
end