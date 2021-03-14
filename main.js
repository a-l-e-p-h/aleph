const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const loadSketches = require("./utils/loadSketches");

let editorWindow, displayWindow;

async function createWindow() {
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

app.whenReady().then(async () => {
  const sketches = loadSketches();
  await createWindow();
  await createDisplayWindow();

  editorWindow.webContents.send("sketch-list", sketches);
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

async function createDisplayWindow() {
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
