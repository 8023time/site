import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeShiki from "@shikijs/rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import rehypeTailwindInjector from "./rehype-tailwind-injector.js";

const outDir = path.resolve("src/generated");
const inputDir = path.resolve("source/post");
fs.mkdirSync(outDir, { recursive: true });

// --------------------------------------------------------
// 1. 补充完整的 generateTSX 函数 (修改 unified 管道)
// --------------------------------------------------------
async function generateTSX(filePath: string, outPath: string) {
  try {
    // 读取 markdown 文件内容
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { content } = matter(fileContent);

    // 使用 unified 处理器链
    const result = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype) // MDAST -> HAST
      .use(rehypeShiki, {
        inline: false,
        themes: {
          light: "synthwave-84",
          dark: "synthwave-84",
        },
      })
      .use(rehypeTailwindInjector) // HAST (注入 Tailwind)
      .use(rehypeStringify) // HAST -> HTML 字符串
      .process(content); // 处理 MD 内容

    // result.value 现在是 HTML 字符串
    // 确保将其转换为字符串类型，虽然 process() 返回的 value 字段通常是 VFile 的内容（可以是 string 或 Buffer），
    // 经过 stringify 插件后，它几乎肯定是 string。
    const htmlString = String(result.value); // 确保是字符串

    const tsxContent = `
/**
 * @description: 这是一个自动生成的文件,请不要轻易修改它.
 * @source: ${filePath}
 * @script: scripts/md-to-tsx
 */

import React from 'react';

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
    throw error;
  }
}

// --------------------------------------------------------
// 2. 补充完整的 processMarkdownFiles (保持不变)
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

// --------------------------------------------------------
// 3. 导出 processMarkdownFiles 函数
// --------------------------------------------------------
export const generateMarkdown = function () {
  return processMarkdownFiles(inputDir, outDir);
};
