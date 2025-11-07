import type { TypewriterProps } from './type';

/**
 * @description: 组件默认配置
 * @version: 1.0.0
 */
export const defaultTypewriterProps: TypewriterProps = {
  texts: [],
  typingSpeed: 100,
  deleteSpeed: 200,
  pauseTime: 1500,
  loop: true,
  cursor: true,
  cursorColor: '#fff',
  className: '',
  textColor: 'black',
  mask: false,
  maskColor: '#fff',
  textSize: 16,
};

/**
 * @description: 渐变颜色数组
 * @version: 1.0.0
 */
export const gradientColors = [
  'rgb(243, 112, 85)',
  'rgb(239, 78, 123)',
  'rgb(161, 102, 171)',
  'rgb(80, 115, 184)',
  'rgb(16, 152, 173)',
  'rgb(7, 179, 155)',
  'rgb(111, 186, 130)',
];
