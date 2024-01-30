import React, { useEffect, useState } from "react";
import PageHeader from "../PageHeader/pageheader";
import TodoItem from "express/src/types/TodoItem";
import TagItem from "express/src/types/TagItem";
import "@/components/update/TaskDetails/taskDetails.css";
import { getTags } from "@/components/Functions/utils";

function TaskDetails({
  id,
  deleteTask,
  closeModal,
}: {
  readonly id: string;
  readonly deleteTask: (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>
  ) => void;
  readonly closeModal: () => void;
}) {
  const [task, setTask] = useState<TodoItem>({
    title: "",
    description: "",
    labels: [],
    date: new Date(),
    priority: "",
    completed: false,
  } as TodoItem);

  const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, completed: event.currentTarget.checked });
  };

  function formatDate(date: Date): string {
    const formattedDate = new Date(date);
    const mm = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const dd = String(formattedDate.getDate()).padStart(2, "0");
    const yyyy = formattedDate.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  }

  function getTaskDetails() {
    const url = `http://localhost:3000/api/sample/tasks/${id}`;
    const method = "GET";
    const headers = {
      "Content-Type": "application/json",
    };

    fetch(url, { method, headers })
      .then((response) => response.json())
      .then((data) => {
        setTask(data["task"]);
        (document.getElementById("labels") as HTMLInputElement).value =
          data["task"].labels.toString();
        if (data["task"].labels.toString() == "") {
          (document.getElementById("labels") as HTMLInputElement).value =
            "none";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    getTaskDetails();
    getTags(setTagList);
  }, []);

  const [tagList, setTagList] = useState<TagItem[]>([]);

  function saveTask() {

    if (
      (document.getElementById("title") as HTMLInputElement)?.value === "" ||
      (document.getElementById("description") as HTMLInputElement)?.value ===
        "" ||
      (document.getElementById("date") as HTMLInputElement)?.value === "" ||
      (document.getElementById("priority") as HTMLInputElement)?.value === ""
    ) {
      alert("Please fill out all fields");
      return;
    }

    const url = `http://localhost:3000/api/sample/tasks/update/${id}`;
    const method = "PATCH";
    const body = JSON.stringify({
      title: task.title,
      description: task.description,
      labels: (document.getElementById("labels") as HTMLInputElement).value,
      date: task.date,
      priority: task.priority,
      completed: task.completed,
    });
    const headers = {
      "Content-Type": "application/json",
    };

    fetch(url, { method, body, headers })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    closeModal();
  }

  return (
    <div className="relative flex flex-col items-center h-full overflow-x-hidden overflow-y-auto bg-white select-none sm:w-[80vw] lg:w-[70vw] 2xl:w-[60vw] dark:bg-zinc-900 pb-9">
      <PageHeader
        title={task.title === "" ? "No Title" : task.title}
        editableView={false}
      />
      <div className="add-task-form">
        <div className="add-task-form-item">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            className="btn"
          />
        </div>
        <div className="add-task-form-item">
          <input
            className="btn"
            type="text"
            id="description"
            name="description"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            placeholder="Description"
          />
        </div>
        <div className="add-task-form-item">
          <select id="labels" name="labels" defaultValue="none" className="btn">
            <option value="none">No Tag</option>
            {tagList.map((tag) => (
              <option key={tag._id.toString()} value={tag._id.toString()}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
        <div className="add-task-form-item">
          <input
            type="date"
            id="date"
            name="date"
            placeholder="Date"
            value={formatDate(task.date)}
            onChange={(e) =>
              setTask({ ...task, date: new Date(e.target.value) })
            }
            className="btn"
          />
        </div>
        <div className="add-task-form-item">
          <input
            className="btn"
            id="priority"
            name="priority"
            placeholder="Priority"
            value={task.priority}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
            min="0"
            max="100"
            type="number"
          />
        </div>
        <div className="add-task-form-item">
          <div className="round">
            <input
              className="btn"
              type="checkbox"
              name="completed"
              id="completed"
              checked={task.completed}
              onChange={handleCheckboxClick}
            />
            <label htmlFor="completed"></label>
          </div>
        </div>

        <div className="add-task-form-item-row">
          <button
            className="add-task-form-item add-task-form-submit btn"
            onClick={saveTask}
          >
            Save
          </button>
          <button
            className="add-task-form-item add-task-form-submit btn"
            onClick={deleteTask}
          >
            Delete
          </button>
          <button
            className="add-task-form-item add-task-form-submit btn"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
