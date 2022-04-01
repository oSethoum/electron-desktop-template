import { ChromeAction, ChromeState } from "@common/utils";
import { app, BrowserWindow, screen, ipcMain } from "electron";
import { join } from "path";
import { pathToFileURL } from "url";

const isDevelopment = process.env.NODE_ENV === "development";

let win: BrowserWindow;

// @ts-ignore
ipcMain.on("chrome", (event, data) => {
  switch (data) {
    case ChromeAction.Close:
      app.exit();
      return;
    case ChromeAction.Maximize:
      win.maximize();
      break;
    case ChromeAction.Minimize:
      win.minimize();
      break;
    case ChromeAction.Restore:
      win.restore();
      break;
  }

  if (win.isMaximized()) event.reply("chrome", ChromeState.Maximized);
  if (win.isMinimized()) event.reply("chrome", ChromeState.Minimized);
  if (win.isFullScreen()) event.reply("chrome", ChromeState.FullScreen);
  event.reply("chrome", ChromeState.Restored);
});

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().size;
  win = new BrowserWindow({
    minWidth: width * 0.8,
    minHeight: height * 0.8,
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, "preload.js"),
    },
    show: false,
  }).once("ready-to-show", () => {
    win.show();
  });
  if (isDevelopment) {
    win.loadURL("http://localhost:3000");
    //win.webContents.toggleDevTools();
  } else {
    win.loadURL(
      pathToFileURL(join(__dirname, "./renderer/index.html")).toString()
    );
  }
}

app.whenReady().then(createWindow);

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
