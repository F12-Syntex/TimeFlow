import './add.css'
import '../pages.css'
import PageHeader from '../../components/update/PageHeader/index'

function App() {
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
          <div className="add-task-form-item">
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
            <input type="text" id="labels" name="labels" placeholder="Labels"/>
          </div>
          <button className="add-task-form-submit">Submit</button>
        </div>
      </div>
    </div>
  )
}

export default App