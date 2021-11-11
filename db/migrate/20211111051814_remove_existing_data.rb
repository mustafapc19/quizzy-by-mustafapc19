# frozen_string_literal: true

class RemoveExistingData < ActiveRecord::Migration[6.1]
  def up
    Attempt.destroy_all
    Quiz.destroy_all
  end
end
