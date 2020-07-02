---
title: position fixed 失效
date: 2020-05-20 17:10:31
categories:
  - 前端
tags:
  - CSS
---

## position: fixed; 作为 transform 元素子元素

> 这是一个十年前就有人问过的问题 [stackoverflow](https://stackoverflow.com/questions/2637058/positions-fixed-doesnt-work-when-using-webkit-transform)当你的 position: fixed; 的元素包裹在使用了 transform 属性的元素的时候, fixed 定位就会失效, 不能固定定位了.

## 参考文章

- [那些遇到的position-fixed无效事件](https://xinpure.com/position-fixed-encountered-an-invalid-event/)
- [https://drafts.csswg.org/css-transforms-1/#containing-block-for-all-descendants](https://drafts.csswg.org/css-transforms-1/#containing-block-for-all-descendants)
