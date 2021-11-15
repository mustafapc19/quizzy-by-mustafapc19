import React from "react";

import { Button, Modal, Toastr, Typography } from "neetoui";
import PropTypes from "prop-types";

import quizzesApi from "apis/quizzes";
import handleError from "common/error";
import { useQuizzes } from "contexts/quizzes";

const ConfirmDelete = ({
  quiz,
  showConfirmDeleteModal,
  setShowConfirmDeleteModal,
}) => {
  const [quizzes, setQuizzes] = useQuizzes();

  const handleDelete = async () => {
    try {
      await quizzesApi.destroy(quiz.id);
      logger.error(quizzes);
      delete quizzes[quiz.id];
      setQuizzes({ ...quizzes });

      Toastr.success("Quiz deleted successfuly");
      setShowConfirmDeleteModal(false);
    } catch (error) {
      handleError(error);
    }
  };

  const closeModal = () => {
    setShowConfirmDeleteModal(false);
  };

  return (
    <div className="w-full">
      <Modal
        className="p-4 space-y-2"
        size="xs"
        isOpen={showConfirmDeleteModal}
        closeButton={false}
      >
        <Typography>Are you sure?</Typography>
        <Button
          className="mr-2"
          label="Yes"
          style="danger"
          onClick={handleDelete}
        />
        <Button label="Cancel" style="text" onClick={closeModal} />
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
