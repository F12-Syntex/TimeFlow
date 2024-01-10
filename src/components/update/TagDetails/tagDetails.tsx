import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageHeader from "../PageHeader/pageheader";
import TagItem from "express/src/types/TagItem";
import TodoItem from "express/src/types/TodoItem";
import ListView from "../ListView/listview";

function TagDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tag, setTag] = useState<TagItem>({} as TagItem);

  function getTagDetails() {
    const url = `http://localhost:3000/api/sample/tags/${id}`;
    const method = "GET";
    const headers = {
      "Content-Type": "application/json",
    };

    fetch(url, { method, headers })
      .then((response) => response.json())
      .then((data) => {
        setTag(data["tag"]);
        (document.getElementById("name") as HTMLInputElement).value =
          data["tag"].name;
        (document.getElementById("id") as HTMLInputElement).value =
            data["tag"]._id.toString();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    getTagDetails();
    getTasks();
  }, []);

//   fetch tasks with tag id
  const getTasks = () => {
    fetch(`http://localhost:3000/api/sample/tags/${id}/tasks`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.tasks)) {
            setTaskList(data.tasks);
        } else {
          console.error("Invalid data format for tasks");
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }

    const [taskList, setTaskList] = useState<TodoItem[]>([]);

  return (
    <div className="main-page-container">
      <div className="page-content">
        <PageHeader title={tag.name} editableView={false} />
        <div className="add-task-form">
          <div className="add-task-form-item">
            <input type="text" id="name" name="title" placeholder="Title" />
          </div>
          <div className="add-task-form-item">
            <input type="hidden" id="id" name="id" />
          </div>

          <div className="add-task-form-item-row">
            <button className="add-task-form-submit">Save</button>
            <button className="add-task-form-submit">Delete</button>
            <button
              className="add-task-form-submit"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </div>
        <PageHeader title="Related Tasks" editableView={false} />
            <ListView listViewItems={taskList} />
        <div className="task-list"></div>
      </div>
    </div>
  );
}

export default TagDetails;
