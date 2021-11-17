# frozen_string_literal: true

class AddUniqueIndexAttempts < ActiveRecord::Migration[6.1]
  def change
    add_index :attempts, [:user_id, :quiz_id], unique: true
  end
end
