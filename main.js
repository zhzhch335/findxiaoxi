const { app, BrowserWindow, Menu, Tray } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "寻找小希"
  })

  win.loadFile('./html/index.html')

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
        { label: '打开' },
        { label: '保存' },
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