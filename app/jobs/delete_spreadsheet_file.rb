# frozen_string_literal: true

class DeleteSpreadsheetFile
  include Sidekiq::Worker

  def perform(file_path)
    File.delete(file_path) if File.exist?(file_path)
  end
end
