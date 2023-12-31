import { useState } from 'react'
import UpdateElectron from '@/components/update'
import logoVite from '../../assets/logo-vite.svg'
import logoElectron from './assets/logo-electron.svg'
import './homepage.css'

function App() {
  return (
    <div className='homepage-container'>
      <div className = 'sub-header'>
        <div className='todayName'>
          <h3>Today</h3>
        </div>
        <div>
          <button className='logoButton' data-title="View options">
            <div className="hompage-button-image">
              <img src="/menu_icon.ico/"></img>
            </div>
            open
          </button>
        </div>
      </div>
    </div>
  )
}

export default App