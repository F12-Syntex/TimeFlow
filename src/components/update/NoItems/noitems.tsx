import React from "react";
import { Link } from "react-router-dom";
import "./noitems.css";
import AddModal from "../AddModal/addmodal";

function NoItems(props: { name: string }) {
  function pluralize(name: string) {
    if (name[name.length - 1] === "y") {
      return name.slice(0, name.length - 1) + "ies";
    } else {
      return name + "s";
    }
  }

  const [showModal, setShowModal] = React.useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <>
      {showModal && (
        <AddModal
          closeModal={closeModal}
          type={props.name.toLowerCase()}
        ></AddModal>
      )}
      <div className="list-view-item" onClick={openModal}>
        <div className="flex flex-col flex-1 ml-6">
          <div className="flex flex-row justify-between">
            <div className="text-xl font-semibold">
              No {pluralize(props.name)}
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="text-base font-normal">
              Add a {props.name} to get started!
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NoItems;
