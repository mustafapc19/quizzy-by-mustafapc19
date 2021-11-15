# frozen_string_literal: true

class Attempt < ApplicationRecord
  belongs_to :quiz
  belongs_to :user
  has_many :attempt_answers, dependent: :destroy

  accepts_nested_attributes_for :attempt_answers

  before_save :submit_if_answers

  private

    def submit_if_answers
      if self.attempt_answers.present?
        self.submitted = true
      end
    end
end
