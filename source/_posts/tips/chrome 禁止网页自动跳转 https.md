---
title: chrome 禁止网页自动跳转 https.md
date: 2020-02-05 00:10:31
categories:
  - Tips
tags:
  - 浏览器
---

- 在地址栏输入 [chrome://net-internals/#hsts](chrome://net-internals/#hsts) 并回车
- 在打开的页面中 `Delete domain security policies` 栏目下的输入框输入你要禁止跳转 https 的域名
- 点击 `Delete`
- 然后在 `Query HSTS/PKP domain` 栏目下的输入框在次输入你刚刚输入的域名
- 点击 `Query`
- 如果返回的是 `Not found` 说明禁用成功, 你可以用 `http` 方式访问网站了
