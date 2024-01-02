import "./inbox.css";
import "../pages.css";
import PageHeader from "../../components/update/PageHeader/pageheader";
import ListView from "../../components/update/ListView/listview";
import React, { useEffect, useState } from "react";
import TodoItem from "../../../express/src/types/TodoItem";

function App() {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  useEffect(() => {
    // Perform initial data fetching or setup here if needed
    // For example:
    fetchTaskList();
  }, []);

  const fetchTaskList = () => {
    fetch("http://localhost:3000/api/sample/tasks")
      .then((response) => response.json())
      .then((data) => {
        const tasks: TodoItem[] = data["tasks"];
  
        const fetchLabelPromises = tasks.map((task: TodoItem) =>
          fetch(`http://localhost:3000/api/sample/tags/${task.labels}`)
            .then((response) => response.json())
            .then((labelData) => {
              console.log(labelData);
              return labelData;
            })
            .catch((error) => {
              console.error("Error fetching label:", error);
              return null;
            })
        );
  
        Promise.all(fetchLabelPromises)
          .then((labelResults) => {
            const updatedTodoList: TodoItem[] = tasks.map((task: TodoItem, index: number) => ({
              user: "", // Add the missing user property
              title: task.title,
              description: task.description,
              date: new Date(task.date),
              priority: task.priority,
              labels: labelResults[index],
              completed: task.completed,
              _id: task._id,
            }));
            setTodoList(updatedTodoList);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };
  
  const filterCompleted: boolean = false;
  const filterDate: Date = new Date();

  return (
    <div className="main-page-container">
      <div className="page-content">
        <PageHeader title="Today" editableView={true} />
        <ListView listViewItems={todoList} filterDate={filterDate} />
        <PageHeader title="Inbox" editableView={false} />
        <ListView listViewItems={todoList} filterInverseDate={filterDate} />
      </div>
    </div>
  );
}

export default App;
