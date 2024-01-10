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
      {/* <Link to="/add" style={{ textDecoration: "none" }}> */}
      {showModal && (
        <AddModal
          closeModal={closeModal}
          type={props.name.toLowerCase()}
        ></AddModal>
      )}
      <div className="list-view-item" onClick={openModal}>
        <div className="list-view-item-left">
          <div className="container">
            <div className="round"></div>
          </div>
        </div>
        <div className="list-view-item-right">
          <div className="list-view-item-top">
            <div className="list-view-item-title">
              No {pluralize(props.name)}
            </div>
          </div>
          <div className="list-view-item-bottom">
            <div className="list-view-item-description">
              Add a {props.name} to get started!
            </div>
          </div>
        </div>
      </div>
      {/* // </Link> */}
    </>
  );
}

export default NoItems;