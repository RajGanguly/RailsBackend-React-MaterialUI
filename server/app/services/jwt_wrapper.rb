class JWTWrapper
  class << self

  def encode(payload)
    JWT.encode payload, ENV["JWT_SECRET"]
  end

  def decode(token)
    decoded_token = JWT.decode token, ENV["JWT_SECRET"]
    decoded_token.first
  rescue
    nil
  end
end
