import React from 'react'
import ReactDOM from 'react-dom/client'
import './samples/node-api'
import './index.css'
import Sidebar from './components/update/Sidebar-old'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <Sidebar/>
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
