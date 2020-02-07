---
title: 美化 next 主题
date: 2020-02-06 21:50:31
categories:
  - Blog
tags:
  - hexo
---

## 自己 fork 一份 next 项目, 作为博客项目的 sub-moudle

### 初始化步骤

- fork 官方的 `https://github.com/theme-next/hexo-theme-next` 并更名为 `quanquan-hexo-theme-next`
- 清空 `themes` 目录下的所有主题文件
- 执行 `git submodule add https://github.com/luoquanquan/quanquan-hexo-theme-next.git themes/next` 将 `fork` 来的 next 主题项目作为 `submodule` 添加到博客项目下
- 此时执行 `hexo s` 就可以看到 next 主题的页面啦

### 将主题项目作为子模块的目的

直接 clone 三方的主题, 可以默认直接用, 但是如果想要基于其进行配置就 gg 了, 之前文章中提到过原生的 next 并不是很好看. 我们要修改主题的配置, 注定要修改主题项目的代码, 但是对于三方的主题项目肯定没有提交的权限, 所以只能 fork 一份自己维护. 可以保存自己的配置实现跨多端的文档编写.

### 其他终端导入相同配置的主题文件

使用 git clone 是不会克隆 submodule 的, 克隆主的博客项目后还需要执行
- git submodule init 初始化本地配置文件
- git submodule update 从该项目中抓取所有数据并检出父项目中列出的合适的提交

也可在 clone 使用 git clone --recursive 命令, git 就会自动初始化并更新仓库中的每一个子模块

### 获取主题项目的更新

若子分支仓库中有未同步的更新, 可通过 `git submodule update --remote --rebase` 来同步最新的内容. 之后便可以打开编辑器在子模块上工作修改代码了.

主题作者发布了新的主题功能或者修复了 bug, 我们想同步到自己的自定义主题当中. 因为我们的自定义主题是从原主题中 fork 出来的, 可以通过 `git remote add source https://github.com/theme-next/hexo-theme-next` 命令将源主题仓库添加为子模块的 一个新的 source 仓库. 然后运行 `git fetch` 拉取修改后, 便可以通过 `git merge origin/master` 来同步源主题的更新了

## 自定义 next 主题配置

一个 hexo 博客项目中存在两个 `_config.yml` 配置文件, 项目更目录的 `_config.yml` 文件称为 **站点配置文件**, 主题根目录下的 `_config.yml` 文件称为 **主题配置文件**

### 菜单设置

> 菜单包括: home tags categories archives about schedule sitemap commonweal

默认 next 开启的菜单只有 home 和 archives 两个, 若要打开更多的菜单, 打开 **主题配置文件** 找到 `# Menu Settings`

```yml
menu:
  home: / || home
  tags: /tags/ || tags
  categories: /categories/ || th
  archives: /archives/ || archive
  about: /about/ || user
  #schedule: /schedule/ || calendar
  #sitemap: /sitemap.xml || sitemap
  #commonweal: /404/ || heartbeat
```

按照如上的方式修改即可.

解释`home: / || home` 其中 `||`左边的 `/` 表示的是当前 menu 对应的路径, 右边的 home 表示的是 icon, 这个的制作和修改参考[fontawesome](https://fontawesome.com/icons)

### next 主题的样式设置

next 主题提供了四种样式, 总体来说大同小异, 修改的方式是在 **主题配置文件** 中找到`# Scheme Settings`

```yml
# Schemes
# scheme: Muse
#scheme: Mist
# scheme: Pisces
scheme: Gemini
```

### 侧边栏调整

```yml
sidebar:
# Sidebar Position - 侧栏位置（只对Pisces | Gemini两种风格有效）
  position: left        //靠左放置
  #position: right      //靠右放置

# Sidebar Display - 侧栏显示时机（只对Muse | Mist两种风格有效）
  #display: post        //默认行为，在文章页面（拥有目录列表）时显示
  display: always       //在所有页面中都显示
  #display: hide        //在所有页面中都隐藏（可以手动展开）
  #display: remove      //完全移除

  offset: 12            //文章间距（只对Pisces | Gemini两种风格有效）

  b2t: false            //返回顶部按钮（只对Pisces | Gemini两种风格有效）

  scrollpercent: true   //返回顶部按钮的百分比
```

### 设置博客头像

在 **主题配置文件** 中找到 `# Sidebar Avatar` 字段

```yml
avatar:
  # Replace the default image and set the url here.
  url: /images/avatar.jpeg
```

url 对应的就是头像的路径, 只要把图片放到主题项目下的 `source/images` 目录下, hexo 就能默认就能找到

### 添加分类模块

- 新建一个页面 `hexo new page categories`, 会在 `source` 目录下创建 `categorcies/index.md` 该文件内标注了文件 `title` 为 `categorcies`, 将其修改为 `分类`
- 打开 **主题配置文件** 找到 `menu` 删除 `categories: /categories/ || th` 前的注释
- 在文章顶部的文章头信息区域添加 `categories` 并设置为要将文章设置的分类名, `hexo` 就会自动把文章划分到指定的分类中

### 添加标签模块

- 新建一个页面 `hexo new page tags`, 会在 `source` 目录下创建 `tags/index.md` 该文件内标注了文件 `title` 为 `tags`, 将其修改为 `标签`
- 打开 **主题配置文件** 找到 `menu` 删除 `tags: /tags/ || tags` 前的注释
- 在文章顶部的文章头信息区域添加 `tags` 并设置为要将文章设置的分类名, `hexo` 就会自动把文章划分到指定的分类中

eg:

```markdown
---
title: 美化 next 主题
date: 2020-02-06 21:50:31
categories:
  - Blog
tags:
  - hexo
---

## 自己 fork 一份 next 项目, 作为博客项目的 sub-moudle

```

`hexo` 会自动创建 `Blog` 分类和 `hexo` 标签, 并为当前的文章添加两个属性

### 添加关于模块

- 新建一个页面 `hexo new page about`, 会在 `source` 目录下创建 `about/index.md` 该文件就是你写简历的地方啦~
- 打开 **主题配置文件** 找到 `menu` 删除 `about: /about/ || user` 前的注释

### 添加搜索功能

- 安装 [hexo-generator-searchdb](https://www.npmjs.com/package/hexo-generator-searchdb) 插件 `npm i hexo-generator-searchdb`
- 在 **站点配置文件** 的最下方添加
```yml
# 搜索
search:
  path: search.xml
  field: post
  format: html
  limit: 10000
```
- 在 **主题配置文件** 中找到 `Local search`, 将 `enable` 设置为 `true`

## 参考资料

- [Hexo的Next主题详细配置](https://www.jianshu.com/p/3a05351a37dc)
- [在 hexo 中使用 git submodules 管理主题](https://juejin.im/post/5c2e22fcf265da615d72c596)
- [Git 工具 - 子模块](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97)


