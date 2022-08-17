const { app, BrowserWindow, Menu, Tray, dialog, ipcMain, clipboard, shell, globalShortcut } = require('electron')
const path = require("path")

let tray = null;// 设置系统托盘
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "寻找小希",
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    },
    icon: path.join(__dirname, "./xiaoxi/love.png")
  })

  win.loadFile('./html/index.html')

  win.webContents.addListener("did-navigate-in-page", (e, url) => {
    var level = Number(url.split("#")[1]);
    switch (level) {
      case 5:
        let timeoutId = null;
        const blur5seconds = () => {
          timeoutId = setTimeout(() => {
            win.webContents.send("success", "ok");
            win.webContents.off("blur", blur5seconds);
            timeoutId = null;
          }, 5000)
        }
        win.webContents.on("blur", blur5seconds);
        win.webContents.on("focus", () => {
          if (timeoutId) clearTimeout(timeoutId);
        })
        break;
      case 6:
        ipcMain.handle("getClipBoard", () => clipboard.readText())
        break;
      case 7:
        // 菜单栏模板
        const menuBar = [
          {
            label: '这是啥',
            submenu: [
              {
                label: '这是啥', click: () => {
                  dialog.showMessageBoxSync({
                    "title": "寻找小希",
                    "message": "这是一个寻找小希的小游戏，可以跟我一起大喊小希生日快乐吗？",
                    "icon": path.join(__dirname,'./xiaoxi/love.png')
                  })
                }
              },
              { label: '退出', role: 'quit' }
            ]
          },
          {
            label: '我是谁',
            submenu: [
              {
                label: '关于小希', click: () => {
                  shell.openExternal("https://zh.moegirl.org.cn/zh/%E5%B0%8F%E5%B8%8C%E5%B0%8F%E6%A1%83")
                }
              },
              {
                label: '虚拟次元计划官网', click: () => {
                  shell.openExternal("https://www.vdproject.cn/")
                }
              },
              { type: 'separator' },
              {
                label: '该项目开源地址', click: () => {
                  shell.openExternal("https://github.com/zhzhch335/findxiaoxi")
                }
              },
              { type: 'separator' },
              {
                label: '希爹在此！',
                sublabel: '小希，找到你了！',
                icon: path.join(__dirname,'./xiaoxi/alert.jpg'),
                click: () => {
                  win.webContents.send("success", "ok");
                  initMenu();
                }
              }
            ]
          }
        ];

        // 构建菜单项
        const menu = Menu.buildFromTemplate(menuBar);
        // 设置一个顶部菜单栏
        Menu.setApplicationMenu(menu);
        break;
      case 8:
        tray = new Tray(path.join(__dirname, "./xiaoxi/love.png"))
        tray.setToolTip('小希，找到你了！')
        tray.on('click', () => {
          win.webContents.send("success", "ok");
          tray.destroy();
        })
        break;
      case 9:
        win.on('close', (event) => {
          dialog.showMessageBoxSync({
            "title": "错了错了",
            "message": "希爹出现了，不要关闭游戏好不好~",
            icon: path.join(__dirname, "./xiaoxi/love.png")
          })
          win.webContents.send("success", "ok");
          event.preventDefault();
        });
    }
  })

  // 弹出提示
  ipcMain.handle("showTips", (_,tips) => {
    dialog.showMessageBox(win,{
      title: "你是笨蛋吗？",
      message: tips,
      icon: path.join(__dirname,'./xiaoxi/confusion.png')
    })
  })

  globalShortcut.register('Ctrl+I', () => {
    win.openDevTools();
  })
}

app.whenReady().then(() => {

  createWindow()
  initMenu();
})

function initMenu() {
  // 菜单栏模板
  const menuBar = [
    {
      label: '这是啥',
      submenu: [
        {
          label: '这是啥', click: () => {
            dialog.showMessageBoxSync({
              "title": "寻找小希",
              "message": "这是一个寻找小希的小游戏，可以跟我一起大喊“小希生日快乐”吗？",
              "icon": path.join(__dirname,'./xiaoxi/love.png')
            })
          }
        },
        { label: '退出', role: 'quit' }
      ]
    },
    {
      label: '我是谁',
      submenu: [
        {
          label: '关于小希', click: () => {
            shell.openExternal("https://zh.moegirl.org.cn/zh/%E5%B0%8F%E5%B8%8C%E5%B0%8F%E6%A1%83")
          }
        },
        {
          label: '虚拟次元计划官网', click: () => {
            shell.openExternal("https://www.vdproject.cn/")
          }
        },
        { type: 'separator' },
        {
          label: '该项目开源地址', click: () => {
            shell.openExternal("https://github.com/zhzhch335/findxiaoxi")
          }
        }
      ]
    }
  ];

  // 构建菜单项
  const menu = Menu.buildFromTemplate(menuBar);
  // 设置一个顶部菜单栏
  Menu.setApplicationMenu(menu);
}