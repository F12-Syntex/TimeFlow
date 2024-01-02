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
        const tasks: TodoItem[] = data["tasks"];
  
        const fetchLabelPromises = tasks.map((task: TodoItem) =>
          fetch(`http://localhost:3000/api/sample/tags/${task.labels}`)
            .then((response) => response.json())
            .then((labelData) => {
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
  

  return (
    <div className='main-page-container'>
      <PageHeader title='Calendar' editableView={true}/>
      <div className="page-content">

      </div>
    </div>
  )
}

export default App