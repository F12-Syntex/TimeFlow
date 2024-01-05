import "../ListView/listview.css";
import React, { useState } from "react";
import ListItem from "../ListItem/listitem";
import TodoItem from "../../../../express/src/types/TodoItem";
import NoItems from "../NoItems/noitems";
import TodoItemWithTags from "express/src/types/TodoItemWithTags";

interface ListViewProps {
  listViewItems: TodoItemWithTags[];
  filterDate?: Date | null;
  filterInverseDate?: Date | null;
  filterCompleted?: boolean;
}

function ListView({
  listViewItems,
  filterDate,
  filterInverseDate,
  filterCompleted,
}: ListViewProps) {
  let filteredItems = listViewItems;

  if (filterDate) {
    filteredItems = filteredItems.filter((item) => {
      const itemDate = new Date(item.date);
      const selectedDate = new Date(filterDate);

      return (
        itemDate.getDate() === selectedDate.getDate() &&
        itemDate.getMonth() === selectedDate.getMonth() &&
        itemDate.getFullYear() === selectedDate.getFullYear()
      );
    });
  }

  if (filterCompleted !== undefined) {
    filteredItems = filteredItems.filter(
      (item) => item.completed === filterCompleted
    );
  }

  if (filterInverseDate) {
    filteredItems = filteredItems.filter((item) => {
      const itemDate = new Date(item.date);
      const selectedDate = new Date(filterInverseDate);

      return (
        itemDate.getDate() !== selectedDate.getDate() ||
        itemDate.getMonth() !== selectedDate.getMonth() ||
        itemDate.getFullYear() !== selectedDate.getFullYear()
      );
    });
  }

  return (
    <div className="list-view-container">
      {(filteredItems.length === 0 && <NoItems name="task" />) ||
        filteredItems.map((item) => <ListItem item={item} />)}
    </div>
  );
}

export default ListView;
