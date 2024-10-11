const { BrowserWindow, app } = require("electron");
const { join } = require("path");
const { autoUpdater } = require("electron-updater");
const log = require("electron-log");

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = "info";
log.info("App starting...");

let mainWindow;

function sendStatusToWindow(text) {
  log.info(text);
  mainWindow.webContents.send("message", text);
}

function createWindow() {
  mainWindow = new BrowserWindow({
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
  return mainWindow;
}

autoUpdater.on("update-available", (info) => {
  sendStatusToWindow("Update available.");
});
autoUpdater.on("update-not-available", (info) => {
  sendStatusToWindow("Update not available.");
});
autoUpdater.on("error", (err) => {
  sendStatusToWindow("Error in auto-updater. " + err);
});
autoUpdater.on("download-progress", (progressObj) => {
  let logMessage = "Download speed: " + progressObj.bytesPerSecond;
  logMessage = logMessage + " - Downloaded " + progressObj.percent + "%";
  logMessage = logMessage + " (" + progressObj.transferred + "/" + progressObj.total + ")";
  sendStatusToWindow(logMessage);
});
autoUpdater.on("update-downloaded", (info) => {
  sendStatusToWindow("Update downloaded.");
});

app.on("ready", () => {
  createWindow();
});

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

app.on("ready", () => {
  autoUpdater.checkForUpdatesAndNotify();
});

module.exports = app;
