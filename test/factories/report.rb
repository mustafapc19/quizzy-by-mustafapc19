# frozen_string_literal: true

FactoryBot.define do
  factory :report do
    job_id { Faker::Alphanumeric.alpha(number: 10) }
  end
end
