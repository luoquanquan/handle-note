# 笔记项目

## 初始化写作环境

- clone 本项目 `git clone https://github.com/luoquanquan/handle-note.git`
- `cd handle-note`
- 注册并更新(下载)子模块
  - `git submodule init`
  - `git submodule update`
- enjoy

## 常用命令

- `npm run build` 创建静态资源
- `npm run clean` 清除之前生成的网站数据
- `npm run deploy` 把当前生成的静态资源部署到远端
- `npm run server` 本地启动静态服务, 适合编写边预览
- `npm run release` 根据最新的 blog 生成静态资源站 & 并将其部署到 github

