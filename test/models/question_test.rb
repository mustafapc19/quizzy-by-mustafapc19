# frozen_string_literal: true

require "test_helper"

class QuestionTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @quiz = create(:quiz, user_id: @user.id)
    @question = build(:question, quiz_id: @quiz.id)
    @question.options << build(:option)
    @question.options << build(:option)
    @question.options.first.correct = true
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

  def test_only_one_question_should_be_correct
    @question.options.first.correct = true
    @question.options.last.correct = true

    assert_not @question.save
    assert_equal ["Options Exactly one option has to be correct"],
      @question.errors.full_messages
  end

  def test_number_of_options_should_be_more_than_two
    @invalid_question = build(:question, quiz_id: @quiz.id)
    assert_not @invalid_question.save
    assert_equal ["Options Only 2-4 options are allowed", "Options Exactly one option has to be correct"],
      @invalid_question.errors.full_messages
  end

  def test_number_of_options_should_be_less_than_four
    @invalid_question = build(:question, quiz_id: @quiz.id)
    @invalid_question.options << build(:option)
    @invalid_question.options << build(:option)
    @invalid_question.options << build(:option)
    @invalid_question.options << build(:option)
    @invalid_question.options << build(:option)
    @invalid_question.options.first.correct = true
    assert_not @invalid_question.save
    assert_equal ["Options Only 2-4 options are allowed"], @invalid_question.errors.full_messages
  end
end
