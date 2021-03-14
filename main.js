const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const loadSketches = require("./utils/loadSketches");

let editorWindow, displayWindow;

function createWindow() {
  editorWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const startURL = isDev
    ? "http://localhost:8080"
    : `file://${path.join(__dirname, "build/index.html")}`;

  editorWindow.loadURL(startURL);
}

app.whenReady().then(() => {
  const sketches = loadSketches();
  createWindow();
  // createDisplayWindow();

  setTimeout(() => {
    console.log("attempting to send sketches to display window...");
    editorWindow.webContents.send("sketch-list", sketches);
  }, 2000);
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

function createDisplayWindow() {
  displayWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const startURL = isDev
    ? "http://localhost:8080/displayWindow.html"
    : `file://${path.join(__dirname, "build/displayWindow.html")}`;

  displayWindow.loadURL(startURL);
}

ipcMain.on("audio-features", (event, audioFeatures) => {
  if (displayWindow) {
    displayWindow.webContents.send("audio-features", audioFeatures);
  }
});
