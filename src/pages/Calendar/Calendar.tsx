import './calendar.css'
import '../pages.css'
import PageHeader from '../../components/update/PageHeader/pageheader'
import TodoItem from 'express/src/types/TodoItem';
import Calendar from '../../components/update/Calendar/calendar'
import { useState, useEffect } from 'react'

function App({ listViewItems }: { listViewItems: TodoItem[] }) {
  
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