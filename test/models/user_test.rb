require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(first_name: "Sam", last_name: "Smith", email: "sam@example.com")
  end

  def test_user_should_be_valid
    assert @user.valid?
  end

  def test_first_name_should_be_present
    @user.first_name = ""
    assert_not @user.valid?
    assert_equal ["First name can't be blank"], @user.errors.full_messages
  end

  def test_last_name_should_be_present
    @user.last_name = ""
    assert_not @user.valid?
    assert_equal ["Last name can't be blank"], @user.errors.full_messages
  end

  def test_email_should_be_present
    @user.email = ""
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Email can't be blank"
  end

  def test_first_name_should_be_of_valid_length
    @user.first_name = 'A' * 51
    assert_not @user.valid?
    assert_equal ["First name is too long (maximum is 50 characters)"], @user.errors.full_messages
  end

  def test_last_name_should_be_of_valid_length
    @user.last_name = 'A' * 51
    assert_not @user.valid?
    assert_equal ["Last name is too long (maximum is 50 characters)"], @user.errors.full_messages
  end

  def test_user_should_not_be_valid_and_saved_if_email_not_unique
    @user.save!

    test_user = @user.dup
    assert_not test_user.valid?

    assert_includes test_user.errors.full_messages, "Email has already been taken"
  end

  def test_email_should_be_saved_in_lowercase
    uppercase_email = "SAM@EMAIL.COM"
    @user.email = uppercase_email
    @user.save!
    assert_equal uppercase_email.downcase, @user.email
  end
end