# frozen_string_literal: true

class Quiz < ApplicationRecord
  is_sqlite_db = ActiveRecord::Base.connection_db_config.configuration_hash[:adapter] == "sqlite3"
  DB_REGEX_OPERATOR = is_sqlite_db ? "REGEXP" : "~*"

  belongs_to :user
  has_many :questions, dependent: :destroy
  has_many :attempts, dependent: :destroy

  validates :slug, uniqueness: true, if: -> { slug.present? }
  validates :name, presence: true

  accepts_nested_attributes_for :questions

  def set_slug
    if slug == nil
      name_slug = name.parameterize
      regex_pattern = "slug #{DB_REGEX_OPERATOR} ?"
      latest_quiz_slug = Quiz.where(
        regex_pattern,
        "#{name_slug}$|#{name_slug}-[0-9]+$"
      ).order("LENGTH(slug) DESC", slug: :desc).first&.slug

      slug_count = 0
      if latest_quiz_slug.present?
        slug_count = latest_quiz_slug.split("-").last.to_i
        only_one_slug_exists = slug_count == 0
        slug_count = 1 if only_one_slug_exists
      end
      slug_candidate = slug_count.positive? ? "#{name_slug}-#{slug_count + 1}" : name_slug
      self.slug = slug_candidate
    end
  end
end
