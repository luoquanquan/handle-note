---
title: 基础使用 hooks
date: 2020-03-16 14:20:31
categories:
  - 前端
tags:
  - React
  - hook
---

## 解决的问题

- React Hooks 解决了组件之间复用状态逻辑困难, 可能要使用到 HOC or Render Props 这样的特性改变了组件的层级, 而 Hooks 可以在无需修改组件结构的情况下复用状态逻辑
- 对于复杂的组件进行解耦, Hooks 将组件中相互关联的部分拆分成更小的函数
- 妈妈再也不用担心我找不准 this 了, 因为没有 this 了

## 注意事项

- 只能在函数最外层调用 hook, 不能在循环 / 条件判断 / 或者其他子函数中调用
- 只能在 React 函数组件中调用, 不能在其他 js 函数中调用

## useState

### 每次渲染都是一个独立的闭包

- 每次渲染都有它自己的 props 和 state
- 每次渲染都有自己的事件处理函数
- 事件处理函数能获取的是触发时的状态
- 组件每次渲染都会被调用, 每次调用中状态值都是一个常量. 并且赋予了当前渲染中的状态值
- 单次渲染周期内, props 和 state 的值不变

### 惰性初始 state

- initState 的值只有在初始渲染时生效, 后续渲染的过程中会忽略该值
- 如果初始的 state 需要经过复杂的函数计算获得, 则可以传入一个函数, 在函数中计算并返回初始的 state. 此函数只有在初次渲染时执行
- 和 class 组件的 setState 不同, useState 返回的状态设置函数不会自动合并更新的对象, 需要使用 setState 接收回调函数的方式并利用展开运算符打到合并并更新状态的效果.

### state 比对

调用 state hook 的设置函数时, 如果传入的 state 的值和当前的 state 值相等, React 会跳过组件的渲染以及 Effect 的执行(状态的对比使用了 Object.is)

## useMemo

- 把创建函数和依赖项数组作为参数传递一个 useMemo, 仅仅会在某个依赖项改变时候才会重新计算 memoized 的值, 这样可以避免每次渲染都进行有开销的计算工作

## useCallback

- 把内联函数以及其依赖项数组作为参数传递给 useCallback, 能够获取一个 memoized 版本的回调函数, 该回调函数仅仅会在某个依赖项改变的时候才会更新

## useReducer

- useState 是 useReducer 的语法糖, 他接收一个 (state, action) => newState  的 reducer, 并返回当前的 state 和一个与其配套的 dispatch 方法
- 面对 state 逻辑较复杂且包含多个子值, 或者下一个 state 依赖之前的 state 的情况时, useReducer 更加适用

## useContext

- 接收一个 context 对象, 并返回该 context 对象的当前值
- 当前 context 的值由上层组件中距离当前组件最近的 context.Provider 的 value props 决定
- 当前组件最近的 context.Provider 的 value props 决定改变时会触发组件的重新渲染
- useContext 相当于 class 组件中的 static contextType 或者函数组件中的 MyContext.Consumer

## useEffect

- 函数组件都是纯函数, 所以在函数组件内部不能进行诸如操作 DOM, 添加订阅, 启动定时器等有副作用的操作...
- 使用 useEffect 完成副作用操作, 传递给 useEffect 的回调函数会在组件完全渲染到屏幕之后执行, 为函数式组件提供了副作用的能力

## useRef

## useMemo useCallback useRef

- useMemo useCallback useRef 本质上都是为了缓存
- 在以前的类组件中, 类组件就是一个实例, 实例一旦创建其属性就得以保持
- hook 只能使用在函数组件里, 但是函数组件不会创建实例. 当然就没有办法在挂载各种属性,因此就要依靠 useMemo useCallback useRef
