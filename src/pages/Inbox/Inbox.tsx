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
        const updatedTodoList: TodoItem[] = data["todoList"].map(
          (element: TodoItem) => ({
            title: element.title,
            description: element.description,
            date: new Date(element.date),
            priority: element.priority,
            labels: element.labels,
            completed: element.completed,
            id: element.id,
          })
        );
        setTodoList(updatedTodoList);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const filterCompleted: boolean = false;
  const filterDate: Date = new Date();

  return (
    <div className="main-page-container">
      <div className="page-content inbox-scroller">
        <PageHeader title="Today" editableView={true} />
        <ListView listViewItems={todoList} filterDate={filterDate} />
        <PageHeader title="Inbox" editableView={true} />
        <ListView listViewItems={todoList} />
      </div>
    </div>
  );
}

export default App;
