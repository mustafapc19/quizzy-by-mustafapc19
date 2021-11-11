# frozen_string_literal: true

class DropAttempts < ActiveRecord::Migration[6.1]
  def change
    drop_table :attempt_answers
  end
end
