import React, { useEffect, useState } from "react";
import PageHeader from "../PageHeader/pageheader";
import TodoItem from "express/src/types/TodoItem";
import TagItem from "express/src/types/TagItem";

function TaskDetails({ id, deleteTask, closeModal }: { id: string, deleteTask: (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>) => void, closeModal: () => void}) {
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
        console.log(data["task"].labels.toString());
        setTask(data["task"]);
        (document.getElementById("title") as HTMLInputElement).value =
          data["task"].title;
        (document.getElementById("description") as HTMLInputElement).value =
          data["task"].description;
        (document.getElementById("labels") as HTMLInputElement).value =
          data["task"].labels.toString();
        if (data["task"].labels.toString() === "") {
          (document.getElementById("labels") as HTMLInputElement).value =
            "none";
        }
        // get the tag name from the id in later version
        (document.getElementById("date") as HTMLInputElement).value =
          formatDate(data["task"].date);
        (document.getElementById("priority") as HTMLInputElement).value =
          data["task"].priority.toString();
        (document.getElementById("completed") as HTMLInputElement).checked =
          data["task"].completed;
        (document.getElementById("id") as HTMLInputElement).value =
          data["task"]._id;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    getTaskDetails();
    getTags();
  }, []);

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

  function saveTask() {
    const url = `http://localhost:3000/api/sample/tasks/update/${id}`;
    const method = "PATCH";
    const body = JSON.stringify({
      title: (document.getElementById("title") as HTMLInputElement).value,
      description: (document.getElementById(
        "description"
      ) as HTMLInputElement).value,
      labels: (document.getElementById("labels") as HTMLInputElement).value,
      date: (document.getElementById("date") as HTMLInputElement).value,
      priority: parseInt(
        (document.getElementById("priority") as HTMLInputElement).value
      ),
      completed: (document.getElementById(
        "completed"
      ) as HTMLInputElement).checked,
    });
    const headers = {
      "Content-Type": "application/json",
    };

    fetch(url, { method, body, headers })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    closeModal();
  }

  return (
    <div className="modal-container">
      <div className="page-content">
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
            <select id="priority" name="priority" defaultValue="priority">
              <option value="priority" disabled>
                Priority
              </option>
              <option value="high">High</option>
              <option value="normal">Normal</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="add-task-form-item">
            <input
              type="checkbox"
              id="completed"
              name="completed"
              placeholder="Completed"
            />
          </div>
          <div className="add-task-form-item">
            <input type="hidden" id="id" name="id" />
          </div>

          <div className="add-task-form-item-row">
          <button className="add-task-form-submit" onClick={saveTask}>Save</button>
            <button className="add-task-form-submit" onClick={deleteTask}>Delete</button>
            <button
              className="add-task-form-submit"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
