# frozen_string_literal: true

FactoryBot.define do
  factory :option do
    association :question_id, factory: :question
    name { Faker::Lorem.sentence[0..49] }
    correct { false }
  end
end
