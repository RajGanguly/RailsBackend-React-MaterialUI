class ApplicationController < ActionController::API
	rescue_from ActiveRecord::RecordInvalid do |invalid|
		render json: { error: invalid.message }, status: :bad_request
	end
end
