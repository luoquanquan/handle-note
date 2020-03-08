---
title: interview-1
date: 2020-02-28 17:50:31
categories:
  - 前端
tags:
  - interview
---

## 请列举几个HTML5语义化标签，并说说语义化有什么优点

语义化标签:

页面结构:
```log
header
nav
main   只能拥有一个
footer
```

内容划分:
```log
blockquoto
section
article
aside
code
abbr
```

语义化标签的优点:
1. 代码结构清晰, 方便阅读, 有利于团队合作
2. 细粒度内容区域通过标签选择器确定 css 元素, 减少选择器创建
3. 方便其他设备解析(如屏幕阅读器 盲人阅读器 移动设备)
4. 有利于搜索引擎优化(SEO)

<!-- more -->

## 请列举几种除了px外的CSS度量单位并解释其含义

### 相对单位

- px
- em
- rem
- ex
- %

### 绝对单位

- cm
- pt
- in
- pc
- mm

### 具体含义

#### px

像素(Pixel). 是屏幕上显示数据的最基本的点. windows 用户使用的分辨率一般为 96 像素/英寸, mac 用户使用的分辨率一般为 72 像素/英寸

#### em

相对于当前元素内文本的字体尺寸, 如果当前元素内文本尺寸没有人为设置, 则相对于浏览器默认的字体尺寸, 1em === 100% 可以结合 css 的继承关系使用. 具有灵活性

#### rem

相对于根元素(html 元素)内文本的字体尺寸, 如果当前元素内文本尺寸没有人为设置, 则相对于浏览器默认的字体尺寸

#### ex

相对于 "x" 的高度, 此高度通常为字体高度的一半

#### pt

点(Point), 印刷行业常用单位. 等于1/72英寸

1in = 2.54cm = 25.4mm = 72pt = 6pc

#### pc

派卡(Pica), 相当于新四号铅字的尺寸

#### in

英寸(Inch)

#### mm

毫米(Millimeter)

#### cm

厘米(Centimeter)

## 区别

px 是一个点, 不是自然界的长度单位, 可以画的很小也可以画的很大. 如果点很小, 那么画面就清晰, 我们称之为 "分辨率高". 反之, 就是 "分辨率低". 像素点的大小是会变的, 因此被称为相对长度单位.

pt 就是 point, 大小相当于 1/72 英寸. 他是一个符合自然界标准的长度单位, 也称为"绝对长度"

## new 操作符做了什么

```js
function myNew(ctor, ...rest) {
    // 创建空对象
    const obj = new Object()

    // 以新对象为上下文执行构造函数
    ctor.call(obj, ...rest)

    // 绑定原型
    obj.__proto__ = ctor.prototype

    // 返回对象
    return obj
}
```

## 简述cookie/session记住登录状态机制原理

session 是服务端存放会话的大型保险柜
cookie 是下发给客户端的打开保险柜指定抽屉的钥匙

## 网页中接收事件的顺序（事件流）有哪些？它们之间的区别是什么？

- 捕获事件流
- 冒泡事件流
- DOM事件流 模型

捕获: document -> 触发元素
冒泡: 触发元素 -> document

DOM 标准采用捕获 + 冒泡, 两种事件流都会触发 DOM 的所有对象. 从 document 对象开始, 也在 document 对象结束

![2020-02-29-19-36-21](http://handle-note-img.niubishanshan.top/2020-02-29-19-36-21.png)

DOM 标准规定事件流包括三个阶段:
- 事件捕获阶段
- 处于目标阶段
- 事件冒泡阶段

事件捕获阶段: 实际目标 `<div>` 在捕获阶段不会接收事件. 也就是在捕获阶段, 事件从 `document` 到 `<html>` 再到 `<body>` 就停止了
处于目标阶段: 事件在 `<div>` 上发生并处理. 但是事件处理会被看成是冒泡阶段的一部分
冒泡阶段: 事件又传播回文档

## css属性position都有哪些值

- absolute 绝对定位
- relative 相对定位
- field 固定定位
- static 默认值, 没有定位
- inherit 继承父级定位方式
- initial 设置该属性为默认值
- sticky 黏性定位

## 简述你对HTTP控制访问（CORS）的理解

我的理解在[这里](https://juejin.im/post/5c0a55e76fb9a049ef2665ba)

参考文档:
- [javaScript事件（一）事件流](https://www.cnblogs.com/starof/p/4066381.html)
