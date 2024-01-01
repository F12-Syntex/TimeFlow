import "./today.css";
import "../pages.css";
import PageHeader from "../../components/update/PageHeader/pageheader";
import ListView from "../../components/update/ListView/listview";
import React, { useEffect, useState } from "react";
import TodoItem from "../../../express/src/types/TodoItem";

function App() {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchTodoList();
  }, []);

  const fetchTodoList = () => {
    fetch("http://localhost:3000/api/sample/tasklist")
      .then((response) => response.json())
      .then((data) => {
        const parsedTodoList: TodoItem[] = data["todoList"].map(
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
        setTodoList(parsedTodoList);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="main-page-container">
      <PageHeader title="Today" editableView={true} />
      <div className="page-content">
        <ListView listViewItems={todoList} />
      </div>
    </div>
  );
}

export default App;
