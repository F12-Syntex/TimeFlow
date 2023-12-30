import './tags.css'
import '../pages.css'
import PageHeader from '../../components/update/PageHeader/pageheader'

function App() {
  return (
    <div className='main-page-container'>
      <PageHeader title='Tags' editableView={true}/>
      <div className="page-content">

      </div>
    </div>
  )
}

export default App