import { h } from 'hastscript';
import type { Root } from 'hast';
import { visit } from 'unist-util-visit';
import { cn } from '@utils/className.ts';
import { tailwindMap } from '@styles/markdown-styles.ts';

/**
 * Rehype 插件：注入 Tailwind 样式（支持 main/dark，<pre> 特殊处理）。
 */
export default function rehypeTailwindInjector() {
  return (tree: Root) => {
    visit(tree, 'element', (node, index, parent) => {
      const tagName = node.tagName;
      const styleConfig = tailwindMap[tagName as keyof typeof tailwindMap];
      if (!styleConfig) return;

      // ======== 特殊处理 <pre> ========
      if (tagName === 'pre' && typeof styleConfig === 'object' && 'wrapper' in styleConfig) {
        const { wrapper, main, traffic } = styleConfig;

        const wrapperNode = h('div', { className: cn(wrapper) });

        // 添加 macOS 交通灯
        if (traffic) {
          const trafficLights = h('div', { className: cn(traffic.bar) }, [
            h('button', { className: cn(traffic.light, traffic.red) }),
            h('button', { className: cn(traffic.light, traffic.yellow) }),
            h('button', { className: cn(traffic.light, traffic.green) }),
          ]);
          wrapperNode.children.push(trafficLights);
        }

        // 应用 pre 主体样式
        if (!node.properties) node.properties = {};
        node.properties.className = cn(main, node.properties.className || '');

        // 替换节点
        wrapperNode.children.push(node);
        if (parent && typeof index === 'number') {
          parent.children[index] = wrapperNode;
        }
        return;
      }

      // ======== 特殊处理 <code> ========
      if (tagName === 'code' && typeof styleConfig === 'object' && 'main' in styleConfig && 'dark' in styleConfig) {
        const { main, dark } = styleConfig;

        // 判断是否为内联 code：如果父节点是 pre，则跳过
        const isInsidePre = parent && 'tagName' in parent ? parent.tagName === 'pre' : false;
        if (isInsidePre) return; // 不处理代码块内的 <code>

        if (!node.properties) node.properties = {};
        node.properties.className = cn(main || '', dark || '', node.properties.className || '');

        return;
      }

      // 通用：只处理 main + dark
      const { main, dark } = styleConfig as { main?: string; dark?: string };

      if (!node.properties) node.properties = {};
      node.properties.className = cn(main, dark, node.properties.className || '');
    });
  };
}
