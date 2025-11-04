console.log("脚本开始执行...");
import { generateMarkdown } from "./compile-markdown.ts";

async function main() {
  await generateMarkdown();
  console.log("✨ All Markdown files processed successfully.");
}

main().catch(error => {
  console.error("❌ 致命错误：Markdown 转换失败！");
  console.error("详细错误信息:", error);
  process.exit(1);
});
