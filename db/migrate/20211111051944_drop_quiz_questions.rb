# frozen_string_literal: true

class DropQuizQuestions < ActiveRecord::Migration[6.1]
  def change
    drop_table :quiz_questions
  end
end
