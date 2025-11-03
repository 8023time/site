import fs from "fs";
import path from "path";
// 用来解析 markdown 文旦中的顶部元素以及主题元素
import matter from "gray-matter";
// 用来将 markdown 转换为 JSX
import { compile } from "@mdx-js/mdx";

const outDir = path.resolve("src/generated");
fs.mkdirSync(outDir, { recursive: true });

// 解析 markdown 文件并生成 TSX 文件
async function generateTSX(filePath, outPath) {
  try {
    // 读取 markdown 文件内容
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    // 编译 markdown 内容为 JSX
    const jsx = await compile(content, { jsx: true });

    // 生成指定得 TSX 文件内容
    const tsxContent = jsx.toString();

    // 写入 TSX 文件
    fs.writeFileSync(outPath, tsxContent, "utf8");
    console.log(`✅ Generated: ${outPath}`);
  } catch (error) {
    console.error(`❌ Failed to read file: ${filePath}`, error);
  }
}

// 批量处理 Markdown 文件
async function processMarkdownFiles(inputDir, outputDir) {
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

// 示例调用
processMarkdownFiles("source/post", outDir);
