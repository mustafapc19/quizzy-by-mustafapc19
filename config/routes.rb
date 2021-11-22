# frozen_string_literal: true

Rails.application.routes.draw do
  defaults format: :json do
    resource :sessions, only: %i[create destroy]
    resource :users, only: %i[create]
    resources :quizzes do
      resources :questions, except: %i[show]
    end
    resources :reports, only: %i[index]
    get "/reports/export_start", to: "reports#export_start"
    get "/reports/export_status/:id", to: "reports#export_status"
    get "/reports/export_download/:id", to: "reports#export_download"
  end

  namespace :public do
    resources :attempts, except: %i[destroy]
  end

  get "/public/:slug", to: "public/attempts#index"
  get "/public/:slug/register", to: "public/attempts#index"

  root "home#index"
  get "*path", to: "home#index", constraints: lambda { |req|
    req.path.exclude? "rails/active_storage"
  }
end
