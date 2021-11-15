# frozen_string_literal: true

@reports = []
@user_ids = []
@quizzes.each do |quiz|
  quiz.attempts.each do |attempt|
    @user_ids << attempt.user_id

    attempt.attempt_answers.each do |attempt_answer|
      @reports << {
        quiz_id: quiz.id,
        quiz_name: quiz.name,
        quiz_created_at: quiz.created_at,
        attempt_id: attempt.id,
        attempt_submitted: attempt.submitted,
        attempt_correct_answers_count: attempt.correct_answers_count,
        attempt_incorrect_answers_count: attempt.incorrect_answers_count,
        attempt_user_id: attempt.user_id,
        attempt_created_at: attempt.created_at,
        attempt_answer_id: attempt_answer.id,
        question_id: attempt_answer.question_id,
        option_id: attempt_answer.option_id,
        attempt_answer_created_at: attempt_answer.created_at
      }
    end
  end
end

@users = {}
User.where(id: @user_ids).map do |user|
  @users[user.id] = user
end

@reports.each do |report|
  report[:attempt_user_first_name] = @users[report[:attempt_user_id]][:first_name]
  report[:attempt_user_last_name] = @users[report[:attempt_user_id]][:last_name]
  report[:attempt_user_email] = @users[report[:attempt_user_id]][:email]
end

json.reports @reports
