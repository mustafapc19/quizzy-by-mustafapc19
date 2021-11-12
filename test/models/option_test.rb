# frozen_string_literal: true

require "test_helper"

class OptionTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @quiz = create(:quiz, user_id: @user.id)
    @question = build(:question, quiz_id: @quiz.id)
    @question.options << build(:option)
    @question.options << build(:option)
    @option = @question.options.first
    @option.correct = true
  end

  def test_option_should_be_valid
    assert @option.valid?
  end

  def test_option_name_should_be_present
    @option.name = ""
    assert_not @option.valid?
    assert_equal ["Name can't be blank"], @option.errors.full_messages
  end

  # def test_question_id_should_be_present
  #   @option.question_id = nil
  #   assert_not @option.valid?
  # end

  # def test_question_id_should_be_valid
  #   @option.question_id = -1
  #   assert_not @option.valid?
  #   assert_equal ["Quiz question must exist"], @option.errors.full_messages
  # end

  def test_correct_is_false_by_default
    @wrong_option = @question.options.last
    assert @wrong_option.save
    assert_not @wrong_option.correct
  end
end
