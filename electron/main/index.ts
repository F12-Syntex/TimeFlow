import {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  globalShortcut,
  session,
} from "electron";
import { release } from "node:os";
import { join } from "node:path";
import { update } from "./update";
import { expressApp } from "../../express/src/server";
import { Request, Response } from "express-serve-static-core";
import TodoItem from "../../express/src/types/TodoItem";
import TagItem from "../../express/src/types/TagItem";
import crypto from "crypto";

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
    show: false,
    // frame: false,
    hasShadow: true,
    titleBarOverlay: true,
    // titleBarStyle: "hiddenInset",
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

  win.blur()

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

  win.once("ready-to-show", () => {
    win?.show();
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
    const userObjectId = await fetchUserObjectID();

    const taskCollection = database.collection("tasks");
    const tasks = await taskCollection.find({ user: userObjectId }).toArray();

    res.json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Error fetching tasks" });
  }
});

// make sure only logged in user can access this route
expressApp.get("/api/sample/tasks/:id", async (req: Request, res: Response) => {
  try {
    const userObjectId = await fetchUserObjectID();

    const tasksCollection = database.collection("tasks");
    const task = await tasksCollection.findOne({
      $and: [{ user: userObjectId }, { _id: new ObjectId(req.params.id) }],
    });
    res.json({ task });
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "Error fetching task" });
  }
});

// make sure only logged in user can access this route
expressApp.post(
  "/api/sample/tasks/add",
  async (req: Request, res: Response) => {
    try {
      const userObjectId = await fetchUserObjectID();
      const tasksCollection = database.collection("tasks");

      const task: TodoItem = {
        user: userObjectId,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        priority: req.body.priority,
        completed: req.body.completed,
        labels: [new ObjectId(req.body.labels[0])],
        _id: new ObjectId(),
      };

      tasksCollection.insertOne(task);
      res.json({ task });
    } catch (error) {
      console.error("Error adding task:", error);
      res.status(500).json({ error: "Error adding task" });
    }
  }
);

// make sure only logged in user can access this route
expressApp.patch(
  "/api/sample/tasks/update/:id",
  async (req: Request, res: Response) => {
    try {
      const userObjectId = await fetchUserObjectID();

      const tasksCollection = database.collection("tasks");
      const taskId = req.params.id;
      const updateData: Partial<TodoItem> = {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        priority: req.body.priority,
        completed: req.body.completed,
        // labels: [new ObjectId(req.body.labels[0])],
        // user: userObjectId,
      };

      // Perform the update using $set to update specific fields
      await tasksCollection.updateOne(
        { $and: [{ _id: new ObjectId(taskId) }, { user: userObjectId }] },
        { $set: updateData }
      );

      res.json({ message: "Task updated successfully" });
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ error: "Error updating task" });
    }
  }
);

// make sure only logged in user can access this route
expressApp.delete(
  "/api/sample/tasks/delete/:id",
  async (req: Request, res: Response) => {
    try {
      const userObjectId = await fetchUserObjectID();

      const tasksCollection = database.collection("tasks");
      tasksCollection.deleteOne({ $and: [{ _id: new ObjectId(req.params.id) }, { user: userObjectId }] });
      res.json({ tasks: [] });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ error: "Error deleting task" });
    }
  }
);

// make sure only logged in user can access this route
expressApp.get("/api/sample/tags", async (req: Request, res: Response) => {
  try {
    const userObjectId = await fetchUserObjectID();

    const tagsCollection = database.collection("tags");
    const tags = await tagsCollection.find({ user: userObjectId }).toArray();
    res.json({ tags });
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: "Error fetching tags" });
  }
});

expressApp.get("/api/sample/tags/:id", async (req: Request, res: Response) => {
  try {
    const userObjectId = await fetchUserObjectID();

    const tagsCollection = database.collection("tags");
    const tag = await tagsCollection.findOne({
      $and: [{ user: userObjectId }, { _id: new ObjectId(req.params.id) }],
    });
    res.json({ tag });
  } catch (error) {
    console.error("Error fetching tag:", error);
    res.status(500).json({ error: "Error fetching tag" });
  }
});

