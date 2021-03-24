---
title: XSS
date: 2020-02-15 00:16:30
categories:
  - 网络安全
tags:
  - 网络安全
---

## 全称

```bash
Cross Site Script
```

## 中文名称

跨站脚本

## 常见危害

盗取用户信息, 钓鱼, 制造蠕虫...

## 概念

黑客通过 "html 注入" 篡改网页, **插入恶意脚本**. 当用户浏览网页时, 实现控制用户浏览器行为的一种攻击方式.

<!-- more -->

![2020-02-15-00-22-12](http://handle-note-img.niubishanshan.top/2020-02-15-00-22-12.png)

## 分类

### 存储型

访问网站, 触发 XSS

![2020-02-15-00-26-48](http://handle-note-img.niubishanshan.top/2020-02-15-00-26-48.png)

黑客入侵流程
![2020-02-15-00-27-32](http://handle-note-img.niubishanshan.top/2020-02-15-00-27-32.png)

### 反射型

访问携带 XSS 脚本的链接触发 XSS, XSS 代码存在于 search 串中. 后端直接返回了
![2020-02-15-00-30-09](http://handle-note-img.niubishanshan.top/2020-02-15-00-30-09.png)

代码实现
![2020-02-15-00-29-26](http://handle-note-img.niubishanshan.top/2020-02-15-00-29-26.png)

### DOM 型

访问携带 XSS 脚本的链接触发 XSS, XSS 代码存在于 hash 中
![2020-02-15-00-33-25](http://handle-note-img.niubishanshan.top/2020-02-15-00-33-25.png)

代码实现
![2020-02-15-00-32-16](http://handle-note-img.niubishanshan.top/2020-02-15-00-32-16.png)

![2020-02-15-00-33-04](http://handle-note-img.niubishanshan.top/2020-02-15-00-33-04.png)

## 总结

![2020-02-15-00-41-29](http://handle-note-img.niubishanshan.top/2020-02-15-00-41-29.png)
