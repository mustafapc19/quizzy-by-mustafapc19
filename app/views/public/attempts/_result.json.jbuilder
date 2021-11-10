# frozen_string_literal: true

json.results attempt_answers do |attempt_answer|
  json.id attempt_answer.quiz_question.id
  json.selected_option_id attempt_answer&.quiz_option&.id
  json.correct attempt_answer&.quiz_option&.correct || false
  json.options attempt_answer.quiz_question.quiz_options
end
