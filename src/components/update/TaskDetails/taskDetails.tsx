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
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>,
  ) => void;
  readonly closeModal: () => void;
}) {
  const [task, setTask] = useState<TodoItem>({} as TodoItem);

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
        (document.getElementById("title") as HTMLInputElement).value =
          data["task"].title;
        (document.getElementById("description") as HTMLInputElement).value =
          data["task"].description;
        (document.getElementById("labels") as HTMLInputElement).value =
          data["task"].labels.toString();
        if (data["task"].labels.toString() == "") {
          (document.getElementById("labels") as HTMLInputElement).value =
            "none";
        }
        (document.getElementById("date") as HTMLInputElement).value =
          formatDate(data["task"].date);
        (document.getElementById("priority") as HTMLInputElement).value =
          String(data["task"].priority);
        (document.getElementById("completed") as HTMLInputElement).checked =
          data["task"].completed;
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
    const url = `http://localhost:3000/api/sample/tasks/update/${id}`;
    const method = "PATCH";
    const body = JSON.stringify({
      title: (document.getElementById("title") as HTMLInputElement).value,
      description: (document.getElementById("description") as HTMLInputElement)
        .value,
      labels: (document.getElementById("labels") as HTMLInputElement).value,
      date: (document.getElementById("date") as HTMLInputElement).value,
      priority: parseInt(
        (document.getElementById("priority") as HTMLInputElement).value,
      ),
      completed: (document.getElementById("completed") as HTMLInputElement)
        .checked,
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
    <div className="relative flex flex-col items-center h-full overflow-x-hidden overflow-y-auto bg-white select-none w-[calc(100vw-96px)] dark:bg-zinc-900 pb-9">
      <PageHeader title={task.title} editableView={false} />
      <div className="add-task-form">
        <div className="add-task-form-item">
          <input type="text" id="title" name="title" placeholder="Title" />
        </div>
        <div className="add-task-form-item">
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Description"
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
          <input type="date" id="date" name="date" placeholder="Date" />
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
          <input
            type="checkbox"
            id="completed"
            name="completed"
            placeholder="Completed"
          />
        </div>

        <div className="add-task-form-item-row">
          <button
            className="add-task-form-item add-task-form-submit"
            onClick={saveTask}
          >
            Save
          </button>
          <button
            className="add-task-form-item add-task-form-submit"
            onClick={deleteTask}
          >
            Delete
          </button>
          <button
            className="add-task-form-item add-task-form-submit"
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
