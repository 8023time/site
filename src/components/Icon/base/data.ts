/**
 * @description: 图标组件属性
 * @version: 1.0.0
 */
export type IconProps = {
  /**
   * @description: 图标名称，可以是字符串或 导入的 svg，png 等静态资源
   * @default: ''
   * @version: 1.0.0
   */
  icon: string | React.ReactNode;
  /**
   * @description: 图标资源的描述，当 icon 为静态资源时，该属性可用于设置 alt 标签
   * @default: ''
   * @version: 1.0.0
   */
  alt?: string;
  /**
   * @description: 图标大小，单位为像素
   * @default: 24
   * @version: 1.0.0
   */
  size?: number;
  /**
   * @description: 是否为圆角
   * @default: false
   * @version: 1.0.0
   */
  round?: boolean;
  /**
   * @description：自定义样式
   * @default: ''
   * @version: 1.0.0
   */
  className?: string;
  /**
   * @description: 图标颜色
   * @default: ''
   * @version: 1.0.0
   */
  color?: string;
};

/**
 * @description: 默认图标组件属性
 * @version: 1.0.0
 */
export const defaultIconProps: IconProps = {
  icon: '',
  alt: '',
  size: 35,
  round: true,
  className: '',
  color: '',
};

/**
 * @description: 图标包装器属性（用于 createIcon 等二次封装，排除 icon）
 * @version: 1.0.0
 */
export type IconWrapperProps = Omit<IconProps, 'icon'>;
