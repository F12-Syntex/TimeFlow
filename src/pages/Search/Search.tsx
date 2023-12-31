import './search.css'
import '../pages.css'
import PageHeader from '../../components/update/PageHeader/pageheader'
import ListView from '../../components/update/ListView/listview'
import React from 'react'

interface TodoItem {
  title: string
  description: string
  date: Date
  priority: string
  labels: string[]
  completed: boolean
}

const todoList: TodoItem[] = []

// example fetch from url 
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

  const [filteredList, setFilteredList] = React.useState(todoList);

  const parseDate = (date: Date): string => {
    const currentDate = new Date();
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
  
    // Check if the date is today
    if (date.toDateString() === currentDate.toDateString()) {
      return 'Today';
    }
  
    // Check if the date is tomorrow
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(currentDate.getDate() + 1);
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }
  
    // Check if the date is within the next 7 days
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(currentDate.getDate() + 7);
    if (date.getTime() < nextWeek.getTime()) {
      const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return dayOfWeek[date.getDay()];
    }
  
    // Return the date as mm/dd/yyyy for dates outside the range
    const formattedDate = new Date(date);
    const mm = String(formattedDate.getMonth() + 1).padStart(2, '0');
    const dd = String(formattedDate.getDate()).padStart(2, '0');
    const yyyy = formattedDate.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  };
  
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value.toLowerCase();
    // Filter the list of items based on the search text
    setFilteredList(todoList.filter((item) => {
      return (
        item.title.toLowerCase().includes(searchText) ||
        item.description.toLowerCase().includes(searchText) ||
        item.priority.toLowerCase().includes(searchText) ||
        item.labels.some((label) => label.toLowerCase().includes(searchText)) ||
        parseDate(item.date).toLowerCase().includes(searchText) ||
        item.completed.toString().toLowerCase().includes(searchText)
      );
    }, []));
  };

  return (
    <div className='main-page-container'>
      <PageHeader title='Search' editableView={false}/>
      <input type="text" className='search-search-bar' placeholder="Search" onChange={handleSearch} />
      <div className="search-page-content">
        <ListView listViewItems={filteredList}/>
      </div>
    </div>
  )
}

export default App