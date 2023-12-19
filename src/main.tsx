import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './samples/node-api'
import './index.css'
import Homepage from './pages/homepage/Homepage'
import Sidebar from './components/update/Sidebar'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div className="main-container">
      <Sidebar/>
      <Homepage/>
    </div>
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
