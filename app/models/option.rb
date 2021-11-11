# frozen_string_literal: true

class Option < ApplicationRecord
  belongs_to :question

  validates :name, presence: true

  def self.update_or_create_by(args, attributes)
    obj = self.find_or_create_by(args)
    obj.update(attributes)
    obj
  end
end
