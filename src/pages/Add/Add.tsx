import "./add.css";
import "../pages.css";
import PageHeader from "../../components/update/PageHeader/pageheader";
import Select from "react-select";
import { useState } from "react";

function App() {
  const addTask = () => {
    // make sure all fields are filled out
    if ((document.getElementById("name") as HTMLInputElement)?.value === "") {
      alert("Please enter a name");
      return;
    }

    if (
      (document.getElementById("description") as HTMLInputElement)?.value === ""
    ) {
      alert("Please enter a description");
      return;
    }

    if ((document.getElementById("date") as HTMLInputElement)?.value === "") {
      alert("Please enter a date");
      return;
    }

    if (
      (document.getElementById("priority") as HTMLInputElement)?.value === ""
    ) {
      alert("Please enter a priority");
      return;
    }

    if ((document.getElementById("labels") as HTMLInputElement)?.value === "") {
      alert("Please enter a label");
      return;
    }

    if (
      new Date(
        (document.getElementById("date") as HTMLInputElement)?.value ?? ""
      ).toString() === "Invalid Date"
    ) {
      alert("Please enter a valid date");
      return;
    }

    const task = {
      title: (document.getElementById("name") as HTMLInputElement)?.value ?? "",
      description:
        (document.getElementById("description") as HTMLInputElement)?.value ??
        "",
      date: formatDate(
        (document.getElementById("date") as HTMLInputElement)?.value ?? ""
      ),
      priority:
        (document.getElementById("priority") as HTMLInputElement)?.value ?? "",
      labels: [
        (document.getElementById("labels") as HTMLInputElement)?.value ?? "",
      ],
      completed: false,
      id: Math.floor(Math.random() * 1000000000),
    };

    fetch("http://localhost:3000/api/sample/tasklist/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      // then alert the user that the task was added and redirect to the inbo
      .then((response) => {
        if (response.status === 200) {
          alert("Task added");
          window.location.href = "/inbox";
        } else {
          alert("Error adding task");
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

  const options = [
    { value: "work", label: "Work" },
    { value: "school", label: "School" },
    { value: "personal", label: "Personal" },
  ];

  return (
    <div className="main-page-container">
      <PageHeader title="Add Task" editableView={false} />
      <div className="page-content">
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
                {/* placeholders */}
                <option value="work">Work</option>
                <option value="school">School</option>
                <option value="personal">Personal</option>
              </select>
            </div>
            <div className="add-task-form-item">
              <button className="add-task-form-submit" onClick={addTask}>
                Add Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
