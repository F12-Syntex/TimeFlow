import './tags.css'
import '../pages.css'
import PageHeader from '../../components/update/PageHeader/pageheader'
import TagListView from '../../components/update/TagListView/taglistview'
import { useState, useEffect } from 'react'
import TagItem from 'express/src/types/TagItem'

function App() {
  const [todoList, setTodoList] = useState<TagItem[]>([]);

  useEffect(() => {
    // Perform initial data fetching or setup here if needed
    // For example:
    fetchTaskList();
  }, []);

  const fetchTaskList = () => {
    fetch("http://localhost:3000/api/sample/tags")
      .then((response) => response.json())
      .then((data) => {
        const updatedTodoList: TagItem[] = data["tags"].map(
          (element: TagItem) => ({
            name: element.name,
            id: element._id,
          })
        );
        setTodoList(updatedTodoList);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className='main-page-container'>
      <PageHeader title='Tags' editableView={true}/>
      <div className="page-content">
        <TagListView listViewItems={todoList} />
      </div>
    </div>
  )
}

export default App