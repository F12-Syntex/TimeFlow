import './search.css'
import '../pages.css'
import PageHeader from '../../components/update/PageHeader/index'
import ListView from '../../components/update/ListView/index'
import React from 'react'

interface TodoItem {
  title: string
  description: string
  date: Date
  priority: number
  labels: string[]
  completed: boolean
}

var todoList: TodoItem[] = [
  {
    title: 'Take the productivity method quiz',
    description: 'Get a personalized recommendation from Todoist',
    date: new Date(),
    priority: 0,
    labels: ['Todoist'],
    completed: false,
  },
]

for (let i = 0; i < 15; i++) {
  todoList.push(todoList[0])
}

function App() {
  return (
    <div className='main-page-container'>
      <PageHeader title='Search' editableView={true}/>
      <input type="text" className='search-search-bar' placeholder="Search" />
      <div className="search-page-content">
        <ListView listViewItems={todoList}/>
      </div>
    </div>
  )
}

export default App