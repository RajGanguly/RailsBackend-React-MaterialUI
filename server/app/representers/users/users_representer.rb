module Users
  class UsersRepresenter
    attr_accessor :user

    def initialize(user)
      @user = user
    end

    def call
      {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
      }
    end
  end  
end
