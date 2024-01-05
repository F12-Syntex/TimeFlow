import React, { useState, useEffect } from "react";
import TagItem from "express/src/types/TagItem";
import "./taglistitem.css";
import "bootstrap-icons/font/bootstrap-icons.css";

interface ListItemProps {
  item: TagItem;
}

const ListItem = ({ item }: ListItemProps) => {
  function openTag() {
    alert(`Title: ${item.name}\nID: ${item._id}`);
  }

  function deleteTag() {
    fetch(`http://localhost:3000/api/sample/tags/delete/${item._id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="list-view-item">
      <div className="tag-list-view-item-left" onClick={openTag}>
        <div className="list-view-item-title">{item.name}</div>
      </div>
      <div className="tag-list-view-item-right" onClick={deleteTag}>
        <button className="bi bi-trash3-fill"></button>
      </div>
    </div>
  );
};

export default ListItem;
