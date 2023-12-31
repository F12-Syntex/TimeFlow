import './calendar.css'
import '../pages.css'
import PageHeader from '../../components/update/PageHeader/pageheader'
import TodoItem from 'express/src/types/TodoItem';
import Calendar from '../../components/update/Calendar/calendar'
import { useState, useEffect } from 'react'
import TagItem from 'express/src/types/TagItem';
import useFetchTaskList from '../../components/Functions/FetchTaskList/fetchTaskList'

function App() {
  
  const [tagList, setTagList] = useState<TagItem[]>([]);
  const todoList = useFetchTaskList();

  return (
    <div className='main-page-container'>
      <PageHeader title='Calendar' editableView={true}/>
      <div className="page-content">
        <Calendar />
      </div>
    </div>
  )
}

export default App