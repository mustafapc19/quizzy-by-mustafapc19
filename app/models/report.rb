# frozen_string_literal: true

class Report < ApplicationRecord
  has_one_attached :file
end
