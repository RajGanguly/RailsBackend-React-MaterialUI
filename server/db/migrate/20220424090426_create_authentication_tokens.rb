class CreateAuthenticationTokens < ActiveRecord::Migration[6.1]
  def change
    create_table :authentication_tokens do |t|

      t.datetime :expires_at
      t.integer :user_id, foreign_key: true
      t.string :user_agent
      t.string :body
      t.datetime :last_used_at
      t.timestamps
    end
  end
end
