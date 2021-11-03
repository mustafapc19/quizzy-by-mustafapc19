# frozen_string_literal: true

class Quiz < ApplicationRecord
  belongs_to :user

  validates :name, presence: true
end
