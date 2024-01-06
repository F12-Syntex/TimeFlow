import React, { useState, useEffect } from "react";
import TodoItem from "../../../../express/src/types/TodoItem";
import TagItem from "express/src/types/TagItem";
import { ObjectId } from "mongodb";
import TodoItemWithTags from "express/src/types/TodoItemWithTags";
import { Link } from "react-router-dom";
interface ListItemProps {
  item: TodoItemWithTags | TodoItem;
}

interface ListItemTags {
  tag: TagItem;
}

const ListItem = ({ item }: ListItemProps) => {
  const [check, setCheck] = useState(item);

  const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;
    const updatedItem = { ...item, completed: checked };

    const url = `http://localhost:3000/api/sample/tasks/update/${item._id}`;
    const method = "PATCH";
    const body = JSON.stringify(updatedItem);
    const headers = {
      "Content-Type": "application/json",
    };

    fetch(url, { method, body, headers })
      .then((response) => response.json())
      .then((data) => {
        // TESTING - cannot deselect checkbox
        // console.log("[ListItem] UpdateTask", data);
        // window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setCheck(updatedItem);

    // send request to timeflow.tsx to update the list
  };

  const parseDate = (dateString: string): string => {
    const date = new Date(dateString);
  
    const currentDate = new Date();
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
  
    // Check if the date is today
    if (
      date.getFullYear() === currentDate.getFullYear() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getDate() === currentDate.getDate()
    ) {
      return 'Today';
    }
  
    // Check if the date is tomorrow
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(currentDate.getDate() + 1);
    if (
      date.getFullYear() === tomorrow.getFullYear() &&
      date.getMonth() === tomorrow.getMonth() &&
      date.getDate() === tomorrow.getDate()
    ) {
      return 'Tomorrow';
    }
  
    // Check if the date is within the next 7 days
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(currentDate.getDate() + 7);
    if (
      date.getTime() < nextWeek.getTime() &&
      date.getTime() > currentDate.getTime()
    ) {
      const dayOfWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      return dayOfWeek[date.getDay()];
    } else if (date.getTime() < currentDate.getTime()) {
      // return yesterday or date like 30/12/2023
      const yesterday = new Date(currentDate);
      yesterday.setDate(currentDate.getDate() - 1);
      if (
        date.getFullYear() === yesterday.getFullYear() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getDate() === yesterday.getDate()
      ) {
        return 'Yesterday';
      }
      if (date.getFullYear() === currentDate.getFullYear()) {
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${mm}/${dd}`;
      }
    }
  
    // Return the date as mm/dd/yyyy for dates outside the range
    const formattedDate = new Date(date);
    const mm = String(formattedDate.getMonth() + 1).padStart(2, '0');
    const dd = String(formattedDate.getDate()).padStart(2, '0');
    const yyyy = formattedDate.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  };

  let labels: string[] = [];

  // Fix the below code to display the label names instead of "Tags"
  try {
    const parsedLabels = item.labels as unknown as ListItemTags[];
    labels = parsedLabels.map((label) => label.tag.name);
  } catch (error) {
    // console.error("Error occurred while parsing labels:", error);
    labels = ["Tags"];
  }

  return (
    <div className="list-view-item">
      <div className="list-view-item-left">
        <div className="container">
          <div className="round">
            <input
              type="checkbox"
              id={`checkbox-${item._id}`}
              checked={check.completed}
              onChange={handleCheckboxClick}
            />
            <label htmlFor={`checkbox-${item._id}`}></label>
          </div>
        </div>
      </div>
      <Link to={`/task/${item._id}`} className="list-view-item-right">
        <div className="list-view-item-top">
          <div className="list-view-item-title">{item.title}</div>
          <div className="list-view-item-date">
            <span>{parseDate(String(item.date))}</span>
          </div>
        </div>
        <div className="list-view-item-bottom">
          <div className="list-view-item-description">{item.description}</div>
          <div className="list-view-item-labels">
            {labels.map((label) => (
              <div key={label} className="list-view-item-label">{label}</div>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListItem;
