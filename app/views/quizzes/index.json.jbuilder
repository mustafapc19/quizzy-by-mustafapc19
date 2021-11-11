# frozen_string_literal: true

json.quizzes @quizzes do |quiz|
  json.extract! quiz,
    :id,
    :name,
    :created_at,
    :slug
end
