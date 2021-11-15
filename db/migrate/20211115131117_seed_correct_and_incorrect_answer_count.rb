# frozen_string_literal: true

class SeedCorrectAndIncorrectAnswerCount < ActiveRecord::Migration[6.1]
  def up
    Attempt.all.each do |attempt|
      if attempt.correct_answers_count.nil?
        attempt_answers = attempt.attempt_answers
        attempt.correct_answers_count = attempt_answers.select { |attempt_answer| attempt_answer.option&.correct }.count
        attempt.incorrect_answers_count = attempt_answers.length - attempt.correct_answers_count

        attempt.save!
      end
    end
  end
end
