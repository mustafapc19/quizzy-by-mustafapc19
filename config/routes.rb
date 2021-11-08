# frozen_string_literal: true

Rails.application.routes.draw do
  defaults format: :json do
    resource :sessions, only: %i[create destroy]
    resources :quizzes do
      resources :questions
    end
  end

  get "/public/:slug", to: "attempts#index"
  namespace :public do
    resources :attempts
  end

  root "home#index"
  # get "*path", to: "home#index", via: :all
end
