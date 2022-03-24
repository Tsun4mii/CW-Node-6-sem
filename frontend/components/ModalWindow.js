import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const Modalwindow = ({ show, toggleModal, id }) => {
  const deleteHandle = async (id) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/entities/point/delete`,
      {
        method: "POST",
        body: JSON.stringify({
          id: id,
        }),
      }
    );
    const content = await response.json();
    toggleModal();
  };
  return (
    <>
      <Modal isOpen={show}>
        <ModalHeader>Delete part</ModalHeader>
        <ModalBody>Are you sure you want to delete this part?</ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={toggleModal}>
            Cancel
          </button>
          <button className="btn btn-success" onClick={() => deleteHandle(id)}>
            Delete
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Modalwindow;
