const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  handleSuccess: (callback) => ipcRenderer.on('success', callback),
  removeSuccess: (callback) => ipcRenderer.off('success', callback),
  getClipboard: () => ipcRenderer.invoke('getClipBoard'),
  showTips: (tips) => ipcRenderer.invoke('showTips',tips)
})