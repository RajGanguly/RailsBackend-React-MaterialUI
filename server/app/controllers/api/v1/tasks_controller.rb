module Api
  module V1
	class TasksController < Api::V1::ApiController
		# before_action :authenticate_user!

		def email_invite
			
			::UserMailer.dispatch_email(params[:email]).deliver_now
		end	
	end
  end
end
