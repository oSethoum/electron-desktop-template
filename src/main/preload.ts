import { contextBridge, ipcRenderer } from "electron";

console.log("preload");
-contextBridge.exposeInMainWorld("api", {
  send: (channel: string, data: any) => {
    // whitelist channels
    let validChannels = ["chrome"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel: string, func: any) => {
    let validChannels = ["chrome"];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    }
  },
});
