import './tags.css'
import '../pages.css'
import PageHeader from '../../components/update/PageHeader/pageheader'
import TagListView from '../../components/update/TagListView/taglistview'
import { useState, useEffect } from 'react'
import TagItem from 'express/src/types/TagItem'

function App({ listViewItems }: { listViewItems: TagItem[] }) {

  return (
    <div className='main-page-container'>
      <PageHeader title='Tags' editableView={true}/>
      <div className="page-content">
        <TagListView listViewItems={listViewItems} />
      </div>
    </div>
  )
}

export default App