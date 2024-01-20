import React, { useEffect, useState } from "react";
import PageHeader from "../PageHeader/pageheader";
import TagItem from "express/src/types/TagItem";
import TodoItem from "express/src/types/TodoItem";
import ListView from "../ListView/listview";

function TagDetails({
  id,
  deleteTag,
  closeModal,
}: {
  id: string;
  deleteTag: (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>
  ) => void;
  closeModal: () => void;
}) {
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
          console.log(data.tasks);
        } else {
          console.error("Invalid data format for tasks");
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  const [taskList, setTaskList] = useState<TodoItem[]>([]);

  function saveTag() {
    const url = `http://localhost:3000/api/sample/tags/update/${id}`;
    const method = "PATCH";
    const body = JSON.stringify({
      name: (document.getElementById("name") as HTMLInputElement).value,
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
      <PageHeader title={tag.name} editableView={false} />
      <div className="add-task-form">
        <div className="add-task-form-item">
          <input type="text" id="name" name="title" placeholder="Title" />
        </div>

        <div className="add-task-form-item-row">
          <button
            className="add-task-form-item add-task-form-submit"
            onClick={saveTag}
          >
            Save
          </button>
          <button
            className="add-task-form-item add-task-form-submit"
            onClick={deleteTag}
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
      <PageHeader title="Related Tasks" editableView={false} />
      <ListView listViewItems={taskList} />
    </div>
  );
}

export default TagDetails;
