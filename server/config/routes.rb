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
      post "tasks/email_invitation", to: "tasks#email_invite" 

    end
  end  
end
