# frozen_string_literal: true

FactoryBot.define do
  factory :question do
    :quiz
    name { Faker::Lorem.sentence[0..49] }
  end
end
