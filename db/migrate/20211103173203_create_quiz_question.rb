# frozen_string_literal: true

class CreateQuizQuestion < ActiveRecord::Migration[6.1]
  def change
    create_table :quiz_questions do |t|
      t.string :name, null: false
      t.references :quiz, null: false, foreign_key: true
      t.timestamps
    end
  end
end
