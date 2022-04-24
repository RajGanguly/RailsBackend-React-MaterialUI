module Devise
  module Strategies
    class JsonWebToken < Base
      def valid?
        request.headers["Authorization"].present?
      end

      def authenticate!
        return fail! unless claims
        return fail! unless claims.has_key?("user_id")

        user = User.find_by(id: claims["user_id"])
        auth_token = auth_token(user)
        return fail! if auth_token.nil? || auth_token.expired?

        auth_token.update(last_used_at: Time.current)
        success! user
      end

      protected ######################## PROTECTED #############################

      def claims
        strategy, token = request.headers["Authorization"].split(" ")

        return nil if (strategy || "").downcase != "bearer"

        JWTWrapper.decode(token[0...-36]) rescue nil
      end

      def auth_token(user)
        @auth_token ||= user&.authentication_tokens&.find_by_body(jwt_token)
      end

      def jwt_token
        request.headers["Authorization"].split(" ")[1]
      end
    end
  end
end
