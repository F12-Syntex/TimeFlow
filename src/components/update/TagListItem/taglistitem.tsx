import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TagItem from "express/src/types/TagItem";
import "./taglistitem.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { defaultProps } from "react-select/dist/declarations/src/Select";

interface ListItemProps {
  item: TagItem;
  handleTagDelete: (id: string) => void;
}

const ListItem = ({ item, handleTagDelete}: ListItemProps) => {
  function openTag() {
    alert(`Title: ${item.name}\nID: ${item._id}`);
  }

  function deleteTag() {
    handleTagDelete(item._id.toString());
  }

  return (
    <div className="list-view-item tag-list-view-item">
      <Link to={`/tag/${item._id}`}>
        <div className="tag-list-view-item-left">
          <div className="list-view-item-title">{item.name}</div>
        </div>
      </Link>
      <div className="tag-list-view-item-right" onClick={deleteTag}>
        <button className="bi bi-trash3-fill"></button>
      </div>
    </div>
  );
};

export default ListItem;
