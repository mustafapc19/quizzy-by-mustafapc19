# frozen_string_literal: true

class Question < ApplicationRecord
  belongs_to :quiz
  has_many :options, dependent: :destroy

  before_validation :validate_options
  validates :name, presence: true

  accepts_nested_attributes_for :options, allow_destroy: true

  private

    def validate_options
      options = self.options.select { |option| !option.marked_for_destruction? }

      unless 2 <= options.length && options.length <= 4
        errors.add(:options, "Only 2-4 options are allowed")
      end

      unless options.select { |option| option[:correct] == true }.length == 1
        errors.add(:options, "Exactly one option has to be correct")
      end
    end
end
