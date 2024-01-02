import React, { useState, useEffect } from "react";
import TagItem from "express/src/types/TagItem";
import "./taglistitem.css";

interface ListItemProps {
  item: TagItem;
}

const ListItem = ({ item }: ListItemProps) => {
  const [check, setCheck] = useState(item);

  const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;
    const updatedItem = { ...item, completed: checked };

    const url = `http://localhost:3000/api/sample/tags/update/${item._id}`;
    const method = "PATCH";
    const body = JSON.stringify(updatedItem);
    const headers = {
      "Content-Type": "application/json",
    };

    fetch(url, { method, body, headers })
      .then((response) => response.json())
      .then((data) => {
        // console.log('Success:', data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setCheck(updatedItem);
  };

  function openTag() {
    alert(
      `Title: ${item.name}`
    );
  }

  return (
    <div className="list-view-item">
      <div className="tag-list-view-item-right" onClick={openTag}>
        <div className="list-view-item-title">{item.name}</div>
      </div>
    </div>
  );
};

export default ListItem;
