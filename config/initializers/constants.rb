# frozen_string_literal: true

module Constants
  MAX_FIRST_NAME_LENGTH = 50
  MAX_SECOND_NAME_LENGTH = 50
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze
  MIN_PASSWORD_LENGTH = 6
end
