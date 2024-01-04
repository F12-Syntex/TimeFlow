import { app, BrowserWindow, shell, ipcMain, globalShortcut } from "electron";
import { release } from "node:os";
import { join } from "node:path";
import { update } from "./update";
import { expressApp } from "../../express/src/server";
import { Request, Response } from "express-serve-static-core";
import TodoItem from "../../express/src/types/TodoItem";
import TagItem from "../../express/src/types/TagItem";

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
process.env.DIST_ELECTRON = join(__dirname, "../");
process.env.DIST = join(process.env.DIST_ELECTRON, "../dist");
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, "../public")
  : process.env.DIST;

// Disable GPU Acceleration for Windows 7
if (release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null;
// Here, you can also use other preload
const preload = join(__dirname, "../preload/index.js");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, "index.html");

async function createWindow() {
  win = new BrowserWindow({
    title: "TimeFlow",
    icon: join(process.env.VITE_PUBLIC, "new_program_icon.ico"),
    width: 1200,
    height: 900,
    minWidth: 600,
    minHeight: 800,
    // transparent: true,
    // frame: false,
    hasShadow: true,
    titleBarOverlay: true,
    titleBarStyle: "default",
    // vibrancy: "popover",
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
  });

  // win.blur()

  // win.setMenuBarVisibility(false)
  win.removeMenu();

  if (url) {
    // electron-vite-vue#298
    win.loadURL(url);
    // Open devTool if the app is not packaged
    // win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml);
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
    globalShortcut.register("CommandOrControl+Shift+I", toggleDevTools);
  });

  // Unregister the hotkey when the app is about to quit
  app.on("will-quit", () => {
    globalShortcut.unregister("CommandOrControl+Shift+I");
  });

  // Test actively push message to the Electron-Renderer
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });

  // Apply electron-updater
  update(win);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

// New window example arg: new windows url
ipcMain.handle("open-win", (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`);
  } else {
    childWindow.loadFile(indexHtml, { hash: arg });
  }
});

import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

// Encode the username and password for the URI
const user = encodeURIComponent("admin");
const password = encodeURIComponent("admin");
const uri = `mongodb+srv://${user}:${password}@timeflow.g62uc3l.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with MongoClientOptions to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Run the connection function
connectToMongoDB();

const database = client.db("TimeFlow");

// Define an Express route to get tasks from the database
expressApp.get("/api/sample/tasks", async (req: Request, res: Response) => {
  try {
    // Retrieve tasks from the database
    const taskCollection = database.collection("tasks");
    const tasks = await taskCollection.find({}).toArray();
    res.json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Error fetching tasks" });
  }
});

expressApp.get("/api/sample/tasks/:id", async (req: Request, res: Response) => {
  try {
    const tasksCollection = database.collection("tasks");
    const task = tasksCollection.findOne({ _id: new ObjectId(req.params.id) });
    res.json({ task });
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "Error fetching task" });
  }
});

expressApp.post(
  "/api/sample/tasks/add",
  async (req: Request, res: Response) => {
    try {
      const tasksCollection = database.collection("tasks");
      const task: TodoItem = {
        user: req.body.user,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        priority: req.body.priority,
        completed: req.body.completed,
        labels: [new ObjectId(req.body.labels[0])],
        _id: new ObjectId(),
      }

      tasksCollection.insertOne(task);
      res.json({ task });
    } catch (error) {
      console.error("Error adding task:", error);
      res.status(500).json({ error: "Error adding task" });
    }
  }
);

expressApp.patch(
  "/api/sample/tasks/update/:id",
  async (req: Request, res: Response) => {
    try {
      const tasksCollection = database.collection("tasks");
      const taskId = req.params.id;
      const updateData = req.body;

      // Remove the _id field from the update data
      delete updateData._id;
      delete updateData.labels;

      // Perform the update using $set to update specific fields
      await tasksCollection.updateOne(
        { _id: new ObjectId(taskId) },
        { $set: updateData }
      );

      res.json({ message: "Task updated successfully" });
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ error: "Error updating task" });
    }
  }
);

expressApp.delete(
  "/api/sample/tasks/delete/:id",
  async (req: Request, res: Response) => {
    try {
      const tasksCollection = database.collection("tasks");
      tasksCollection.deleteOne({ _id: new ObjectId(req.params.id) });
      res.json({ tasks: [] });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ error: "Error deleting task" });
    }
  }
);

expressApp.get("/api/sample/tags", async (req: Request, res: Response) => {
  try {
    const tagsCollection = database.collection("tags");
    const tags = await tagsCollection.find({}).toArray();
    res.json({ tags });
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: "Error fetching tags" });
  }
});

expressApp.get("/api/sample/tags/:id", async (req: Request, res: Response) => {
  try {
    const tagsCollection = database.collection("tags");
    const tag = await tagsCollection.findOne({ _id: new ObjectId(req.params.id) });
    res.json({ tag });
  } catch (error) {
    console.error("Error fetching tag:", error);
    res.status(500).json({ error: "Error fetching tag" });
  }
});

expressApp.post("/api/sample/tags/add", async (req: Request, res: Response) => {
  try {
    const tagsCollection = database.collection("tags");
    const tag: TagItem = req.body;
    tagsCollection.insertOne(tag);
    res.json({ tag });
  } catch (error) {
    console.error("Error adding tag:", error);
    res.status(500).json({ error: "Error adding tag" });
  }
});

expressApp.delete(
  "/api/sample/tags/delete/:id",
  async (req: Request, res: Response) => {
    try {
      const tagsCollection = database.collection("tags");
      const deletionResult = await tagsCollection.deleteOne({ _id: new ObjectId(req.params.id) });

      const tasksCollection = database.collection("tasks");
      await tasksCollection.updateMany(
        { labels: { $elemMatch: { _id: new ObjectId(req.params.id) } } },
        { $set: { labels: [] } }
      );

      if (deletionResult && deletionResult.deletedCount === 1) {
        res.json({ deletedId: req.params.id });
      } else {
        res.status(404).json({ error: "Tag not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting tag" });
    }
  }
);

expressApp.post("/api/login", async (req: Request, res: Response) => {
  try {
    const usersCollection = database.collection("users");
    const username: string = req.body.username;
    const password: string = req.body.password;

    if (!username || !password) {
      return res.status(400).json({ error: "Missing username or password" });
    }

    // find the user with that username
    // TODO: hash the password
    const user = await usersCollection.findOne({
      username: username,
      password: password,
    });

    // if user has error key then error if has user key then return user
    const hasErrorKey = user !== null && Object.keys(user).includes("error");

    if (hasErrorKey) {
      return res.status(401).json({ error: "Invalid username or password" });
    } else {
      return res.json({ user });
    }
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Error adding user" });
  }
});
