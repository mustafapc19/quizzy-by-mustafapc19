# frozen_string_literal: true

Rails.application.routes.draw do
  resource :sessions, only: %i[create destroy]
  resource :quizzes
  root "home#index"
  get "*path", to: "home#index", via: :all
end
