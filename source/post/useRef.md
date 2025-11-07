---
title: useRef
author: 8023time
date: 2025-11-04
---

# useRef

> 当你在React中需要处理DOM元素或需要在组件渲染之间保持持久性数据时，便可以使用useRef。

```javascript
import { useRef } from 'react';

const refContainer = useRef(initialValue);
```

## 摘自

1. [小满 - useRef ](https://message163.github.io/react-docs/react/hooks/useRef.html#%E9%80%9A%E8%BF%87ref%E6%93%8D%E4%BD%9Cdom%E5%85%83%E7%B4%A0)
2. [React 官方文档 - useRef](https://zh-hans.react.dev/reference/react/useRef)

## 特点

- 持久性：ref 对象在组件的整个生命周期中保持不变，React 不会在每次渲染时创建新的 ref 对象。
- 可变性：ref.current 是可变的，你可以随意修改它的值，且不会触发重新渲染。
- 初始值：useRef(initialValue) 的 initialValue 只在组件首次挂载时使用，后续重新渲染不会重置 .current。

## 常见使用场景

1. 处理DOM元素
2. 保持持久性数据

### 1. 处理DOM元素

参数

- initialValue：ref 对象的 current 属性的初始值。可以是任意类型的值。这个参数在首次渲染后被忽略。

返回值

- `useRef`返回一个对象，对象的current属性指向传入的初始值。 {current:xxxx}

```typescript
import { useRef } from "react"
function App() {
  //首先，声明一个 初始值 为 null 的 ref 对象
  let div = useRef(null)
  const heandleClick = () => {
    //当 React 创建 DOM 节点并将其渲染到屏幕时，React 将会把 DOM 节点设置为 ref 对象的 current 属性
    console.log(div.current)
  }
  return (
    <>
      {/*然后将 ref 对象作为 ref 属性传递给想要操作的 DOM 节点的 JSX*/}
      <div ref={div}>dom元素</div>
      <button onClick={heandleClick}>获取dom元素</button>
    </>
  )
}
export default App
```

### 2. 存储可变值（不触发渲染）

`useRef` 可以存储任意值（如计数器、定时器 ID、或上一次的状态），这些值在组件生命周期内保持持久化，且修改它们不会触发重新渲染。这与 `useState` 不同，`useState` 的更新会导致组件重新渲染。
示例：记录上一次状态

```typescript
import React, { useState, useRef, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();

  useEffect(() => {
    prevCountRef.current = count; // 每次 count 更新时，记录上一次的 count
  }, [count]);

  return (
    <div>
      <p>当前计数: {count}</p>
      <p>上一次计数: {prevCountRef.current}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  );
}
```

说明：

- `prevCountRef.current` 用于存储上一次的 count 值。
- 修改 `prevCountRef.current` 不会触发重新渲染，因此适合存储不需要更新 UI 的值。
- 在 `useEffect` 中更新 p`revCountRef.current`，确保它总是保存上一次的 count。

### 3. 保存定时器或副作用相关值

`useRef` 常用于保存定时器 ID 或其他副作用相关的值，以确保在组件卸载时正确清理。

```typescript
import React, { useRef, useEffect } from 'react';

function Timer() {
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      console.log('定时器运行中...');
    }, 1000);

    return () => {
      clearInterval(timerRef.current); // 组件卸载时清理定时器
    };
  }, []);

  return <div>检查控制台输出</div>;
}
```

## 对比

| **特性**         | **useRef**                      | **useState**                     |
| ---------------- | ------------------------------- | -------------------------------- |
| **触发重新渲染** | 不会                            | 会                               |
| **数据持久性**   | 在组件生命周期内持久化          | 状态更新后重新渲染，旧值可能丢失 |
| **典型用途**     | 访问 DOM、存储不触发渲染的值    | 管理需要更新 UI 的状态值         |
| **更新方式**     | 直接修改 `ref.current`          | 通过 `setState` 更新             |
| **何时选择**     | 需要持久化数据或操作 DOM 时使用 | 需要更新 UI 时使用               |
