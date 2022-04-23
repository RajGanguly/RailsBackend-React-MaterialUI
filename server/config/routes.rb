Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      devise_for(
        :users,
        controllers: {
           sessions: 'sessions',
           registrations: 'registrations'
        },
        singular: :user
      ) 
      resources :tasks 
      # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
    end
  end  
end
