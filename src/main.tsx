import React from 'react'
import ReactDOM from 'react-dom/client'
import './samples/node-api'
import './index.css'
import TimeFlow from './components/TimeFlow/timeflow'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TimeFlow />
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
