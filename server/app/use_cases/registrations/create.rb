module Registrations
	class Create
		def initialize(params)
			@params = params
		end	

		def call
			user = User.create!(@params)
			user
		end	
	end
end
