import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";

// 确保这里的路径是正确的，并且文件已存在
import rehypeTailwindInjector from "./rehype-tailwind-injector.js";

// 定义输出目录
const outDir = path.resolve("src/generated");
fs.mkdirSync(outDir, { recursive: true });

// 将 rehypeReactOptions 转换为字符串，以便在 TSX 文件中作为代码使用
// 注意：这里需要确保对象中的值（如 'React.createElement'）不被 JSON.stringify 加上引号，
// 但在 Node.js 中，最简单的做法是直接使用对象字面量字符串，或者像这样定义后手动引用。
// 由于 rehypeReact 接受一个对象作为参数，我们直接使用它即可。

// --------------------------------------------------------
// 2. 补充完整的 generateTSX 函数 (修改 unified 管道)
// --------------------------------------------------------
async function generateTSX(filePath: string, outPath: string) {
  try {
    // 读取 markdown 文件内容
    const fileContent = fs.readFileSync(filePath, "utf8");
    // const { data, content } = matter(fileContent);
    const { content } = matter(fileContent);

    // 使用 unified 处理器链
    const result = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype) // MDAST -> HAST
      .use(rehypeTailwindInjector) // HAST (注入 Tailwind)
      // 🚨 关键修改: 使用 rehype-stringify 将 HAST 树转换为 HTML 字符串
      .use(rehypeStringify) // HAST -> HTML 字符串
      .process(content);

    // result.value 现在是 HTML 字符串
    // 确保将其转换为字符串类型，虽然 process() 返回的 value 字段通常是 VFile 的内容（可以是 string 或 Buffer），
    // 经过 stringify 插件后，它几乎肯定是 string。
    const htmlString = String(result.value); // 确保是字符串

    // --------------------------------------------------------
    // 3. 封装为完整的 TSX 组件 (使用 dangerouslySetInnerHTML)
    // --------------------------------------------------------
    const tsxContent = `
// THIS IS AN AUTO-GENERATED FILE. DO NOT EDIT.
// Generated from: ${filePath}

import React from 'react';

// 核心渲染组件
const MarkdownComponent: React.FC = () => {
  // 渲染 Markdown 内容，使用 dangerouslySetInnerHTML
  return (
    <div 
      className="markdown-content-wrapper" 
      dangerouslySetInnerHTML={{ __html: ${JSON.stringify(htmlString)} }}
    />
  );
};

export default MarkdownComponent;
`;

    // 4. 写入 TSX 文件
    fs.writeFileSync(outPath, tsxContent, "utf8");
    console.log(`✅ Generated: ${outPath}`);
  } catch (error) {
    console.error(`❌ Failed to process file: ${filePath}`, error);
    // 确保抛出异常以触发上层 ELIFECYCLE 错误
    throw error;
  }
}

// --------------------------------------------------------
// 3. 补充完整的 processMarkdownFiles (保持不变)
// --------------------------------------------------------
async function processMarkdownFiles(inputDir: string, outputDir: string) {
  try {
    const files = fs.readdirSync(inputDir);
    for (const file of files) {
      if (file.endsWith(".md")) {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, file.replace(".md", ".tsx"));
        await generateTSX(inputPath, outputPath);
      }
    }
  } catch (error) {
    console.error("Error processing Markdown files:", error);
  }
}

// 示例调用 (假设您的项目结构)
export const generateMarkdown = () => processMarkdownFiles("source/post", outDir);
