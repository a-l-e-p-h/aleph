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

ipcMain.on("p5-sketch-changed", (event, sketchUpdate) => {
  if (displayWindow) {
    displayWindow.webContents.send("p5-sketch-changed", sketchUpdate);
  }
});

ipcMain.on("request-sketches", async () => {
  const p5Sketches = await loadSketches("p5");
  const threeSketches = await loadSketches("three");
  sendToWindow(displayWindow, "sketch-list", { p5: p5Sketches, three: threeSketches });
  sendToWindow(
    editorWindow,
    "sketch-list",
    {
      p5: p5Sketches.map((path) => stripFilePath(path)),
      three: threeSketches.map((path) => stripFilePath(path))
    }

  );
});

ipcMain.on("request-three-sketches", async () => {
  const sketches = await loadSketches("three");
  sendToWindow(displayWindow, "three-sketch-list", sketches);
})

ipcMain.on("mix-blend-mode-updated", (event, layer) => {
  sendToWindow(displayWindow, "mix-blend-mode-updated", layer);
});

ipcMain.on("layer-opacity-updated", (event, layer) => {
  sendToWindow(displayWindow, "layer-opacity-updated", layer);
});

ipcMain.on("layer-muted", (_, layer) => {
  sendToWindow(displayWindow, "layer-muted", layer);
});

ipcMain.on("layer-soloed", (_, layers) => {
  sendToWindow(displayWindow, "layer-soloed", layers);
});
