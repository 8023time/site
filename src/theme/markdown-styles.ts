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
    `,
  },

  h2: {
    main: `
      text-4xl md:text-5xl font-sans font-bold tracking-tight
      text-gray-800 mt-12 mb-6 pb-2 border-b border-gray-200/40
      scroll-mt-24 selection:bg-gray-200/50
    `,
    dark: `
    `,
  },

  h3: {
    main: `
      text-3xl md:text-4xl font-sans font-semibold tracking-tight
      text-gray-800 mt-10 mb-4 scroll-mt-24
    `,
    dark: `
    `,
  },

  h4: {
    main: `
      text-2xl font-sans font-medium text-gray-700 mt-8 mb-3
      border-l-4 border-gray-300 pl-3
    `,
    dark: `
    `,
  },

  h5: {
    main: `
      text-xl font-sans font-medium text-gray-600 mt-6 mb-2 uppercase tracking-wide
    `,
    dark: `
    `,
  },

  h6: {
    main: `
      text-lg font-sans font-semibold text-gray-500 mt-4 mb-2 uppercase tracking-wider
    `,
    dark: `
    `,
  },

  // ===== 基本文本 =====
  p: {
    main: `
      text-lg md:text-xl font-sans leading-[1.65] tracking-[0.01em]
      text-gray-700 mb-5 selection:bg-gray-200/50
    `,
    dark: `
    `,
  },

  strong: {
    main: `font-semibold text-gray-900`,
    dark: ` `,
  },

  em: {
    main: `italic text-gray-700`,
    dark: ` `,
  },

  del: {
    main: `line-through text-gray-500`,
    dark: ` `,
  },

  hr: {
    main: `my-10 border-t border-gray-200/60 rounded-full`,
    dark: ` `,
  },

  sup: {
    main: `align-super text-sm text-gray-600`,
    dark: ` `,
  },

  sub: {
    main: `align-sub text-sm text-gray-600`,
    dark: ` `,
  },

  kbd: {
    main: `
      px-2 py-1 bg-gray-100 text-gray-800 rounded-md font-mono text-sm
      border border-gray-300 shadow-sm
    `,
    dark: `
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
    `,
  },

  // ===== 列表 =====
  ul: {
    main: `
      list-disc list-outside pl-6 my-5 space-y-2
      marker:text-gray-500
    `,
    dark: `
    `,
  },

  ol: {
    main: `
      list-decimal list-outside pl-6 my-5 space-y-2
      marker:text-gray-500
    `,
    dark: `
    `,
  },

  li: {
    main: `
      text-lg text-gray-700 leading-relaxed
    `,
    dark: `
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
    
    `,
  },

  code: {
    main: `
    `,
    dark: `
    `,
  },

  pre: {
    wrapper: `
    relative rounded-3xl shadow-xl ring-1 ring-gray-200 border border-gray-300
    overflow-hidden my-6 p-4 pt-10
    dark:ring-gray-800 dark:border-gray-700
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
    `,
  },

  figure: {
    main: `my-8 flex flex-col items-center`,
  },

  figcaption: {
    main: `text-sm text-gray-500 mt-2 italic`,
    dark: ` `,
  },

  // ===== 表格 =====
  table: {
    main: `
      w-full border-collapse my-8 text-left text-base
      rounded-2xl overflow-hidden shadow-md ring-1 ring-gray-200
    `,
    dark: `
    `,
  },

  thead: {
    main: `
      bg-gray-100 text-gray-900 font-semibold
    `,
    dark: `
    `,
  },

  tbody: {
    main: `divide-y divide-gray-200`,
    dark: ` `,
  },

  tr: {
    main: `hover:bg-gray-50 transition-colors duration-150`,
    dark: ` `,
  },

  th: {
    main: `px-4 py-3 font-medium text-gray-900 border-b border-gray-200`,
    dark: ` `,
  },

  td: {
    main: `px-4 py-3 text-gray-700 border-b border-gray-200`,
    dark: ` `,
  },

  // ===== 折叠块 =====
  details: {
    main: `
      bg-gray-50 dark:bg-gray-900 rounded-2xl p-4 my-6 shadow-sm
      ring-1 ring-gray-200 dark:ring-gray-700
      transition-all duration-300 open:shadow-md
    `,
  },

  summary: {
    main: `
      font-semibold cursor-pointer text-gray-800 hover:text-black
      dark:text-gray-200 dark:hover:text-white
    `,
  },
};

export { tailwindMap };
