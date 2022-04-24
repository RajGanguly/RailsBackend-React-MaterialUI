module Accounts
  class Create
    InvalidInvitationError = Class.new(StandardError)

    def initialize(params)
      @params = params
    end

    def call
    end  

end
