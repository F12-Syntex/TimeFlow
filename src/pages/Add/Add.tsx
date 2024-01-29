import "./add.css";
import "../pages.css";
import PageHeader from "../../components/update/PageHeader/pageheader";
import TagItem from "express/src/types/TagItem";
import TodoItem from "express/src/types/TodoItem";
import React, { useEffect, useState } from "react";
import { ObjectId } from "mongodb";
import { getTags } from "../../components/Functions/utils";

function App({
  closeModal,
  type,
}: {
  readonly closeModal: () => void;
  readonly type: string;
}) {
  // get user from cookie
  function getUserID() {
    const cookies = document.cookie.split(";");
    const userCookie = cookies.find((cookie) => cookie.includes("user"));
    if (userCookie) {
      return new ObjectId(userCookie.split("=")[1]);
    } else {
      return new ObjectId();
    }
  }

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
        (document.getElementById("date") as HTMLInputElement)?.value ?? "",
      ).toString() === "Invalid Date"
    ) {
      alert("Please enter a valid date for this task");
      return;
    }

    const task: TodoItem = {
      user: getUserID(),
      title: (document.getElementById("name") as HTMLInputElement)?.value ?? "",
      description:
        (document.getElementById("description") as HTMLInputElement)?.value ??
        "",
      date: formatDate(
        (document.getElementById("date") as HTMLInputElement)?.value ?? "",
      ),
      priority:
        (document.getElementById("priority") as HTMLInputElement)?.value ?? "",
      labels:
        (document.getElementById("labels") as HTMLInputElement)?.value ===
        "none"
          ? []
          : [
              new ObjectId(
                (document.getElementById("labels") as HTMLInputElement)
                  ?.value ?? "",
              ),
            ],
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
        if (response.status !== 200) {
          alert("Error adding task");
        }
      });
    closeModal();
  };

  const addTag = () => {
    // make sure all fields are filled out
    if (
      (document.getElementById("tag-name") as HTMLInputElement)?.value === ""
    ) {
      alert("Please enter a tag name");
      return;
    }

    const tag: TagItem = {
      user: getUserID(),
      name:
        (document.getElementById("tag-name") as HTMLInputElement)?.value ?? "",
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
        if (response.status !== 200) {
          alert("Error adding tag");
        }
      });
    closeModal();
  };

  const formatDate = (date: string) => {
    const dateArray = date.split("-");
    return new Date(
      parseInt(dateArray[0]),
      parseInt(dateArray[1]) - 1,
      parseInt(dateArray[2]),
    );
  };

  const [tagList, setTagList] = useState<TagItem[]>([]);

  useEffect(() => {
    getTags(setTagList);
  }, []);

  return (
    <div className="relative flex flex-col items-center h-full overflow-x-hidden overflow-y-auto bg-white select-none w-[calc(100vw-96px)] dark:bg-zinc-900 h-full pb-9">
      {type === "task" || type === "all" ? (
        <>
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
              <div className="add-task-form-item">
                <input
                  type="date"
                  id="date"
                  name="date"
                  placeholder="Date"
                  defaultValue={new Date().toISOString().slice(0, 10)}
                />
              </div>
              <div className="add-task-form-item">
                <input
                  id="priority"
                  name="priority"
                  placeholder="Priority"
                  defaultValue="0"
                  min="0"
                  max="100"
                  type="number"
                />
              </div>
              <div className="add-task-form-item">
                <select id="labels" name="labels" defaultValue="none">
                  <option value="none">No Tag</option>
                  {tagList.map((tag) => (
                    <option key={tag._id.toString()} value={tag._id.toString()}>
                      {tag.name}
                    </option>
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
        </>
      ) : null}

      {type === "tag" || type === "all" ? (
        <>
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
        </>
      ) : null}
    </div>
  );
}

export default App;
