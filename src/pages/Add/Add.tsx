import "./add.css";
import "../pages.css";
import PageHeader from "../../components/update/PageHeader/pageheader";
import TagItem from "express/src/types/TagItem";
import TodoItem from "express/src/types/TodoItem";
import React, { useEffect, useState } from "react";
import { ObjectId } from "mongodb";

function App() {
  const addTask = () => {
    // make sure all fields are filled out
    if ((document.getElementById("name") as HTMLInputElement)?.value === "") {
      alert("Please enter a task name");
      return;
    }

    if (
      (document.getElementById("description") as HTMLInputElement)?.value === ""
    ) {
      alert("Please enter the description of the task");
      return;
    }

    if ((document.getElementById("date") as HTMLInputElement)?.value === "") {
      alert("Please enter a date for this task");
      return;
    }

    if (
      (document.getElementById("priority") as HTMLInputElement)?.value === ""
    ) {
      alert("Please enter the level of priority of this task");
      return;
    }

    if ((document.getElementById("labels") as HTMLInputElement)?.value === "") {
      alert("Please choose a label for this task");
      return;
    }

    if (
      new Date(
        (document.getElementById("date") as HTMLInputElement)?.value ?? ""
      ).toString() === "Invalid Date"
    ) {
      alert("Please enter a valid date for this task");
      return;
    }

    const task: TodoItem = {
      user: "",
      title: (document.getElementById("name") as HTMLInputElement)?.value ?? "",
      description:
        (document.getElementById("description") as HTMLInputElement)?.value ??
        "",
      date: formatDate(
        (document.getElementById("date") as HTMLInputElement)?.value ?? ""
      ),
      priority:
        (document.getElementById("priority") as HTMLInputElement)?.value ?? "",
      labels: [new ObjectId((document.getElementById("labels") as HTMLInputElement)?.value ?? "")],
      completed: false,
      _id: new ObjectId(),
    };

    fetch("http://localhost:3000/api/sample/tasks/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      // then alert the user that the task was added and redirect to the inbox
      .then((response) => {
        if (response.status === 200) {
          window.location.href = "/inbox";
        } else {
          alert("Error adding task");
        }
      });
  };

  const addTag = () => {
    // make sure all fields are filled out
    if ((document.getElementById("tag-name") as HTMLInputElement)?.value === "") {
      alert("Please enter a tag name");
      return;
    }

    const tag: TagItem = {
      name: (document.getElementById("tag-name") as HTMLInputElement)?.value ?? "",
      _id: new ObjectId(),
    };

    fetch("http://localhost:3000/api/sample/tags/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tag),
    })
      // then alert the user that the task was added and redirect to the inbo
      .then((response) => {
        if (response.status === 200) {
          window.location.href = "/tags";
        } else {
          alert("Error adding tag");
        }
      });
  };

  const formatDate = (date: string) => {
    const dateArray = date.split("-");
    return new Date(
      parseInt(dateArray[0]),
      parseInt(dateArray[1]) - 1,
      parseInt(dateArray[2])
    );
  };

  const [tagList, setTagList] = useState<TagItem[]>([]);

  const getTags = () => {
    fetch("http://localhost:3000/api/sample/tags")
      .then((response) => response.json())
      .then((data) => {
        // Check if data.tags is an array
        if (Array.isArray(data.tags)) {
          // Manipulate the data to get TagItem array
          const parsedTagList: TagItem[] = data.tags.map((tag: any) => ({
            name: tag.name,
            _id: tag._id,
          }));
          setTagList(parsedTagList);
        } else {
          console.error("Invalid data format for tags");
        }
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
      });
  };

  useEffect(() => {
    getTags();
  }, []);

  return (
    <div className="main-page-container">
      <div className="page-content">
      <PageHeader title="Add Task" editableView={false} />
        <div className="add-task-form">
          <div className="add-task-form-item">
            <input type="text" id="name" name="name" placeholder="Name" />
          </div>
          <div className="add-task-form-item">
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Description"
            />
          </div>
          <div className="add-task-form-item-row">
            <div className="add-task-form-item date">
              <input
                type="date"
                id="date"
                name="date"
                placeholder="Date"
                defaultValue={new Date().toISOString().substr(0, 10)}
              />
            </div>
            <div className="add-task-form-item">
              <select id="priority" name="priority">
                <option value="high">High</option>
                <option value="normal" selected>
                  Normal
                </option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="add-task-form-item">
              <select id="labels" name="labels">
                {tagList.map((tag) => (
                  <option value={tag._id.toString()}>{tag.name}</option>
                ))}
              </select>
            </div>
            <div className="add-task-form-item">
              <button className="add-task-form-submit" onClick={addTask}>
                Add Task
              </button>
            </div>
          </div>
        </div>
        <PageHeader title="Add Tag" editableView={false} />
        <div className="add-task-form">
          <div className="add-task-form-item">
            <input type="text" id="tag-name" name="name" placeholder="Name" />
          </div>
          <div className="add-task-form-item">
            <button className="add-task-form-submit" onClick={addTag}>
              Add Tag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
