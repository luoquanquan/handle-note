---
title: interview-3
date: 2020-03-02 21:50:31
categories:
  - 前端
tags:
  - interview
---

## 关于DOMContentLoaded和load事件说法正确的是

DOMContentLoaded事件比load事件更早执行

当纯HTML被完全加载以及解析时, DOMContentLoaded 事件会被触发, 而不必等待样式表, 图片或者子框架完成加载

load 事件仅仅应该在探测到整个页面完全加载完成时被使用. 一个常见的错误就是在该使用 DOMContentLoaded 的地方使用了load

## innerHTML vs innerText vs outerHTML vs outerText

- innerHTML 设置或者获取标签所包含的 HTML 与文本信息, 不含标签本身
- innerText 设置或者获取标签所包含的文本信息, 不含标签本身
- outerHTML 设置或获取标签本身以及所包含的 HTML 与文本信息, 包含本身
- outerText 设置或获取标签本身以及所包含的文本信息, 包含本身

示例:
```html
<div id="div1"><p>this is text</p></div>
<script>
    const div = document.querySelector("div");
    console.log('div.innerHTML', div.innerHTML);
    console.log('div.innerText', div.innerText);
    console.log('div.outerHTML', div.outerHTML);
    console.log('div.outerText', div.outerText);
</script>

<!-- 控制台打印的结果为
div.innerHTML <p>this is text</p>
index.html:5 div.innerText this is text
index.html:6 div.outerHTML <div id="div1"><p>this is text</p></div>
index.html:7 div.outerText this is text
-->
```

## 块级元素 vs 行内元素

### HTML 将标签分为容器级和文本级

#### 容器级

```log
div  h  li dl dd dt ul li
```

#### 文本级

```log
p b a span em i u
```

### CSS 将标签分为块级元素和行内元素

#### 块级元素

```log
div h li p dd dt
```

#### 行内元素

```log
a b span em u i
```

## CSS 权重列表

权重 | 选择器
--- | ---
10000 | !important
1000 | 内联样式
100 | id 选择器
10 | 类 / 伪类 / 属性选择器
1 | 标签 / 伪元素选择器
0 | 通用选择器 * / 子选择器 > / 相邻选择器 + / 同胞选择器 ~

## 伪元素和伪类

总结了一篇文章在[这里](https://note.niubishanshan.top/%E5%89%8D%E7%AB%AF/CSS/%E4%BC%AA%E7%B1%BB%E5%92%8C%E4%BC%AA%E5%85%83%E7%B4%A0/)

## -1 >>> 32 的值为

### 位运算符

`>>` 这个是带符号右移
`>>>` 这个是无符号右移

> 按二进制形式把所有的数字向右移动对应位数, 低位移出(舍弃), 高位的空位补零. 对于正数来说和带符号右移()>>)相同, 但是对于负数来说不同

#### 正数

例: 20 >> 2

- 首先, 把原数转化成二进制. 20 的二进制为: 0001 0100
- 其次, 将二进制数向右移动两位, 高伟补符号位(0). 得到 0000 0101
- 最后, 将二进制转化为十进制数, 0000 0101 转化为十进制为 5 (parseInt('00000101', 2) => 5)
- 所以, 20 >> 2 = 5

#### 负数

例: -20 >> 2

- 首先, 把原数转化成二进制
  - 取反加1 (负数转二进制步骤)
  - 20 的二进制为 0001 0100
  - 取反得到 1110 1011
  - 加1后得到 1110 1100
- 其次, 将二进制向右移动两位. 高位补符号位 1, 得到 1111 1011
- 最后, 将二进制数转化为十进制数
  - 取反 -> 0000 0100
  - 加 1 -> 0000 0101
  - 因为是负数 -> 1000 0101
  - 2 的 2 次方加 2 的 0 次方 -> -5
- 所以, -20 >> 2 = -5

## 参考文档

[按位操作符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Unsigned_right_shift)



