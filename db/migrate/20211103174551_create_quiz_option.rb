# frozen_string_literal: true

class CreateQuizOption < ActiveRecord::Migration[6.1]
  def change
    create_table :quiz_options do |t|
      t.string :name, null: false
      t.boolean :correct, default: false
      t.references :quiz_question, null: false, foreign_key: true
      t.timestamps
    end
  end
end
