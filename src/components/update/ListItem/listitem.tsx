import React, { useState, useEffect } from "react";
import TodoItem from "../../../../express/src/types/TodoItem";
import TagItem from "express/src/types/TagItem";

interface ListItemProps {
  item: TodoItem;
}

const ListItem = ({ item }: ListItemProps) => {
  const [check, setCheck] = useState(item);

  const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;
    const updatedItem = { ...item, completed: checked };

    const url = `http://localhost:3000/api/sample/tasks/update/${item.id}`;
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

  function getItemLabels(
    labels: TagItem[] | undefined
  ): JSX.Element | undefined {
    if (Array.isArray(labels)) {
      // console.log(labels);
      return (
        <>
          {labels.map((label: TagItem) => (
            <div
              className="list-view-item-label"
              key={label.id}
              style={{ border: `1px solid {label.color}` }}
            >
              {label.name}
            </div>
          ))}
        </>
      );
    } else {
      console.error("Labels are not an array or are undefined/null");
    }
    return undefined;
  }

  const parseDate = (date: Date): string => {
    const currentDate = new Date();
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day

    // Check if the date is today
    if (date.toDateString() === currentDate.toDateString()) {
      return "Today";
    }

    // Check if the date is tomorrow
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(currentDate.getDate() + 1);
    if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    }

    // Check if the date is within the next 7 days
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(currentDate.getDate() + 7);
    if (
      date.getTime() < nextWeek.getTime() &&
      date.getTime() > currentDate.getTime()
    ) {
      const dayOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      return dayOfWeek[date.getDay()];
    } else if (date.getTime() < currentDate.getTime()) {
      // return yesterday or date like 30/12/2023
      const yesterday = new Date(currentDate);
      yesterday.setDate(currentDate.getDate() - 1);
      if (date.toDateString() === yesterday.toDateString()) {
        return "Yesterday";
      }
      if (date.getFullYear() === currentDate.getFullYear()) {
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        return `${mm}/${dd}`;
      }
    }

    // Return the date as mm/dd/yyyy for dates outside the range
    const formattedDate = new Date(date);
    const mm = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const dd = String(formattedDate.getDate()).padStart(2, "0");
    const yyyy = formattedDate.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  };

  function openTask() {
    alert(
      `Title: ${item.title}\nDescription: ${
        item.description
      }\nDate: ${parseDate(item.date)}\nPriority: ${
        item.priority
      }\nLabels: ${getItemLabels(item.labels)}`
    );
  }

  return (
    <div className="list-view-item">
      <div className="list-view-item-left">
        <div className="container">
          <div className="round">
            <input
              type="checkbox"
              id={`checkbox-${item.id}`}
              checked={check.completed}
              onChange={handleCheckboxClick}
            />
            <label htmlFor={`checkbox-${item.id}`}></label>
          </div>
        </div>
      </div>
      <div className="list-view-item-right" onClick={openTask}>
        <div className="list-view-item-top">
          <div className="list-view-item-title">{item.title}</div>
          <div className="list-view-item-date">
            <span>{parseDate(item.date)}</span>
          </div>
        </div>
        <div className="list-view-item-bottom">
          <div className="list-view-item-description">{item.description}</div>
          <div className="list-view-item-labels">
            {getItemLabels(item.labels)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
