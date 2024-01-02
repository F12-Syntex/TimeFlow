import "../ListView/listview.css";
import React, { useState } from "react";
import ListItem from "../ListItem/listitem";
import TodoItem from "../../../../express/src/types/TodoItem";
import NoItems from "../NoItems/noitems";

interface ListViewProps {
  listViewItems: TodoItem[];
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
    <div>
      {(filteredItems.length === 0 && (
		<NoItems name="task" />
      )) ||
		filteredItems.map((item) => <ListItem key={String(item._id)} item={item} />)
	  }
	</div>
  );
}

export default ListView;
