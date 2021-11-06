# frozen_string_literal: true

class QuizQuestion < ApplicationRecord
  belongs_to :quiz
  has_many :quiz_option, dependent: :destroy

  accepts_nested_attributes_for :quiz_option, update_only: true
  validates :name, presence: true
end
