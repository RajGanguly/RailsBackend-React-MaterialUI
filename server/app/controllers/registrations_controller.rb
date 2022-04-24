class RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    user = ::Registrations::Create.new(user_params).call
    render json: ::Users::UsersRepresenter.new(user).call
  end  

  private

  def respond_with(resource, _opts = {})
    resource.persisted? ? register_success : register_failed
  end

  def register_success(data)
    render json: { message: 'Signed up.', data: data }
  end
  
  def register_failed
    render json: { message: "Signed up failure." }
  end	

  private

  def user_params
    params.require(:user).permit(:email, :password, :phone, :name)
  end 
end
