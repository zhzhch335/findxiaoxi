# 这是啥
这是一个寻找小希的小游戏
# 用啥写的
用Electron框架，它是一个用JS来开发跨平台应用的框架，你可以理解为网页加个壳，但是它可以调用很多系统API
# 怎么用
## 自己运行
首先确定本机安装了nodejs，然后克隆本项目

安装依赖
```bash
npm i
```

运行程序
```bash
npm start
```
## ~~或者直接下载我打包好的程序（还没传）~~

# 如何打包
```bash
npm i electron-packager -g //全局安装electron-packager
electron-packager . [程序名] --win --out [输出目录] --app-version=1.0.0  --icon=[图标地址] --verbose --overwrite --win32metadata.CompanyName=[公司名称]
```
## 提问：打包后是一大堆文件里一个exe，有没有办法只打出来一个exe
答：没有 查了半天没查到 我后来用了压缩软件的自解压打包，自解压到临时文件夹里，然后解压成功后打开这个exe文件