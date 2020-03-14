---
title: interview-6
date: 2020-03-14 16:50:31
categories:
  - 前端
tags:
  - interview
---

> React 以前不知道的那些小点点~

## React 事件对象处理

猜猜看以下代码执行的逻辑
```js
handleClick(e) {
    // 事件对象 e 是经过处理的一个实例
    console.log(e)

    // 事件对象所属的类
    console.log(e.__proto__.constructor)

    // e.target 当前触发事件的元素
    // e.currentTarget 绑定事件的元素
    console.log('e.target', e.target)
    console.log('e.currentTarget', e.currentTarget)

    // 原生事件对象
    const {nativeEvent} = e
    console.log('nativeEvent.target', nativeEvent.target)
    console.log('nativeEvent.currentTarget', nativeEvent.currentTarget)
}
```

<!-- more -->

执行的结果如下:
![2020-03-14-18-00-56](http://handle-note-img.niubishanshan.top/2020-03-14-18-00-56.png)

综上分析:
- 事件对象是 `React` 基于原生的事件对象做的一层封装, 模拟了 DOM 事件的所有能力
- 可以通过 `e.nativeEvent` 获取到原生事件对象
- `React` 包装的事件对象 e 利用事件委托将所有的事件都绑定到了 `document` 上

事件对比相关的代码在[这里](https://github.com/luoquanquan/learn-fe/commit/2d89119625f27afde906c2a2da49d19565f449a1)

## 事件处理函数的 this 指定问题

修改事件处理函数如下:
```js
handleClick() {
    console.log(this)
}
```

此后, 每次点击点击按钮打印的内容并没有按照预想的方式执行. 而是
```log
undefined
```

出现这个的原因, 就要看下[这篇文章](https://juejin.im/post/5c50168fe51d452d7b70e4cb)了

那么下来我们来解决这个问题
- 使用箭头函数(babel 需添加 `transform-class-properties` 插件)[参考代码](https://github.com/luoquanquan/learn-fe/commit/5d971e08b45d0c781dc552410e03f9e9e4ac752c)
- 注册事件处理器时绑定函数[参考代码](https://github.com/luoquanquan/learn-fe/commit/c2009919dc6eaa0cd092956d1e3bd586586e9fc0)
- 组件构造函数中绑定函数[参考代码](https://github.com/luoquanquan/learn-fe/commit/539eb19fd7f51225f1544961b8aa2765ad3cea02)

## setState 参数值的类型为不可变值

### 参数值类型为直接类型

数字/字符串/布尔值/null/undefined 直接给需要修改的状态赋一个新的值即可...

ex:
```js
this.setState({
    name: 'quanquan'
})
```

### 参数值类型为引用类型

#### 数组类型值

#### 新增元素

- 使用数组的 `concat` 方法
- 使用 es6 `...` 运算符解构原素组

#### 截取部分元素

使用 slice 方法

#### 过滤部分元素

使用 filter 方法

#### PS

不要使用会改写原数组的方法, 如: push/pop/shift/unshift/splice...

#### 对象类型值

- 使用 Object.assign
- 使用 es6 `...` 运算符解构原对象

## 生命周期函数

### 组件挂载阶段

- `constructor` es6 特有的~
- `componentWillMount` 挂载 DOM 前调用, 此时调用 `setState` 不会触发组件的重新渲染
- `render` 构建 vNode, 必须是纯函数
- `componentDidMount` 组件完全挂载到 DOM 后触发, 一般用于发起 ajax...

### 组件更新阶段

> 组件更新触发时机: 1. 父组件触发 render 2. 组件自身 setState

- `componentWillReceiveProps(nextProps)`
  - 只有父组件 `render` 时触发, 组件内调用 `setState`
  - `nextProps` 的值可能和 `this.props` 的值是一样的
  - 在这个方法中执行 `setState` 只有在 `render` 之后获取的 `this.state` 才是最新的 `state`, `render` 之前获取的 `this.state` 仍然为更新前的 `state`
- `shouldComponentUpdate(nextProps, nextState)` 决定了是否继续执行更新的过程, 如果该方法返回 `false` 后续的生命周期函数将不再触发
- `componentWillUpdate(nextProps, nextState)`
- `render`
- `componentDidUpdate(prevProps, prevState)` 两个参数对应的是组件更新前的  props 和 state

#### PS

shouldComponentUpdate 和 componentWillUpdate 中都不能调用 setState, 否则会引起循环调用问题, render永远无法被调用, 组件也无法正常渲染

### 卸载阶段

`componentWillUnmount` 主要进行组件的清理工作

eg:
- 未完结定时器清除
- 未完成 ajax 取消

组件生命周期函数[示例代码](https://github.com/luoquanquan/learn-fe/commit/97d6111b6a2886c55143181dd08e364f1b017bbb)

## 非受控组件

原则上优先使用受控组件, 但是有些情况下只能使用非受控组件
- 手动操作 DOM
- 文件上传
- video/audio/canvas 标签
- 富文本编辑器

## Portals

> React 组件默认是按照组件的层级渲染的, 但是有些业务场景下需要将一些控件(例: 全局弹窗)需要挂载到父组件之外.

```js
renderPop() {
    console.log('renderPop')
    return ReactDOM.createPortal(<Child />, document.body)
}
```

使用 `Portals` 可以实现将 `React` 组件直接挂载到原生 `node` 节点上

### 使用场景

- 父组件定义了 `overflow: hidden;` 但是想要子组件脱离父组件
- 父组件 `z-index` 太小, 子元素无法展示
- `fixed` 元素需要在 `body` 的第一层

ps: 定位方式为 `position: fixed;` 的元素, 直接作为 `body` 的一级子元素兼容性更好(UC 浏览器)

Portals [参考代码](https://github.com/luoquanquan/learn-fe/commit/cbcb122fe038451821487fc59fae8c141c797dde)

## 使用 context 实现数据跨层级传递

[参考代码](https://github.com/luoquanquan/learn-fe/commit/b5fa3d06d345322d2a38176ad31272521d4620c2)

## this.setState 同步 || 异步

```js
class App extends React.Component {
    constructor() {
        super()
        this.state = { count: 0 }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState(({count}) => ({count: count + 1}))
        console.log(this.state.count)
        this.setState(({count}) => ({count: count + 1}))
        console.log(this.state.count)

        setTimeout(() => {
            this.setState(({count}) => ({count: count + 1}))
            console.log(this.state.count)
            this.setState(({count}) => ({count: count + 1}))
            console.log(this.state.count)
        }, 1e3);
    }

    componentDidMount() {
        this.btn2.addEventListener('click', this.handleClick)
    }


    render() {
        const {count} = this.state
        return (
            <div className="app">
                <button onClick={this.handleClick}>click Me</button>
                <button ref={ref => {this.btn2 = ref}}>click Me2</button>
                {count}
            </div>
        )
    }
}
```

如上代码, 刷新后直接点击第一个按钮控制台打印的结果为:
```log
0
0
3
4
```

如果点击第二个按钮, 打印的结果为
```log
1
2
3
4
```

综上可以得出
- 当 `setState` 正常使用时(在 react hook 函数 or 事件处理函数中直接使用时) 其为异步
- 当 `setState` 在 `setTimeout` or `DOM` 事件中使用时为同步

ps: 异步与否与其在哪个函数中执行没有关系, 只与触发该函数执行的入口相关(是否触发 batchUpdate 机制)

此问题[参考代码](https://github.com/luoquanquan/learn-fe/commit/e9b865b00b55c80e5abf83a134e9bd43f95d3df0)

## 执行 setState 时, 值可能会被合并

```js
handleClick() {
    this.setState({count: this.state.count + 1})
    console.log(this.state.count)
    this.setState({count: this.state.count + 1})
    console.log(this.state.count)
    this.setState({count: this.state.count + 1})
    console.log(this.state.count)
    this.setState({count: this.state.count + 1})
    console.log(this.state.count)
    this.setState(({count}) => ({count: count + 1}))
    console.log(this.state.count)
    this.setState(({count}) => ({count: count + 1}))
    console.log(this.state.count)
}
```

如上所示的代码, 在事件处理函数中共执行 6 次 `this.setState` 首先根据上文可知, 所有的 console.log 均为 0.
其次, 在 render 中拿到的实际 count 的值为 3, 得出上边四次 `this.setState({})` 写法的只有一次生效了. 原因是在同一次 batchUpdate 内对象字面量写法的 state 进行了合并(基于 `Object.assign`). 然而使用回调函数式写法的就不存在相关的问题. 所以涉及到类似逻辑时候要使用回调函数产出新的 state 的写法

[示例代码](https://github.com/luoquanquan/learn-fe/commit/910ced4bcb7c37ac8f1019adee5791d5a1d5d3e6)

## 参考文档

- [Portals](https://reactjs.org/docs/portals.html)
- [React的batchUpdate一点见解](https://zhuanlan.zhihu.com/p/30690734)







