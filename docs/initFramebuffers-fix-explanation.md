# initFramebuffers() 函数错误修复说明

## 问题描述

在 `initFramebuffers()` 函数中，TypeScript 编译器报告了多个类型错误，主要集中在以下几行：

```typescript
const rgba = ext.formatRGBA; // 错误：'rgba' is of type 'unknown'
const rg = ext.formatRG; // 错误：'rg' is of type 'unknown'
const r = ext.formatR; // 错误：'r' is of type 'unknown'
```

这些错误导致无法访问 `rgba.internalFormat`、`rgba.format` 等属性。

## 错误原因

### 1. 类型声明不正确

在 `getWebGLContext` 函数中，格式对象被声明为 `unknown` 类型：

```typescript
// 错误的类型声明
let formatRGBA: unknown;
let formatRG: unknown;
let formatR: unknown;
```

### 2. TypeScript 类型推断失败

由于类型声明为 `unknown`，TypeScript 无法推断出这些对象具有 `internalFormat` 和 `format` 属性，导致在 `initFramebuffers` 函数中访问这些属性时报错。

## 解决方案

### 修复 1：正确声明类型

将格式对象的类型声明为正确的接口类型：

```typescript
// 正确的类型声明
let formatRGBA: { internalFormat: number; format: number } | null;
let formatRG: { internalFormat: number; format: number } | null;
let formatR: { internalFormat: number; format: number } | null;
```

### 修复 2：添加非空断言

在 `initFramebuffers` 函数中使用非空断言操作符 `!`，告诉 TypeScript 这些值不会为 null：

```typescript
const rgba = ext.formatRGBA!; // 使用非空断言
const rg = ext.formatRG!; // 使用非空断言
const r = ext.formatR!; // 使用非空断言
```

## 为什么会出现这个问题？

1. **WebGL 兼容性处理的复杂性**：代码需要同时支持 WebGL 和 WebGL2，不同版本支持的纹理格式不同，导致类型处理复杂。

2. **TypeScript 严格模式**：在严格模式下，TypeScript 不允许访问 `unknown` 类型的属性，这是为了保证类型安全。

3. **动态格式检测**：`getSupportedFormat` 函数动态检测浏览器支持的纹理格式，可能返回 `null`，增加了类型处理的复杂性。

## 修复后的完整代码

```typescript
// 在 getWebGLContext 函数中
let formatRGBA: { internalFormat: number; format: number } | null;
let formatRG: { internalFormat: number; format: number } | null;
let formatR: { internalFormat: number; format: number } | null;

// 在 initFramebuffers 函数中
function initFramebuffers() {
  const simRes = getResolution(config.SIM_RESOLUTION!);
  const dyeRes = getResolution(config.DYE_RESOLUTION!);

  const texType = ext.halfFloatTexType;
  const rgba = ext.formatRGBA!; // 添加非空断言
  const rg = ext.formatRG!; // 添加非空断言
  const r = ext.formatR!; // 添加非空断言
  const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

  // ... 其余代码保持不变
}
```

## 额外建议

1. **错误处理**：考虑在使用这些格式之前添加运行时检查：

   ```typescript
   if (!ext.formatRGBA || !ext.formatRG || !ext.formatR) {
     throw new Error('Required WebGL texture formats are not supported');
   }
   ```

2. **类型定义优化**：可以创建一个专门的类型定义：

   ```typescript
   interface TextureFormat {
     internalFormat: number;
     format: number;
   }
   ```

3. **文档注释**：为函数添加 JSDoc 注释，说明各参数的含义和可能的值。

这个修复确保了 TypeScript 能够正确识别这些对象的类型，消除了编译错误，同时保持了代码的类型安全性。
