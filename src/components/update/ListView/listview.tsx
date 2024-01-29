import "../ListView/listview.css";
import React, { useState, useEffect } from "react";
import ListItem from "../ListItem/listitem";
import TodoItem from "../../../../express/src/types/TodoItem";
import NoItems from "../NoItems/noitems";
import TodoItemWithTags from "express/src/types/TodoItemWithTags";

interface ListViewProps {
  listViewItems: (TodoItemWithTags | TodoItem)[];
  filterDate?: Date | null;
  filterInverseDate?: Date | null;
  filterCompleted?: boolean;
  dimCompleted?: boolean;
}

function ListView({
  listViewItems,
  filterDate,
  filterInverseDate,
  filterCompleted,
  dimCompleted,
}: ListViewProps) {
  const [filteredItems, setFilteredItems] = useState(listViewItems);

  useEffect(() => {
    let updatedItems = [...listViewItems];

    if (filterDate) {
      updatedItems = updatedItems.filter((item) => {
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
      // if filterCompleted is true, show all tasks, otherwise show only incomplete tasks
      updatedItems = updatedItems.filter((item) => {
        if (filterCompleted) {
          return true;
        } else {
          return !item.completed;
        }
      });
    }

    setFilteredItems(updatedItems);
  }, [listViewItems, filterDate, filterInverseDate, filterCompleted]);

  function handleTaskDelete(id: string) {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    const url = `http://localhost:3000/api/sample/tasks/delete/${id}`;
    const method = "DELETE";
    const headers = {
      "Content-Type": "application/json",
    };

    fetch(url, { method, headers })
      .then((response) => response.json())
      .then((data) => {
        setFilteredItems((prevFilteredItems) =>
          prevFilteredItems.filter((item) => item._id.toString() !== id)
        );
        // alert("Task deleted successfully");
      })
      .catch((error) => {
        alert("Error deleting task: " + error);
      });
  }

  return (
    <div className="grid gap-3 w-[calc(100%-64px)] grid-cols-[repeat(auto-fit,minmax(500px,1fr))]">
      {(filteredItems.length === 0 && <NoItems name="task" />) ||
        filteredItems.map((item) => (
          <ListItem
            key={String(item._id)}
            item={item}
            handleTaskDelete={handleTaskDelete}
          />
        ))}
    </div>
  );
}

export default ListView;
