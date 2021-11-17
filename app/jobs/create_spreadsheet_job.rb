# frozen_string_literal: true

require "spreadsheet"

class CreateSpreadsheetJob
  include Sidekiq::Worker
  include Sidekiq::Status::Worker

  def perform(user_id)
    current_user = User.find_by(id: user_id)

    attempts = Attempt.includes(
      [:quiz, :user]
      ).where(quiz: { user_id: user_id })

    Spreadsheet.client_encoding = "UTF-8"
    book = Spreadsheet::Workbook.new
    sheet = book.create_worksheet
    sheet.row(0).replace ["Quiz Name", "User Name", "Email", "Correct Answers", "Incorrect Answers"]

    attempts.each_with_index do |attempt, index|
      sheet.row(index + 1).push attempt.quiz.name

      name = attempt.user.first_name + " " + attempt.user.last_name
      sheet.row(index + 1).push name

      sheet.row(index + 1).push attempt.user.email
      sheet.row(index + 1).push attempt.correct_answers_count
      sheet.row(index + 1).push attempt.incorrect_answers_count
    end

    file_path = "tmp/#{current_user.first_name}-#{current_user.last_name}-#{self.jid}.xls"
    book.write file_path

    report = Report.new(job_id: self.jid)
    report.file.attach(
      io: File.open(file_path),
      filename: "#{current_user.first_name}-#{current_user.last_name}-#{self.jid}.xls")
    report.save

    DeleteSpreadsheetFile.perform_at(3.hours.from_now, file_path, self.jid)
  end
end
