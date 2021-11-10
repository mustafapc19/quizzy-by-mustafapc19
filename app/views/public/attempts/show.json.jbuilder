# frozen_string_literal: true

json.attempt @attempt
json.attempt_answers @attempt_answers
json.partial! "public/attempts/result", attempt_answers: @attempt_answers
