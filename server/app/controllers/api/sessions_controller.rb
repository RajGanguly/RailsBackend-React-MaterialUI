class Users::SessionsController < Devise::SessionsController
  respond_to :json

  def create
    return invalid_login_attempt if invalid_resource?
    sign_in :user, resource
    token = user_repository.generate_auth_token(user_engagement_params)
    authentication_success(token, resource)    
  end  

  private

  def resource
    @resource ||= User.find_by(email: user_params[:email])
  end 

  def valid_password?(user)
    user && user.valid_password?(user_params[:password])
  end

  def respond_with(resource, _opts = {})
    render json: { message: 'Logged.' }, status: :ok
  end

  def respond_to_on_destroy
    current_user ? log_out_success : log_out_failure
  end

  def log_out_success
    render json: { message: "Logged out." }, status: :ok
  end
  
  def log_out_failure
    render json: { message: "Logged out failure."}, status: :unauthorized
  end

  def invalid_resource?
    !resource || !resource.valid_password?(user_params[:password])
  end

  def user_repository
    @user_repository ||= UserRepository.new(request)
  end 

  def invalid_login_attempt
    warden.custom_failure!
    render json: {
      success: false,
      message: "Error with your login or password",
    }, status: :unauthorized
  end

  def user_params
    params.require(:user).permit(:email, :password)
  end      
end
