import React from "react";

import { Button, Modal, Toastr, Typography } from "neetoui";
import PropTypes from "prop-types";

import quizzesApi from "apis/quizzes";
import { useQuizzes } from "contexts/quizzes";

const ConfirmDelete = ({
  quiz,
  showConfirmDeleteModal,
  setShowConfirmDeleteModal,
}) => {
  const setQuizzes = useQuizzes()[1];

  return (
    <div className="w-full">
      <Modal
        className="p-4 space-y-2"
        size="xs"
        isOpen={showConfirmDeleteModal}
        onClose={() => setShowConfirmDeleteModal(false)}
        closeButton={false}
      >
        <Typography>Are you sure?</Typography>
        <Button
          className="mr-2"
          label="Yes"
          style="danger"
          onClick={async () => {
            try {
              await quizzesApi.destroy(quiz.id);
              setQuizzes(old => [...old.filter(item => item.id !== quiz.id)]);

              Toastr.success("Quiz deleted successfuly");
              setShowConfirmDeleteModal(false);
            } catch (error) {
              logger.error(error);
              Toastr.error(
                error?.response?.data?.error || "Something went wrong"
              );
            }
          }}
        />
        <Button
          label="Cancel"
          style="text"
          onClick={() => setShowConfirmDeleteModal(false)}
        />
      </Modal>
    </div>
  );
};

ConfirmDelete.propTypes = {
  showConfirmDeleteModal: PropTypes.bool.isRequired,
  setShowConfirmDeleteModal: PropTypes.func.isRequired,
  quiz: PropTypes.object.isRequired,
};

export default ConfirmDelete;
