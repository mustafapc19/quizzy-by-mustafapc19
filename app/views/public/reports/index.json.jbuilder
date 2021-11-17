# frozen_string_literal: true

json.reports @attempts do |attempt|
  json.first_name attempt.user.first_name
  json.last_name attempt.user.last_name
  json.email attempt.user.email
  json.quiz_name attempt.quiz.name
  json.correct_answers_count attempt.correct_answers_count
  json.incorrect_answers_count attempt.incorrect_answers_count
end
