# frozen_string_literal: true

class AttemptAnswer < ApplicationRecord
  belongs_to :attempt
  belongs_to :quiz_question
  belongs_to :quiz_option, optional: true
end
