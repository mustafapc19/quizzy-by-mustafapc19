# frozen_string_literal: true

class CreateReport < ActiveRecord::Migration[6.1]
  def change
    create_table :reports do |t|
      t.string :job_id, null: false, index: { unique: true }
      t.timestamps
    end
  end
end
