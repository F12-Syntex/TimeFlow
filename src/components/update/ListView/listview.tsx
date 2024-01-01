import "../ListView/listview.css";
import React, { useState } from "react";
import ListItem from "../ListItem/listitem";
import TodoItem from "../../../../express/src/types/TodoItem";

interface ListViewProps {
  listViewItems: TodoItem[];
  filterDate?: Date | null;
  filterCompleted?: boolean;
}

function ListView({
  listViewItems,
  filterDate,
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

  return (
    <div className="list-view">
      {filteredItems.map((item) => (
        <ListItem
          key={item.id}
          item={item}
        />
      ))}
    </div>
  );
}

export default ListView;
