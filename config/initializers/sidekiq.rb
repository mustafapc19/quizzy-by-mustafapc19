# frozen_string_literal: true

require "sidekiq"
require "sidekiq-status"

Sidekiq.configure_client do |config|
  config.redis = { url: ENV["REDIS_URL"], size: 4, network_timeout: 5 }
  Sidekiq::Status.configure_client_middleware config, expiration: 30.minutes
end

Sidekiq.configure_server do |config|
  config.redis = { url: ENV["REDIS_URL"], size: 4, network_timeout: 5 }
  Sidekiq::Status.configure_server_middleware config, expiration: 30.minutes

  # accepts :expiration (optional)
  Sidekiq::Status.configure_client_middleware config, expiration: 30.minutes
end
