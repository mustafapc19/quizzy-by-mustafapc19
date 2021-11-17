# frozen_string_literal: true

class Report < ApplicationRecord
  has_one_attached :file

  validates :job_id, presence: true, uniqueness: true
end
