# frozen_string_literal: true

class User < ApplicationRecord
  enum role: { standard: "standard", administrator: "administrator" }, _default: :standard

  validates :email, presence: true, uniqueness: true, format: { with: Constants::VALID_EMAIL_REGEX }
  validates :first_name, presence: true, length: { maximum: Constants::MAX_FIRST_NAME_LENGTH }
  validates :last_name, presence: true, length: { maximum: Constants::MAX_SECOND_NAME_LENGTH }

  before_save :to_lowercase

  private

    def to_lowercase
      email.downcase!
    end
end