expressApp.post("/api/sample/tags/add", async (req: Request, res: Response) => {
  try {
    const userObjectId = await fetchUserObjectID();
    
    const tagsCollection = database.collection("tags");
    const tag: TagItem = {
      user: userObjectId,
      name: req.body.name,
      _id: new ObjectId(),
    }
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
      const userObjectId = await fetchUserObjectID();
      
      const tagsCollection = database.collection("tags");
      const deletionResult = await tagsCollection.deleteOne({
        _id: new ObjectId(req.params.id),
      });

      const tasksCollection = database.collection("tasks");

      const updateResult = await tasksCollection.updateMany(
        { $and: [{ user: userObjectId }, { labels: [new ObjectId(req.params.id)] }] },
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

    // hash the password
    const hashedPassword = crypto
      .createHash("sha1")
      .update(password)
      .digest("hex");

    // find the user with that username and password
    const user = await usersCollection.findOne({
      $and: [{ username: username }, { password: hashedPassword }],
    });

    // if user has error key then error if has user key then return user
    const hasErrorKey = user !== null && Object.keys(user).includes("error");

    if (hasErrorKey) {
      return res.status(401).json({ error: "Invalid username or password" });
    } else if (user) {
      // set cookie for user._id and isLoggedin
      const cookieDetails: Electron.CookiesSetDetails = {
        url: "http://localhost",
        name: "user",
        value: user._id.toString(),
        domain: "localhost",
        expirationDate: 999999999999,
      };

      session.defaultSession.cookies.set(cookieDetails);

      res.json({ user });
    }
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Error adding user" });
  }
});

expressApp.post("/api/register", async (req: Request, res: Response) => {
  try {
    const usersCollection = database.collection("users");
    const email: string = req.body.email;
    const username: string = req.body.username;
    const password: string = req.body.password;

    if (!username || !password || !email) {
      return res.status(400).json({ error: "Missing username or password" });
    }

    // hash the password
    const hashedPassword = crypto
      .createHash("sha1")
      .update("password")
      .digest("hex");

    // find the user with that username or email
    const user = await usersCollection.findOne({
      $or: [{ username: username }, { email: email }],
    });

    // if user has error key then error if has user key then return user
    const hasErrorKey = user !== null && Object.keys(user).includes("error");

    if (hasErrorKey) {
      return res.status(401).json({ error: "Username already exists" });
    } else {
      const newUser = {
        email: email,
        username: username,
        password: hashedPassword,
      };

      await usersCollection.insertOne(newUser);
      return res.json({ user: newUser });
    }
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Error adding user" });
  }
});

expressApp.get("/api/forgot-password", async (req: Request, res: Response) => {
  try {
    const usersCollection = database.collection("users");
    const username: string = req.body.username;
    const email: string = req.body.email;

    if (!email) {
      return res.status(400).json({ error: "Missing email" });
    }

    // find the user with that email and username
    const user = await usersCollection.findOne({
      $and: [{ email: email }, { username: username }],
    });

    // if user has error key then error if has user key then return user
    const hasErrorKey = user !== null && Object.keys(user).includes("error");

    if (hasErrorKey) {
      return res.status(401).json({ error: "Email does not exist" });
    } else {
      // TODO: send email with password reset link
      return res.json({ user });
    }
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Error adding user" });
  }
});

expressApp.post("/api/logout", async (req: Request, res: Response) => {
  try {
    const cookie: Electron.CookiesSetDetails = {
      url: "http://localhost",
      name: "user",
      value: "",
      domain: "localhost",
      expirationDate: 999999999999,
    };

    session.defaultSession.cookies.set(cookie)

    return res.json({ cookie });
  } catch (error) {
    console.error("Error deleting cookie:", error);
    res.status(500).json({ error: "Error deleting cookie" });
  }
});

expressApp.get("/api/get-login-status", async (req: Request, res: Response) => {
  try {
    const cookie = await session.defaultSession.cookies.get({
      url: "http://localhost",
      name: "user",
    });

    if (cookie) {
      return res.json({ cookie });
    } else {
      res.status(404).json({ error: "Cookie not found" });
    }
  } catch (error) {
    console.error("Error getting cookie:", error);
    res.status(500).json({ error: "Error getting cookie" });
  }
});

async function fetchUserObjectID() {
  const loginStatusResponse = await fetch("http://localhost:3000/api/get-login-status", {
    method: "GET",
    credentials: "include",
  });

  const loginStatusData = await loginStatusResponse.json();
  const userValue = loginStatusData.cookie[0].value;
  return new ObjectId(userValue);
}