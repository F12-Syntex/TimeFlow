import { app } from "electron";
const express = require("express");
const cors = require("cors");

const PORT = 3000;

// Create an Express app
const expressApp = express();

// Serve static files from the 'public' folder
expressApp.use(express.static("public"));
expressApp.use(express.json());
expressApp.use(cors());

// Start the Express server
const expressServer = expressApp.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});

// On Electron app's 'will-quit' event
app.on("will-quit", () => {
  // Close the Express server when Electron app is quitting
  expressServer.close();
});

export { expressApp };
