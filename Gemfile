# frozen_string_literal: true

source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.0.2"

gem "rails", "~> 6.1.4", ">= 6.1.4.1"

# friends of Rails
gem "sass-rails", ">= 6"
gem "webpacker", "~> 5.0"

# database
gem "sqlite3", "~> 1.4", group: [:development]

# database in production
gem "pg", group: [:production]

# Adds react to rails
gem "react-rails"

# Application server
gem "puma", "~> 5.0"

# JSON builder
gem "jbuilder", "~> 2.7"

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", ">= 1.4.4", require: false

# For Model Authorization
gem "pundit"

# For generating spreadsheet files
gem "spreadsheet"

# For creating background workers
gem "sidekiq"

# For knowing status of a sidekiq worker
gem "sidekiq-status"

# AWS S3 integration with Active Storage
gem "aws-sdk-s3", require: false

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem "byebug", platforms: [:mri, :mingw, :x64_mingw]

  gem "factory_bot_rails"

  # For auto-generating demo data
  gem "faker"
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem "web-console", ">= 4.1.0"

  # Display performance information such as SQL time and flame graphs for each request in your browser.
  gem "listen", "~> 3.3"

  # Spring speeds up development by keeping your application running in the background
  gem "spring"

  # For code formatting and linting
  gem "rubocop"
  gem "rubocop-rails"
end

group :test do
  # Complete suite of testing facilities
  gem "minitest"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Used for password hashing
gem "bcrypt", "~> 3.1.13"
