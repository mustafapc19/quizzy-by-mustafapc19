# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :create_standard_user, only: :create

  def create
    unless @user.save
      errors = @user.errors.full_messages.to_sentence
      render status: :unauthorized, json: { error: errors }
    end
  end

  private

    def user_params
      params.require(:user).permit(:email, :first_name, :last_name)
    end

    def create_standard_user
      @user = User.new(user_params)
      @user.password = Digest::SHA1.hexdigest(@user.email)
      @user.password_confirmation = @user.password
    end
end
