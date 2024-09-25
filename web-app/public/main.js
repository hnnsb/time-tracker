const { BrowserWindow, app } = require("electron");
const { join } = require("path");

function createWindow() {
  let mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {},
    icon: "icon.ico",
    autoHideMenuBar: true,
  });

  app.isPackaged
    ? mainWindow.loadFile(join(__dirname, "../build/index.html"))
    : mainWindow.loadURL("http://localhost:3000");

  mainWindow.on("closed", () => (mainWindow = null));
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
