import './add.css'
import '../pages.css'
import PageHeader from '../../components/update/PageHeader/index'

function App() {
  return (
    <div className='main-page-container'>
      <PageHeader title='Add Task' editableView={false}/>
      <div className="page-content">
      {/* NAME, DESCRIPTION, DATE, PRIORITY */}
      
      </div>
    </div>
  )
}

export default App