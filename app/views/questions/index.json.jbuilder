# frozen_string_literal: true

json.questions @questions do |question|
  json.question question
  json.options question.options
end
