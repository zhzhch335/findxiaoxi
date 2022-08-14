const { app, BrowserWindow, Menu, Tray, dialog, ipcMain, clipboard } = require('electron')
const path = require("path")

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "寻找小希",
    webPreferences: {
      preload: path.join(__dirname,"preload.js")
    }
  })

  win.loadFile('./html/index.html')
  win.openDevTools()

  win.webContents.addListener("did-navigate-in-page", (e, url) => {
    var level = Number(url.split("#")[1]);
    switch (level) {
      case 5:
        let timeoutId = null;
        const blur5seconds = () => {
          timeoutId = setTimeout(() => {
            win.webContents.send("success", "ok");
            win.webContents.off("blur",blur5seconds);
            timeoutId = null;
          },5000)
        }
        win.webContents.on("blur",blur5seconds);
        win.webContents.on("focus", () => {
          if (timeoutId) clearTimeout(timeoutId);
        })
        break;
      case 6:
        ipcMain.handle("getClipBoard",() => clipboard.readText())
        break;
      case 7:
        
        break;
    }
  })

  // 阻止窗口关闭
  // win.on('close', (event) => {
  //   console.log("错了错了！")
  //   event.preventDefault();
  // });
}

let tray = null
app.whenReady().then(() => {

  createWindow()

  tray = new Tray('./xiaoxi/0.png')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  tray.setToolTip('小希，找到你了！')
  tray.setContextMenu(contextMenu)


  // 菜单栏模板
  const menuBar = [
    {
      label: '这是啥',
      submenu: [
        { label: '这是啥'},
        
        { label: '退出' }
      ]
    },
    {
      label: '我是谁',
      submenu: [
        { label: '访问官网' },
        { label: '关于' }
      ]
    }
  ];

  // 构建菜单项
  const menu = Menu.buildFromTemplate(menuBar);
  // 设置一个顶部菜单栏
  Menu.setApplicationMenu(menu);


})