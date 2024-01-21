import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TagItem from "express/src/types/TagItem";
import "./taglistitem.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Modal from "../Modal/modal";
import TagDetails from "../TagDetails/tagDetails";

interface ListItemProps {
  item: TagItem;
  handleTagDelete: (id: string) => void;
}

const ListItem = ({ item, handleTagDelete }: ListItemProps) => {
  const [showModal, setShowModal] = useState(false);
  const [closing, setClosing] = useState(false);

  function deleteTag(
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    closeModal();
    handleTagDelete(item._id.toString());
  }

  function closeModal() {
    setClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setClosing(false);
    }, 300);
  }

  return (
    <>
      {showModal && (
        <Modal closeModal={closeModal} closing={closing}>
          <TagDetails
            id={String(item._id)}
            deleteTag={deleteTag}
            closeModal={closeModal}
          />
        </Modal>
      )}
      <div
        className="list-view-item tag-list-view-item"
        onClick={() => setShowModal(true)}
      >
        {/* <Link to={`/tag/${item._id}`}> */}
        <div className="tag-list-view-item-left">
          <div className="list-view-item-title">{item.name}</div>
        </div>
        {/* </Link> */}
        <div className="tag-list-view-item-right" onClick={deleteTag}>
          <button className="bi bi-trash3-fill"></button>
        </div>
      </div>
    </>
  );
};

export default ListItem;
