import { visit } from "unist-util-visit";
import type { Root } from "hast";
import { cn } from "../../src/utils/className.ts";
import { tailwindMap } from "../../src/theme/markdown-styles.ts";

/**
 * Rehype 插件：遍历 HAST 树并注入 Tailwind 类名
 */
export default function rehypeTailwindInjector() {
  return (tree: Root) => {
    visit(tree, "element", node => {
      const tagName = node.tagName;

      // 直接使用导入的 tailwindMap
      if (tailwindMap[tagName as keyof typeof tailwindMap]) {
        const classNames = tailwindMap[tagName as keyof typeof tailwindMap];

        if (!node.properties) {
          node.properties = {};
        }

        // 合并类名，防止覆盖已有的类（例如由其他 rehype 插件添加的）
        const existingClass = node.properties.className || "";
        node.properties.className = cn(classNames, existingClass);
      }
    });
  };
}
