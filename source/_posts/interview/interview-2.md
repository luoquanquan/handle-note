---
title: interview-2
date: 2020-03-01 13:50:31
categories:
  - 前端
tags:
  - interview
---

## [] == [] 输出的结果是？为什么

返回 false

原因:
- 字符串与数字之间的比较: 字符串 -> 数字
- 其他类型与布尔值之间的比较: 布尔值先转成数字在比较
- null 和 undefined 比较: 两者相等
- 对象和非对象(非布尔值)之间的比较: 对象先调用 ToPrimitive 方法

问题中, 由于 [] == [] 双等号边都是 [], 属于对象类型, 所以直接比较其值, 不进行隐式类型转换. 且两者都是引用类型, 比价其引用地址位置. 故不相等

然而, [] == ![] => true 套用以上的公式就可以得出了

<!-- more -->

## 请说出三种减少网页加载时间的方法

- 尽量减少页面中重复http请求数量
- 服务器开启gzip压缩
- css样式的定义放置在文件的头部
- JavaScript脚本放置在文件末尾
- 压缩合并JavaScript.css代码
- 使用多域名负载网页内的多个文件.图片
- 合理利用缓存

## CSS 中 box-sizing 有哪些值?区别是什么

box-sizing 定义了用户应该如何计算盒子的宽度和高度, 属性值有两个
- content-box (默认值), 其中设置的 width 和 height 只包含内容的宽度和高度, 但是不包含内边距(padding) 边框(border) 和 外边距(margin)
- border-box 设置的 width 和 height 包含了内容的宽度和高度, 同时包含了内边距(padding) 边框(border), 不包含外边距(margin)
- inherit 规定应从父元素继承 box-sizing 属性的值

## DOM Tree 与 Render Tree 之间的区别是什么

DOM Tree: 包含了所有的 HTML 标签, 包括 display: none 的元素, JS动态添加的元素等.
Render Tree: DOM Tree 和样式结构体结合后构建呈现 Render Tree. Render Tree 能识别样式, 每个 node 都有自己的style, 且不包含隐藏的节点(比如 display: none 的节点)

## 在Javascript中什么情况下会进行装箱/拆箱转换

装箱: 把基本数据类型转化为引用数据类型的操作
拆箱: 把引用数据类型转化为基本数据类型的操作, 通过 toString, valueOf 方法实现
在 Javascript 中出现基本数据类型数据和引用数据类型数据要进行转换的情况下会进行装箱/拆箱操作

## 参考文档

[你不知道的JavaScript（中卷）](https://book.douban.com/subject/26854244/)
