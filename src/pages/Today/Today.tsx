import './today.css'
import '../pages.css'
import PageHeader from '../../components/update/PageHeader/pageheader'
import ListView from '../../components/update/ListView/listview'

interface TodoItem {
  title: string
  description: string
  date: Date
  priority: string
  labels: string[]
  completed: boolean
}

const todoList: TodoItem[] = []

fetch('http://localhost:3000/api/sample/tasklist')
  .then(response => response.json())
  .then(data => {
    data['todoList'].forEach((element: TodoItem) => {
      todoList.push({
        title: element.title,
        description: element.description,
        date: new Date(element.date),
        priority: element.priority,
        labels: element.labels,
        completed: element.completed
      })
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });

function App() {
  return (
    <div className='main-page-container'>
      <PageHeader title='Today' editableView={true}/>
      <div className="page-content">
        <ListView listViewItems={todoList}/>
      </div>
    </div>
  )
}

export default App