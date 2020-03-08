---
title: interview-5
date: 2020-03-08 09:50:31
categories:
  - 前端
tags:
  - interview
---

## 推断以下代码执行的结果

```js
var ary = [1, 2, 3, 4]
function fn(ary) {
    ary[0] = 0
    ary = [0]
    ary[0] = 0
    return ary
}

var res = fn(ary)
console.log(ary)
console.log(res)
```

以上代码执行的流程为
![2020-03-08-10-24-04](http://handle-note-img.niubishanshan.top/2020-03-08-10-24-04.png)

对于引用类型的参数, 函数调用时会按引用传递. 也就是说函数内部可以修改全局同名你变量的实际内容. 尽管是以形参的方式传入的.

## 推断以下代码执行的结果

```js
function fn(i) {
    return function(n) {
        console.log(n + (--i))
    }
}

var f = fn(2)
f(3)
fn(4)(5)
f(8)
```

以上代码执行的流程为
![2020-03-08-10-29-46](http://handle-note-img.niubishanshan.top/2020-03-08-10-29-46.png)

当四则运算符遇到小括号, 小括号里边只有自增 / 自减运算符时. 运算还是会按照预定的方式执行, 并不会限执行小括号里边的自增 / 自减运算符...

例如:
```js
a = 3
2 + (--a) // 4

a = 3
2 + (a--) // 5

a = 3
2 - (--a) // 0

a = 3
2 - (a--) // -1

a = 3
2 * (--a) // 4

a = 3
2 * (a--) // 6

a = 3
6 / (--a) // 3

a = 3
6 / (a--) // 2
```

## 推断以下代码执行的结果

```js
var num = 10  // 60
var obj = {num: 20}
obj.fn = (function(num){
    this.num = num * 3
    num++
    return function(n) {
        this.num += n
        num++
        console.log(num)
    }

})(obj.num)

var fn = obj.fn
fn(5)
obj.fn(10)
console.log(num, obj.num)
```

以上代码执行的流程为
![2020-03-08-10-51-53](http://handle-note-img.niubishanshan.top/2020-03-08-10-51-53.png)

所以, 以上代码执行的结果为 22, 23, 65, 30

## 推断以下代码执行的结果

```js
function Fn() {
    this.x = 100
    this.y = 200
    this.getX = function() {
        console.log(this.x)
    }
}

Fn.prototype = {
    y: 400,
    getX() {
        console.log(this.x)
    },
    getY() {
        console.log(this.y)
    },
    sum() {
        console.log(this.x + this.y)
    }
}

var f1 = new Fn
var f2 = new Fn
console.log(f1.getX === f2.getX)  // false
console.log(f1.getY === f2.getY)  // true
console.log(f1.__proto__.getY === Fn.prototype.getY)  // true
console.log(f1.__proto__.getX === f2.getX)  // false
console.log(f1.getX === Fn.prototype.getX)  // false
console.log(f1.constructor) // Object
console.log(Fn.prototype.constructor)  // Object
f1.getX() // this: f1 f1.x = 100
f1.__proto__.getX() // this: f1.__proto__(Fn.prototype) Fn.prototype.x = undefined
f2.getY() // this: f2 f2.y = 200
Fn.prototype.getY() // this: Fn.prototype Fn.prototype.y = 400
```

上述代码执行的流程为:
![2020-03-08-11-07-03](http://handle-note-img.niubishanshan.top/2020-03-08-11-07-03.png)

最终打印的结果已经在注释中标记出来了~

## 点击按钮弹出指定的 index 问题

示例代码在[这里](https://github.com/luoquanquan/learn-fe/tree/master/basic-js/click-index-btn)

## null vs undefined

默认为 null 的情况:
- 手动设置变量的值或者对象的某一属性值为 null(表示此时没有值, 以后可能会赋值)
- js DOM 元素获取的方法中, 如果没有获取到指定的元素对象. 默认返回 null
- Object.prototype.__proto__ === null
- 正则捕获时, 捕获不到匹配的模式时会返回 null

默认为 undefined 的情况:
- 变量提升, 只声明未定义的变量值就是 undefined
- 严格模式下, 没有指定函数的执行上下文, 其内部的 this 就是 undefined
- 获取对象没有的属性时, 返回 undefined
- 函数定义了形参但是没有传入实参, 默认值 undefined
- 函数没有显式的返回值, 默认返回 undefined

## 怎样解决多人开发的命名冲突问题

- 闭包
- 单例模式
- 模块化编程

## 你理解的闭包的作用是什么, 优缺点

闭包的概念:
当内部函数, 在定义它的作用域的外部被引用时. 就创建了该内部函数的闭包. 如果这个函数引用了定义他的外部函数的变量, 外部函数执行完毕后其定义的变量并不会被回收. 因为闭包需要他们.

闭包是指有权访问另一个函数作用域中的变量的函数, 常见的创建闭包方式. 就是在一个函数内部创建另一个函数

闭包作用:
- 保护, 使用闭包可以保护函数内部的变量不受全局变量的影响, 避免了函数命名冲突带来的问题 ---> 模块模式实现的原理
- 保存, 对于一些组件级的变量不适合放在全局上下文中. 通过闭包不会被回收的特性做到保存内部变量 ---> 三顾茅庐示例

闭包的优点:
- 保护函数内部变量的安全
- 在内存中维持一个变量

闭包的缺点:
闭包的缺点就是占用内存的问题, 因为闭包内容是户常驻内存的. 处理不当 or 大量使用闭包可能是导致爆内存

js 垃圾回收机制:
Javascript中, 如果一个对象不再被引用, 那么这个对象就会被 GC 回收. 如果两个对象互相引用, 而不再被第 3 者所引用, 那么这两个互相引用的对象也会被回收.

## 参考文档

[闭包](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)
[深入学习javaScript闭包(闭包的原理，闭包的作用，闭包与内存管理)](https://www.cnblogs.com/shiyou00/p/10598010.html)
