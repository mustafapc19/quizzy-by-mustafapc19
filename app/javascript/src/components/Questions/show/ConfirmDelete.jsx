import React from "react";

import { Button, Modal, Toastr, Typography } from "neetoui";
import PropTypes from "prop-types";

import questionsApi from "apis/questions";
import handleError from "common/error";

const ConfirmDelete = ({
  quiz,
  question,
  showConfirmDeleteModal,
  setShowConfirmDeleteModal,
  setQuestions,
}) => {
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
              await questionsApi.destroy({
                question_id: question.id,
                quiz_id: quiz.id,
              });

              Toastr.success("Question deleted successfuly");
              setQuestions(old => [
                ...old.filter(item => item.id !== question.id),
              ]);
              setShowConfirmDeleteModal(false);
            } catch (error) {
              handleError(error);
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
  setQuestions: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
  quiz: PropTypes.object.isRequired,
};

export default ConfirmDelete;
