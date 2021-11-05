# frozen_string_literal: true

class Quiz < ApplicationRecord
  belongs_to :user
  has_many :quiz_question

  validates :name, presence: true
end
