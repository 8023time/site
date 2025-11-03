console.log("脚本开始执行...");
import { generateMarkdown } from "./compile-markdown.ts";
console.log("导入成功...");

async function main() {
  await generateMarkdown();
  console.log("✨ All Markdown files processed successfully.");
}

// 立即执行主函数并捕获任何顶层异常
main().catch(error => {
  // 捕获异步操作中的所有错误，包括您之前遇到的非标准错误对象
  console.error("❌ 致命错误：Markdown 转换失败！");
  console.error("详细错误信息:", error);
  // 确保以失败状态退出进程
  process.exit(1);
});
