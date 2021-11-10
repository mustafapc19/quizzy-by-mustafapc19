# frozen_string_literal: true

class QuizQuestion < ApplicationRecord
  belongs_to :quiz
  has_many :quiz_options, dependent: :destroy

  accepts_nested_attributes_for :quiz_options, update_only: true
  validates :name, presence: true
end
