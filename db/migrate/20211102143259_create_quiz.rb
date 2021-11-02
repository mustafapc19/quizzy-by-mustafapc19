# frozen_string_literal: true

class CreateQuiz < ActiveRecord::Migration[6.1]
  def change
    create_table :quizzes do |t|
      t.string :name, null: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
