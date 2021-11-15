# frozen_string_literal: true

Rails.application.routes.draw do
  defaults format: :json do
    resource :sessions, only: %i[create destroy]
    resource :users, only: %i[create]
    resources :quizzes do
      resources :questions, except: %i[show]
    end
  end

  namespace :public do
    resources :attempts, except: %i[destroy]
    resources :reports, only: %i[index]
  end
  get "/public/:slug", to: "public/attempts#index"
  get "/public/:slug/register", to: "public/attempts#index"

  root "home#index"
  get "*path", to: "home#index", via: :all
end
