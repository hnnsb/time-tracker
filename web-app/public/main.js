const { BrowserWindow, app } = require("electron");
const { join } = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {},
    icon: "icon.ico",
    autoHideMenuBar: true,
  });

  app.isPackaged
    ? win.loadFile(join(__dirname, "../build/index.html"))
    : win.loadURL("http://localhost:3000");
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
