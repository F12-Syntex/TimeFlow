import './calendar.css'
import '../pages.css'
import PageHeader from '../../components/update/PageHeader/pageheader'
import TodoItem from 'express/src/types/TodoItem';
import { useState, useEffect } from 'react'

function App() {

  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  useEffect(() => {
    fetchTaskList();
  }, []);

  const fetchTaskList = () => {
    fetch("http://localhost:3000/api/sample/tasks")
      .then((response) => response.json())
      .then((data) => {
        console.log(data["tasks"].map((element: TodoItem) => element));
        const updatedTodoList: TodoItem[] = data["tasks"].map(
          (element: TodoItem) => ({
            title: element.title,
            description: element.description,
            date: new Date(element.date),
            priority: element.priority,
            labels: element.labels,
            completed: element.completed,
            _id: element._id,
          })
        );
        setTodoList(updatedTodoList);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className='main-page-container'>
      <PageHeader title='Calendar' editableView={true}/>
      <div className="page-content">

      </div>
    </div>
  )
}

export default App