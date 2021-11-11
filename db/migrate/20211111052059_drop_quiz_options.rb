# frozen_string_literal: true

class DropQuizOptions < ActiveRecord::Migration[6.1]
  def change
    drop_table :quiz_options
  end
end
