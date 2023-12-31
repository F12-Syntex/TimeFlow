import './add.css'
import '../pages.css'
import PageHeader from '../../components/update/PageHeader/pageheader'

function App() {

  const addTask = () => {
    fetch('http://localhost:3000/api/sample/tasklist/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: (document.getElementById('name') as HTMLInputElement).value,
        description: (document.getElementById('description') as HTMLInputElement).value,
        date: (document.getElementById('date') as HTMLInputElement).value,
        priority: (document.getElementById('priority') as HTMLInputElement).value,
        labels: (document.getElementById('labels') as HTMLInputElement).value,
        completed: false
      })
    })
  }

  return (
    <div className='main-page-container'>
      <PageHeader title='Add Task' editableView={false}/>
      <div className="page-content">
        <div className="add-task-form">
          <div className="add-task-form-item">
            <input type="text" id="name" name="name" placeholder="Name"/>
          </div>
          <div className="add-task-form-item">
            <input type="text" id="description" name="description" placeholder="Description"/>
          </div>
          <div className="add-task-form-item-row">
            <div className="add-task-form-item date">
              <input type="date" id="date" name="date" placeholder="Date"/>
            </div>
            <div className="add-task-form-item">
              <select id="priority" name="priority">
                <option value="high">High</option>
                <option value="normal" selected>Normal</option>
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
              <button className="add-task-form-submit" onClick={addTask}>Add Task</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App