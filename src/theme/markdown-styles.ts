/**
 * @type {Record<string, string>}
 * Markdown 标签到 Tailwind CSS 类名的映射表（仿 baiwumm.com 风格优化版）。
 * 灵感：干净、优雅的博客设计，浅色方案、macOS 代码块、交通灯装饰、蓝调强调、充足留白。
 * 特征：优化代码块（pre）样式（增强交通灯细节、调整背景对比、添加代码高亮支持、优化圆角和阴影）、浅灰代码块、蓝链接、简约排版、macOS 窗口质感、暗模式兼容。blockquote 保持全宽优化。
 */
const tailwindMap = {
  // 一级标题：大号字体、蓝调渐变、优雅间距
  h1: `
    text-5xl md:text-6xl font-sans font-extrabold tracking-[-0.025em]
    bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400
    dark:from-blue-300 dark:to-blue-100
    pb-3 mt-12 mb-8
    border-b border-gray-200/30 dark:border-gray-700/30
    shadow-md shadow-gray-200/30 dark:shadow-gray-900/50
    scroll-mt-24
    transition-all duration-300 hover:scale-[1.005] hover:shadow-lg
    selection:bg-blue-200/40 dark:selection:bg-blue-600/40
  `,

  // 二级标题：蓝调强调、简约边框
  h2: `
    text-4xl font-sans font-bold tracking-[-0.018em]
    text-blue-600 dark:text-blue-300
    mt-10 mb-6 pb-2
    border-b border-gray-200/20 dark:border-gray-700/20
    scroll-mt-24
    selection:bg-blue-200/40 dark:selection:bg-blue-600/40
  `,

  // 三级标题：中等大小、灰调
  h3: `
    text-3xl font-sans font-semibold tracking-[-0.012em]
    text-gray-800 dark:text-gray-100
    mt-8 mb-4
    scroll-mt-24
  `,

  // 四级标题：小写大写、灰色
  h4: `
    text-xl font-sans font-medium tracking-[0.04em] uppercase
    text-gray-500 dark:text-gray-400
    mt-6 mb-2
  `,

  // 段落文本：舒适阅读、蓝调选择
  p: `
    text-lg md:text-xl font-sans leading-[1.55] tracking-[0.01em]
    text-gray-700 dark:text-gray-300
    mb-4
    selection:bg-blue-200/50 dark:selection:bg-blue-600/50
  `,

  // 链接：苹果蓝 (#007AFF)、hover 下划线
  a: `
    text-blue-600 dark:text-blue-400 font-sans font-medium
    hover:underline hover:text-blue-700 dark:hover:text-blue-300
    underline-offset-4 decoration-blue-600/50 dark:decoration-blue-400/50
    focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:rounded-sm
    active:scale-[0.99] active:shadow-inner
    transition-all duration-200 ease-out
  `,

  // 无序列表：蓝调标记、紧凑间距
  ul: `
    list-disc pl-6 mb-5 space-y-1.5
    text-gray-700 dark:text-gray-300 font-sans text-lg
    marker:text-blue-500/70 dark:marker:text-blue-400/70
  `,

  // 有序列表：蓝调数字、紧凑间距
  ol: `
    list-decimal pl-6 mb-5 space-y-1.5
    text-gray-700 dark:text-gray-300 font-sans text-lg
    marker:text-blue-500/70 dark:marker:text-blue-400/70
  `,

  // 列表项：优化嵌套
  li: `
    leading-[1.55] [&>ul]:mt-1.5 [&>ol]:mt-1.5
  `,

  // 引用块：保持全宽优化，text-justify 均匀分布减少右空白
  blockquote: `
    w-full max-w-none
    border-l-4 border-blue-500/70 dark:border-blue-400/70
    bg-gray-100/50 dark:bg-gray-900/50
    pl-5 pr-5 py-3 my-6 rounded-3xl
    text-gray-700 dark:text-gray-300 font-sans italic text-xl text-justify
    shadow-lg ring-1 ring-gray-200/60 dark:ring-black/40
    relative
    before:content-['“'] before:absolute before:-left-1 before:top-1 before:text-6xl before:text-blue-500/30 dark:before:text-blue-400/30
    break-normal whitespace-normal overflow-wrap-normal hyphens-none
    [&_p]:max-w-none [&_p]:w-full
  `,

  // 行内代码：浅灰背景、玫瑰红文本
  code: `
    bg-gray-100/80 dark:bg-gray-800/90
    text-rose-600 dark:text-rose-400
    px-2 py-0.5 rounded-md font-mono text-base
    border border-gray-200/60 dark:border-gray-700/60
    shadow-sm shadow-gray-200/40 dark:shadow-gray-800/30
    backdrop-blur-md
  `,

  // 多行代码块：优化样式（增强 macOS 质感：调整交通灯大小/位置/阴影，浅灰背景更高对比，添加内阴影，优化圆角和 overflow）
  pre: `
    bg-gray-100 dark:bg-gray-950 // 浅灰默认，暗模式深灰
    text-gray-900 dark:text-gray-100 font-mono text-base leading-[1.6]
    rounded-3xl p-6 pt-10 my-6 // 增大内边距，提升呼吸感
    shadow-2xl ring-1 ring-gray-300/50 dark:ring-black/50 border border-gray-300 dark:border-gray-700 // 柔和边框
    overflow-x-auto relative
    backdrop-blur-lg // 增强玻璃质感
    [&>code]:block [&>code]:w-full // 确保内部 code 全宽
    shadow-inner shadow-gray-200/50 dark:shadow-gray-800/50 // 添加内阴影，提升深度
    
    // macOS 交通灯：优化细节（稍小圆点，添加微阴影，hover 效果更平滑）
    before:content-[''] before:absolute before:top-4 before:left-4 before:flex before:items-center before:gap-2
    before:w-[4rem] before:h-3
    before:[&>span]:block before:[&>span]:w-2.5 before:[&>span]:h-2.5 before:[&>span]:rounded-full before:[&>span]:shadow-sm before:[&>span]:shadow-gray-400/30 dark:before:[&>span]:shadow-gray-600/30
    before:[&>span]:transition-all before:[&>span]:duration-200 before:[&>span]:ease-in-out before:[&>span]:hover:scale-110 before:[&>span]:hover:shadow-md before:[&>span]:cursor-default
    before:[&>span:nth-child(1)]:bg-[#FF5F56] // 红
    before:[&>span:nth-child(2)]:bg-[#FFBD2E] // 黄
    before:[&>span:nth-child(3)]:bg-[#27C93F] // 绿
  `,

  // 表格：浅灰条纹、居中
  table: `
    w-full border-collapse my-6 text-base md:text-lg font-sans
    rounded-3xl overflow-hidden
    shadow-lg ring-1 ring-gray-200/40 dark:ring-gray-700/40
  `,

  thead: `
    bg-gray-200/90 dark:bg-gray-800/90
    text-gray-900 dark:text-gray-100 font-semibold
  `,

  tr: `
    odd:bg-white dark:odd:bg-gray-900/95
    even:bg-gray-50/80 dark:even:bg-gray-800/60
    hover:bg-gray-100/90 dark:hover:bg-gray-700/70
    transition-colors duration-200 ease-out
  `,

  th: `
    text-center px-3 py-2 border-b border-gray-300/70 dark:border-gray-700/70
    font-semibold
  `,

  td: `
    text-center px-3 py-2 border-b border-gray-200/60 dark:border-gray-800/60
    text-gray-700 dark:text-gray-300
  `,

  // 图片：圆角阴影、hover 缩放
  img: `
    rounded-3xl shadow-2xl my-8 w-full object-contain
    ring-1 ring-gray-200/40 dark:ring-gray-700/40
    mx-auto block
    transition-transform duration-300 hover:scale-[1.015]
    hover:shadow-[0_10px_20px_-5px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_10px_20px_-5px_rgba(0,0,0,0.5)]
  `,

  // 分割线：薄灰线 (#E5E5EA)、渐变淡出
  hr: `
    border-none my-10 w-3/4 mx-auto h-px
    bg-gradient-to-r from-transparent via-gray-300/70 to-transparent
    dark:bg-gradient-to-r dark:from-transparent dark:via-gray-600/70 dark:to-transparent
  `,

  // 任务清单：蓝调复选、交互
  input: `
    accent-blue-500 dark:accent-blue-400
    w-6 h-6 rounded-full mr-2 align-middle
    focus:ring-2 focus:ring-blue-500/60 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900
    cursor-pointer
    transition-transform duration-150 hover:scale-[1.1]
  `,
};

export { tailwindMap };
