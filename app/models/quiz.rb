# frozen_string_literal: true

class Quiz < ApplicationRecord
  belongs_to :user
  has_many :quiz_question

  validates :slug, uniqueness: true, if: -> { slug.present? }
  validates :name, presence: true

  def set_slug
    itr = 1

    if !self.slug.present?
      loop do
        title_slug = self.name.parameterize
        slug_candidate = itr > 1 ? "#{title_slug}-#{itr}" : title_slug
        break self.slug = slug_candidate unless Quiz.exists?(slug: slug_candidate)

        itr += 1
      end
    end
  end
end
