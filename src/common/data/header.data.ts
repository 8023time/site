/**
 * @description: 主导航配置
 * @version: 1.0.0
 */
export const MAIN_NAV_CONFIG: {
  name: string;
  href?: string;
  logo?: string | HTMLElement;
}[] = [
  { name: '首页', href: '/' },
  { name: '技能', href: '/skill' },
  { name: '数据', href: '/test' },
  // { name: "网站合集", href: "/site" },
  // { name: "网站分析", href: "/statistics" },
];
