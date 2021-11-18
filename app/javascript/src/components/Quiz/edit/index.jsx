import React from "react";

import { Modal } from "neetoui";
import PropTypes from "prop-types";

import EditQuizForm from "./EditQuizForm";

const EditQuiz = ({ quiz, showEditQuizModal, setShowEditQuizModal }) => {
  const closeModal = () => {
    setShowEditQuizModal(false);
  };

  return (
    <div className="w-full">
      <Modal
        className="p-4"
        size="xs"
        isOpen={showEditQuizModal}
        onClose={closeModal}
        closeButton={false}
      >
        <EditQuizForm quiz={quiz} setShowEditQuizModal={setShowEditQuizModal} />
      </Modal>
    </div>
  );
};

EditQuiz.propTypes = {
  showEditQuizModal: PropTypes.bool.isRequired,
  setShowEditQuizModal: PropTypes.func.isRequired,
  quiz: PropTypes.object.isRequired,
};

export default EditQuiz;
