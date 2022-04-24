module Registrations
	class Create
		def new(params)
			@params = params
		end	

		def call
			user = User.create!(@params)
			user
		end	
	end
end
