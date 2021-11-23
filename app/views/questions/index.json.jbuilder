# frozen_string_literal: true

json.questions @questions do |question|
  json.id question.id
  json.name question.name
  json.options question.options
end
