class UserRepository
  
  def initialize(request = nil)
    @request = request
  end

  def invalidate_token!(user)
    auth_token = authentication_token(user)
    return unless auth_token

    auth_token.device_tokens.update_all(deleted_at: Time.current)
    auth_token.update_column :deleted_at, Time.current
  end

  def find_for_database_authentication(conditions)
    User.find_for_database_authentication(conditions)
  end

  def generate_auth_token(resource, params = {})
    jwt_token = JWT.encode payload(resource), ENV["JWT_SECRET"]
    jwt_secure_token = [jwt_token, SecureRandom.uuid].join

    auth_token = resource.authentication_tokens.create(body: jwt_secure_token, user_agent: user_agent)
    base_token = Base64.strict_encode64(jwt_secure_token)

    [SecureRandom.uuid.remove("-"), base_token].join
  end

  def valid_password?(resource, password)
    resource && resource.valid_password?(password)
  end

  def payload(resource)
    {
      success: true,
      id: resource.id,
      key: SecureRandom.uuid,
      email: resource.email,
      name: resource.name,
      phone: resource.phone
    }
  end


  protected 

  def authentication_token(resource)
    @authentication_token ||= resource.authentication_tokens.find_by(body: jwt_token)
  end

  def jwt_token
    @request.headers["Authorization"].split(" ")[1] if @request
  end

  def user_agent
    case @request.headers["HTTP_USER_AGENT"]
    when "ANDROID"
      :android
    when "iOS"
      :ios
    else
      :web
    end
  end
end
