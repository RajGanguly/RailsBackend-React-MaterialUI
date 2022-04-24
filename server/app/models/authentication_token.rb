class AuthenticationToken < ApplicationRecord
  #has_paper_trail skip: [:expires_at, :last_used_at]

  belongs_to :user

  before_save :set_expires_at

  enum user_agent: {
    web: 0,
    android: 1,
    ios: 2
  }

  def expired?
    self.expires_at < Time.current
  end

  private

  def set_expires_at
    self.expires_at = self.web? ? Time.current + 1.hour : Time.current + 1.year
  end

end
