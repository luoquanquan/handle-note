---
title: interview-7
date: 2020-03-14 22:50:31
categories:
  - 前端
tags:
  - interview
---

> React 以前不知道的那些小点点~

## 组件公共逻辑抽离

### 高阶组件

传入一个组件, 返回一个新的组件, 并赋予新的组件公共能力~

```js
import React from 'react';

export default Comp => class withMouse extends React.Component {
    constructor() {
        super()
        this.state = {
            x: 0,
            y: 0
        }
    }

    componentDidMount() {
        window.addEventListener('mousemove', ({x, y}) => {
            this.setState({x, y})
        })
    }

    render() {
        const {x, y} = this.state
        const props = {x, y}
        return <Comp {...props} />
    }
}
```

<!-- more -->

如上代码就是一个最简单的高阶组件实现...

#### 使用场景

- 操纵 props, 高阶组件可以获取到当前组件的 props 并对组件的 props 进行加工处理
- 通过 ref 获取组件实例, 获取子组件以后就能利用 getData 之类的方法实现获取子组件中的数据
- 组件状态提升, 高阶组件可以通过将被包装组件的状态及相应的状态处理方法提升到高阶组件自身内部实现被包装组件的无状态化
- 其他元素包装组件, 在高阶组件渲染WrappedComponent时添加额外的元素, 通常用于为WrappedComponent增加布局或修改样式, 我的标题模板就是这样实现的哟

#### 注意事项

- 了在开发和调试阶段更好地区别包装了不同组件的高阶组件，需要对高阶组件的显示名称做自定义处理
- 如果需要使用被包装组件的静态方法，那么必须手动复制这些静态方法。因为高阶组件返回的新组件不包含被包装组件的静态方法
- refs 不会被传递给被包装组件

#### 与父组件的区别

高阶组件在一些方面和父组件很相似. 例如, 我们完全可以把高阶组件中的逻辑放到一个父组件中去执行, 执行完成的结果再传递给子组件, 但是高阶组件强调的是逻辑的抽象. 高阶组件是一个函数, 函数关注的是逻辑. 而父组件是一个组件, 组件主要关注的是 UI/DOM. 如果逻辑是与DOM直接相关的, 那么这部分逻辑适合放到父组件中实现; 如果逻辑是与DOM不直接相关的, 那么这部分逻辑适合使用高阶组件抽象. 如数据校验 / 请求发送

高阶组件[示例代码](https://github.com/luoquanquan/learn-fe/commit/9c58284a470c4b72f53b76aecd566db24d5f7fbd)

## Render Prop

render prop 是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术

```js
import React from 'react'

class Cat extends React.Component {
    render() {
        const mouse = this.props.mouse;
        return (
            <div style={{ position: 'absolute', left: mouse.x, top: mouse.y }}>
                i'm cat
            </div>
        );
    }
}

class Mouse extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.state = { x: 0, y: 0 };
    }

    handleMouseMove(event) {
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    }

    render() {
        return (
            <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
                {this.props.render(this.state)}
            </div>
        );
    }
}

class MouseTracker extends React.Component {
    render() {
        return (
            <div style={{ height: '100vh', width: '100vw' }}>
                <Mouse render={mouse => (
                    <Cat mouse={mouse} />
                )} />
            </div>
        );
    }
}

export default MouseTracker
```

render prop 最简实现的 [demo](https://github.com/luoquanquan/learn-fe/commit/a183f7bae8ba27eec42bc0543637a093cec29494)

## diff 算法基本原则

- 只比较同一层级, 不能跨层级比较
- tag 不相同, 则直接删除重建. 不再深度比较
- tag 和 key 两者相同, 则认为是相同节点, 不再进行深度比较

## fiber 相关的小知识

### 组件更新的两个阶段

- reconciliation 阶段, 主要工作是针对 vNode 执行 diff 算法. 纯 js 计算
- commit 阶段, 将 diff 计算的结果渲染为真实 DOM

### 出现的问题

- js 是单线程语言, 且和 DOM 渲染公用同一个线程
- 当组件足够复杂, 组件更新时计算和渲染的压力占用的时间都长
- 同时再有别的 DOM 操作需求(动画, 拖拽等) 将会发生卡顿

### fiber 的解决方案

- 将 reconciliation 阶段进行任务拆分(commit 无法拆分)
- DOM 需要渲染是暂停计算, 空闲时恢复计算
- 通过 requestIdleCallback 在浏览器的空闲时段内调用的函数排队
- fiber 对于开发人员来说是没有感知的

## 参考文档

- [Higher-Order Components](https://reactjs.org/docs/higher-order-components.html)
- [Render Props](https://reactjs.org/docs/render-props.html)
- [requestIdleCallback](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback)
