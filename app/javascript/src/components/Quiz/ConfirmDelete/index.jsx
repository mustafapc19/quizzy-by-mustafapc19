import React from "react";

import { Button, Modal, Typography } from "neetoui";
import PropTypes from "prop-types";

const ConfirmDelete = ({
  showConfirmDeleteModal,
  setShowConfirmDeleteModal,
  handleDelete,
}) => {
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
  handleDelete: PropTypes.func.isRequired,
};

export default ConfirmDelete;
