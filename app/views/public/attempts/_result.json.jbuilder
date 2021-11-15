# frozen_string_literal: true

json.results attempt_answers do |attempt_answer|
  json.id attempt_answer.question.id
  json.selected_option_id attempt_answer&.option&.id
  json.correct attempt_answer&.option&.correct || false
  json.options attempt_answer.question.options
end
