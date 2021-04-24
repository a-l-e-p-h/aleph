const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const utilsPath = isDev ? "./utils/nodeUtils" : "./build/utils/nodeUtils";
const { loadSketches, stripFilePath, sendToWindow } = require(utilsPath);

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
    ? "http://localhost:8080/index.html"
    : `file://${path.join(__dirname, "build/index.html")}`;

  console.log(startURL);

  editorWindow.loadURL(startURL);
}

app.whenReady().then(async () => {
  await createWindow();
  await createDisplayWindow();
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
    ? "http://localhost:8080/display/displayWindow.html"
    : `file://${path.join(__dirname, "build/display/displayWindow.html")}`;

  displayWindow.loadURL(startURL);
}

ipcMain.on("audio-features", (event, audioFeatures) => {
  if (displayWindow) {
    displayWindow.webContents.send("audio-features", audioFeatures);
  }
});

ipcMain.on("sketch-changed", (event, sketchUpdate) => {
  if (displayWindow) {
    displayWindow.webContents.send("sketch-changed", sketchUpdate);
  }
});

ipcMain.on("request-sketches", async () => {
  const sketches = await loadSketches();
  sendToWindow(displayWindow, "sketch-list", sketches);
  sendToWindow(
    editorWindow,
    "sketch-list",
    sketches.map((path) => stripFilePath(path))
  );
});

ipcMain.on("mix-blend-mode-updated", (event, blendModeUpdate) => {
  sendToWindow(displayWindow, "mix-blend-mode-updated", blendModeUpdate);
});

ipcMain.on("layer-opacity-updated", (event, opacityUpdate) => {
  sendToWindow(displayWindow, "layer-opacity-updated", opacityUpdate);
});
