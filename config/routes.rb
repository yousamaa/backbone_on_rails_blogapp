# frozen_string_literal: true

Rails.application.routes.draw do
  root to: 'home#index'
  resources :blogs, only: %i[index show create update destroy]
end
