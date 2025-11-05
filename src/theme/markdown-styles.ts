/**
 * @type {Record<string, Record<string, string | string[]>>}
 * Markdown 标签到 Tailwind CSS 类名的映射表（极简黑白风格版）
 */
const tailwindMap = {
  // ===== 标题类 =====
  h1: {
    main: `
      text-5xl md:text-6xl font-sans font-extrabold tracking-tight
      text-gray-900 mt-14 mb-10 pb-4 border-b border-gray-200/60
      scroll-mt-28 selection:bg-gray-200/50
    `,
    dark: `
      text-gray-100 border-b-gray-600/60 selection:bg-gray-700/50
    `,
  },
  h2: {
    main: `
      text-4xl md:text-5xl font-sans font-bold tracking-tight
      text-gray-800 mt-12 mb-6 pb-2 border-b border-gray-200/40
      scroll-mt-24 selection:bg-gray-200/50
    `,
    dark: `
      text-gray-100 border-b-gray-600/40 selection:bg-gray-700/50
    `,
  },
  h3: {
    main: `
      text-3xl md:text-4xl font-sans font-semibold tracking-tight
      text-gray-800 mt-10 mb-4 scroll-mt-24
    `,
    dark: `
      text-gray-100
    `,
  },
  h4: {
    main: `
      text-2xl font-sans font-medium text-gray-700 mt-8 mb-3
      border-l-4 border-gray-300 pl-3
    `,
    dark: `
      text-gray-200 border-l-gray-600
    `,
  },
  h5: {
    main: `
      text-xl font-sans font-medium text-gray-600 mt-6 mb-2 uppercase tracking-wide
    `,
    dark: `
      text-gray-300
    `,
  },
  h6: {
    main: `
      text-lg font-sans font-semibold text-gray-500 mt-4 mb-2 uppercase tracking-wider
    `,
    dark: `
      text-gray-400
    `,
  },
  // ===== 基本文本 =====
  p: {
    main: `
      text-lg md:text-xl font-sans leading-[1.65] tracking-[0.01em]
      text-gray-700 mb-5 selection:bg-gray-200/50
    `,
    dark: `
      text-gray-200 selection:bg-gray-700/50
    `,
  },
  strong: {
    main: `font-semibold text-gray-900`,
    dark: `text-gray-100`,
  },
  em: {
    main: `italic text-gray-700`,
    dark: `text-gray-200`,
  },
  del: {
    main: `line-through text-gray-500`,
    dark: `text-gray-500`,
  },
  hr: {
    main: `my-10 border-t border-gray-200/60 rounded-full`,
    dark: `border-t-gray-600/60`,
  },
  sup: {
    main: `align-super text-sm text-gray-600`,
    dark: `text-gray-400`,
  },
  sub: {
    main: `align-sub text-sm text-gray-600`,
    dark: `text-gray-400`,
  },
  kbd: {
    main: `
      px-2 py-1 bg-gray-100 text-gray-800 rounded-md font-mono text-sm
      border border-gray-300 shadow-sm
    `,
    dark: `
      bg-gray-800 text-gray-200 border-gray-600
    `,
  },
  // ===== 链接 =====
  a: {
    main: `
      text-gray-900 underline-offset-4 decoration-gray-400/60
      hover:underline hover:decoration-gray-600 hover:text-black
      focus:outline-none focus:ring-2 focus:ring-gray-400/50 focus:rounded-sm
      transition-all duration-200 ease-out
    `,
    dark: `
      text-gray-200 decoration-gray-500/60
      hover:decoration-gray-400 hover:text-white
      focus:ring-gray-500/50
    `,
  },
  // ===== 列表 =====
  ul: {
    main: `
      list-disc list-outside pl-6 my-5 space-y-2
      marker:text-gray-500
    `,
    dark: `
      marker:text-gray-400
    `,
  },
  ol: {
    main: `
      list-none pl-8 my-5 space-y-3 [counter-reset:list-counter]
      [&_li]:[counter-increment:list-counter]
      [&_li]:before:content-[counter(list-counter)] [&_li]:before:absolute [&_li]:before:left-[-2rem]
      [&_li]:before:flex [&_li]:before:items-center [&_li]:before:justify-center [&_li]:before:w-6 [&_li]:before:h-6
      [&_li]:before:rounded-full [&_li]:before:bg-gray-200 [&_li]:before:text-gray-700 [&_li]:before:text-sm
      [&_li]:before:font-medium [&_li]:before:shadow-sm
    `,
    dark: `
      [&_li]:before:bg-gray-700 [&_li]:before:text-gray-200
    `,
  },
  li: {
    main: `
      text-lg text-gray-700 leading-relaxed relative
    `,
    dark: `
      text-gray-200
    `,
  },
  // ===== 引用与代码块 =====
  blockquote: {
    main: `
      border-l-4 border-gray-300 bg-gray-50/70
      pl-5 pr-5 py-3 my-6 rounded-2xl italic text-lg text-gray-700
      shadow-inner ring-1 ring-gray-200/40
    `,
    dark: `
      border-l-gray-600 bg-gray-800/70 text-gray-200 ring-gray-600/40
    `,
  },
  code: {
    main: `
      font-mono font-[JetBrainsMono,ui-monospace,Menlo,monospace]
      text-[0.95rem] leading-relaxed
      bg-gray-100 text-gray-800
      px-[0.4em] py-[0.25em] rounded-md
      border border-gray-200 shadow-sm
      tracking-tight
      transition-all duration-200 ease-out
      hover:bg-gray-200/70 hover:border-gray-300
      before:content-[''] after:content-['']
    `,
    dark: `
      bg-gray-800 text-gray-200 border-gray-600
      hover:bg-gray-700/70 hover:border-gray-500
    `,
  },
  pre: {
    wrapper: `
      relative rounded-3xl shadow-xl ring-1 ring-gray-200 border border-gray-300
      overflow-hidden my-6 p-4 pt-10
      dark:ring-gray-700 dark:border-gray-600
      bg-[#262335]
    `,
    main: `
      bg-[#1e1e1e] text-gray-100 font-mono text-[15px] leading-[1.65]
      rounded-2xl p-6 pt-10 overflow-x-auto border-t border-t-[#353942]
      [counter-reset:line]
    `,
    traffic: {
      bar: `absolute top-3 left-4 flex items-center gap-2`,
      light: `w-3.5 h-3.5 rounded-full transition-all duration-200 hover:scale-110`,
      red: `bg-[#FF5F56]`,
      yellow: `bg-[#FFBD2E]`,
      green: `bg-[#27C93F]`,
    },
  },
  // ===== 媒体元素 =====
  img: {
    main: `
      rounded-3xl shadow-lg my-8 w-full object-contain
      ring-1 ring-gray-200 mx-auto block
      transition-transform duration-300 hover:scale-[1.01]
    `,
    dark: `
      ring-gray-600
    `,
  },
  figure: {
    main: `my-8 flex flex-col items-center`,
    dark: ``, // No specific dark mode changes needed
  },
  figcaption: {
    main: `text-sm text-gray-500 mt-2 italic`,
    dark: `text-gray-400`,
  },
  // ===== 表格 =====
  table: {
    main: `
      w-full border-collapse my-8 text-left text-base
      rounded-2xl overflow-hidden shadow-md ring-1 ring-gray-200
    `,
    dark: `
      ring-gray-600
    `,
  },
  thead: {
    main: `
      bg-gray-100 text-gray-900 font-semibold
    `,
    dark: `
      bg-gray-800 text-gray-100
    `,
  },
  tbody: {
    main: `divide-y divide-gray-200`,
    dark: `divide-gray-600`,
  },
  tr: {
    main: `hover:bg-gray-50 transition-colors duration-150`,
    dark: `hover:bg-gray-800/50`,
  },
  th: {
    main: `px-4 py-3 font-medium text-gray-900 border-b border-gray-200`,
    dark: `text-gray-100 border-b-gray-600`,
  },
  td: {
    main: `px-4 py-3 text-gray-700 border-b border-gray-200`,
    dark: `text-gray-200 border-b-gray-600`,
  },
  // ===== 折叠块 =====
  details: {
    main: `
      bg-gray-50 dark:bg-gray-900 rounded-2xl p-4 my-6 shadow-sm
      ring-1 ring-gray-200 dark:ring-gray-600
      transition-all duration-300 open:shadow-md
    `,
    dark: ``, // Already includes dark mode in main
  },
  summary: {
    main: `
      font-semibold cursor-pointer text-gray-800 hover:text-black
      dark:text-gray-200 dark:hover:text-white
    `,
    dark: ``, // Already includes dark mode in main
  },
};

export { tailwindMap };
