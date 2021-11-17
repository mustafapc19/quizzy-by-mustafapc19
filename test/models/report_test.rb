# frozen_string_literal: true

require "test_helper"

class ReportTest < ActiveSupport::TestCase
  def setup
    @report = create(:report)
  end

  def test_report_should_be_valid
    assert @report.valid?
  end

  def test_job_id_should_be_present
    @report.job_id = ""
    assert_not @report.valid?
    assert_equal ["Job can't be blank"], @report.errors.full_messages
  end

  def test_job_id_should_be_unique
    @report_same = create(:report)
    @report_same.job_id = @report.job_id

    assert_not @report_same.valid?
    assert_equal ["Job has already been taken"], @report_same.errors.full_messages
  end
end
