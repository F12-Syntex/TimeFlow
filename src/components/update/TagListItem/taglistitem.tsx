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
  const [numTasks, setNumTasks] = useState(0);

  function deleteTag(
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    closeModal();
    handleTagDelete(item._id.toString());
  }

  const getNumTasks = () => {
    fetch(`http://localhost:3000/api/sample/tags/${item._id}/tasks`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.tasks)) {
          setNumTasks(data.tasks.length);
        } else {
          console.error("Invalid data format for tasks");
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  useEffect(() => {
    getNumTasks();
  }, []);

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
      <div className="list-view-item" onClick={() => setShowModal(true)}>
        <div className="flex flex-col justify-center pl-6 items-left">
          <div className="text-xl font-semibold">{item.name}</div>
          <div className="mt-1 text-base font-medium opacity-75">
            <span>{numTasks} Task{numTasks === 1 ? "" : "s"}</span>
          </div>
        </div>
        <div className="ml-auto" onClick={deleteTag}>
          <button className="h-full bi bi-trash3-fill bin-btn"></button>
        </div>
      </div>
    </>
  );
};

export default ListItem;
