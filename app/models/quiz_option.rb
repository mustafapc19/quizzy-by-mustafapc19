# frozen_string_literal: true

class QuizOption < ApplicationRecord
  belongs_to :quiz_question

  validates :name, presence: true
end
