# frozen_string_literal: true

class Attempt < ApplicationRecord
  belongs_to :quiz
  belongs_to :user
  has_many :attempt_answers, dependent: :destroy

  validates_uniqueness_of :user_id, scope: [:quiz_id]

  before_save :submit_if_answers_and_correct_and_incorrect_answers_count

  accepts_nested_attributes_for :attempt_answers

  private

    def submit_if_answers_and_correct_and_incorrect_answers_count
      if self.attempt_answers.present?
        self.submitted = true

        attempt_answers = self.attempt_answers
        self.correct_answers_count = attempt_answers.select { |attempt_answer| attempt_answer.option&.correct }.count
        self.incorrect_answers_count = attempt_answers.length - self.correct_answers_count
      end
    end
end
