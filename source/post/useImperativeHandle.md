# useImperativeHandle

React 18 写法

```typescript
import React from "react";
import { useImperativeHandle } from "react";

interface IChild {
  name: string;
}

const Son: React.FC<{ ref?: React.Ref<IChild> }> = React.forwardRef<IChild>((props, ref) => {
  useImperativeHandle(ref, () => {
    return {
      name: "子组件",
    };
  }, []);

  return (
    <>
      <h1>这个是子组件</h1>
    </>
  );
});

const Father: React.FC = () => {
  const childRef = React.useRef<IChild>(null);

  const handleInput = () => {
    console.log(childRef.current);
  };

  return (
    <>
      <h1>这个是父组件</h1>
      <Son ref={childRef} />
      <button onClick={handleInput}>打印数据</button>
    </>
  );
};

export default Father;
```

React 19 写法

> 相较于 React 18 版本，React 19 版本中，把`React.forwardRef` 删除了，里面的 `ref` 直接归入到了props参数中。

```typescript
import React from "react";
import { useImperativeHandle } from "react";

interface IChild {
  name: string;
}

const Son: React.FC<{ ref?: React.Ref<IChild> }> = ({ ref }) => {
  useImperativeHandle(ref, () => {
    return {
      name: "子组件",
    };
  }, []);

  return (
    <>
      <h1>这个是子组件</h1>
    </>
  );
};

const Father: React.FC = () => {
  const childRef = React.useRef<IChild>(null);

  const handleInput = () => {
    console.log(childRef.current);
  };

  return (
    <>
      <h1>这个是父组件</h1>
      <Son ref={childRef} />
      <button onClick={handleInput}>打印数据</button>
    </>
  );
};

export default Father;
```
