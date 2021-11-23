# frozen_string_literal: true

class QuizPolicy
  attr_reader :user, :quiz

  def initialize(user, quiz)
    @user = user
    @quiz = quiz
  end

  def index?
    check_user_id_and_is_administrator?
  end

  def create?
    check_user_id_and_is_administrator?
  end

  def show?
    check_user_id_and_is_administrator?
  end

  def update?
    check_user_id_and_is_administrator?
  end

  def destroy?
    check_user_id_and_is_administrator?
  end

  private

    def check_user_id_and_is_administrator?
      quiz.user_id == user.id && user.administrator?
    end

    class Scope
      attr_reader :user, :scope

      def initialize(user, scope)
        @user = user
        @scope = scope
      end

      def resolve
        scope.where(user_id: user.id)
      end
    end
end
