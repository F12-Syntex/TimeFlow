import { useState } from 'react'
import UpdateElectron from '@/components/update'
import logoVite from '../../assets/logo-vite.svg'
import logoElectron from './assets/logo-electron.svg'
import './homepage.css'
import Sidebar from '@/components/update/Sidebar'

function App() {
  return (
    <div className='homepage-container'>
      <div className = 'sub-header'>
        <div className='todayName'>
          <h3>Today</h3>
        </div>
        <div className='logoButton'>
          <button className='logoButton'><img src="/menu_icon.ico/"></img> View</button>
        </div>
      </div>
    </div>
  )
}

export default App