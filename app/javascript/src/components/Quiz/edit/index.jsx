import React from "react";

import { Modal } from "neetoui";
import PropTypes from "prop-types";

import EditQuizForm from "./EditQuizForm";

const EditQuiz = ({ quiz, showEditQuizModal, setShowEditQuizModal }) => {
  return (
    <div className="w-full">
      <Modal
        className="p-4"
        size="xs"
        isOpen={showEditQuizModal}
        onClose={() => setShowEditQuizModal(false)}
        closeButton={false}
      >
        <EditQuizForm
          quiz={quiz}
          setShowEditQuizModal={setShowEditQuizModal}
        ></EditQuizForm>
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
