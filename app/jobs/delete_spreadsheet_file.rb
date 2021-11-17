# frozen_string_literal: true

class DeleteSpreadsheetFile
  include Sidekiq::Worker

  def perform(file_path, job_id)
    File.delete(file_path) if File.exist?(file_path)

    report = Report.find_by(job_id: job_id)
    report.file.purge
    report.destroy!
  end
end
