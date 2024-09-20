const { BrowserWindow, app } = require("electron");
const { join } = require("path");

// import { app, BrowserWindow } from "electron";
// import { join } from "path";
// import isDev from "electron-is-dev";

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {},
    icon: "favicon.ico",
    autoHideMenuBar: true,
  });

  app.isPackaged
    ? win.loadURL("http://localhost:3000")
    : win.loadFile(join(__dirname, "../build/index.html"));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

module.exports = app;
