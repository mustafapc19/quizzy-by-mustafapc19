# frozen_string_literal: true

class QuizQuestion < ApplicationRecord
  belongs_to :quiz
  has_many :quiz_option, dependent: :destroy

  validates :name, presence: true
end
