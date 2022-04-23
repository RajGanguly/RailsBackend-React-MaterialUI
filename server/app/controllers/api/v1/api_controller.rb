module Api
  module V1
    class ApiController < ApplicationController
      rescue_from ActiveRecord::RecordInvalid do |invalid|
        render json: { error: invalid.message }, status: :bad_request
      end

      rescue_from ActiveRecord::RecordNotFound do |exception|
        render json: { error: exception.message }, status: :not_found
      end
    end
  end
end