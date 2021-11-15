# frozen_string_literal: true

FactoryBot.define do
  factory :quiz do
    association :user_id, factory: :user
    name { Faker::Lorem.sentence[0..49] }
    slug { nil }
  end
end
