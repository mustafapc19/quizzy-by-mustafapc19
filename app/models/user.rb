# frozen_string_literal: true

class User < ApplicationRecord
  validates :email, presence: true
  validates :first_name, presence: true
end