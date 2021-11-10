# frozen_string_literal: true

class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    @user.password = Digest::SHA1.hexdigest(@user.email)
    @user.password_confirmation = @user.password

    unless @user.save
      errors = @user.errors.full_messages.to_sentence
      render status: :unauthorized, json: { error: errors }
    end
  end

  private

    def user_params
      params.require(:user).permit(:email, :first_name, :last_name)
    end
end
