import { app, BrowserWindow, shell, ipcMain, globalShortcut } from 'electron'
import { release } from 'node:os'
import { join } from 'node:path'
import { update } from './update'
import { expressApp } from '../../express/src/server'
import { Request, Response } from 'express-serve-static-core';

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, '../')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')

async function createWindow() {
  win = new BrowserWindow({
    title: 'TimeFlow',
    icon: join(process.env.VITE_PUBLIC, 'new_program_icon.ico'),
    width: 1200,
    height: 900,
    minWidth: 600,
    minHeight: 800,
    // transparent: true,
    // frame: false,
    hasShadow: true,
    titleBarOverlay: true,
    titleBarStyle: 'default',
    vibrancy: 'popover',
    roundedCorners: true,
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true,
    },
  })

  // win.blur()

  // win.setMenuBarVisibility(false)
  win.removeMenu()

  if (url) { // electron-vite-vue#298
    win.loadURL(url)
    // Open devTool if the app is not packaged
    // win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
  }

  // Function to toggle dev tools
  const toggleDevTools = () => {
    if (win) {
      if (win.webContents.isDevToolsOpened()) {
        win.webContents.closeDevTools();
      } else {
        win.webContents.openDevTools();
      }
    }
  };

  // Register global hotkey to toggle dev tools (CmdOrCtrl+Shift+I)
  app.whenReady().then(() => {
    globalShortcut.register('CommandOrControl+Shift+I', toggleDevTools);
  });

  // Unregister the hotkey when the app is about to quit
  app.on('will-quit', () => {
    globalShortcut.unregister('CommandOrControl+Shift+I');
  });

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })

  // Apply electron-updater
  update(win)
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})

interface TodoItem {
  title: string
  description: string
  date: Date
  priority: string
  labels: string[]
  completed: boolean
}

var todoList: TodoItem[] = [
  {
    title: 'Take the productivity method quiz',
    description: 'Get a personalized recommendation from Todoist',
    date: new Date(),
    priority: "low",
    labels: ['Todoist'],
    completed: false,
  },
  {
    title: 'Second',
    description: 'Second description',
    date: new Date(),
    priority: "low",
    labels: ['2nd label'],
    completed: true,
  },
  {
    title: 'Take the productivity method quiz',
    description: 'Get a personalized recommendation from Todoist',
    date: new Date(),
    priority: "low",
    labels: ['Todoist'],
    completed: false,
  },
  {
    title: 'Second',
    description: 'Second description',
    date: new Date(),
    priority: "low",
    labels: ['2nd label'],
    completed: true,
  },
  {
    title: 'Take the productivity method quiz',
    description: 'Get a personalized recommendation from Todoist',
    date: new Date(),
    priority: "low",
    labels: ['Todoist'],
    completed: false,
  },
  {
    title: 'Second',
    description: 'Second description',
    date: new Date(),
    priority: "low",
    labels: ['2nd label'],
    completed: true,
  },
  {
    title: 'Take the productivity method quiz',
    description: 'Get a personalized recommendation from Todoist',
    date: new Date(),
    priority: "low",
    labels: ['Todoist'],
    completed: false,
  },
  {
    title: 'Second',
    description: 'Second description',
    date: new Date(),
    priority: "low",
    labels: ['2nd label'],
    completed: true,
  },
  {
    title: 'Take the productivity method quiz',
    description: 'Get a personalized recommendation from Todoist',
    date: new Date(),
    priority: "low",
    labels: ['Todoist'],
    completed: false,
  },
  {
    title: 'Second',
    description: 'Second description',
    date: new Date(),
    priority: "low",
    labels: ['2nd label'],
    completed: true,
  }
]

expressApp.get('/api/sample/tasklist', (req: Request, res: Response) => {
  res.json({todoList})
});

expressApp.get('/api/sample/tasklist/:id', (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  res.json({todoList: todoList[id]})
});

expressApp.post('/api/sample/tasklist/add', (req: Request, res: Response) => {
  const newTask: TodoItem = req.body;
  todoList.push(newTask);
  res.json({todoList})
});