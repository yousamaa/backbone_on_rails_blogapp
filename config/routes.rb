# frozen_string_literal: true

Rails.application.routes.draw do
  root to: 'home#index'
  resources :blogs, only: [:index, :show, :create, :update, :destroy]
end
