/**
 * @description 按钮类型
 * @version 1.0.0
 */
export type ButtonVariant = 'solid' | 'outlined' | 'filled' | 'text' | 'link';

/**
 * @description 按钮颜色
 * @version 1.0.0
 */
export type ButtonColor = 'primary' | 'danger' | 'warning' | 'info';

/**
 * @description 按钮尺寸
 */
export type ButtonSize = 'small' | 'medium' | 'large';

/**
 * @description 按钮
 * @version 1.0.0
 */
export interface ButtonProps {
  /**
   * @description: 按钮类型
   * @default "solid"
   * @version: 1.0.0
   */
  variant?: ButtonVariant;
  /**
   * @description: 按钮颜色
   * @default "primary"
   * @version: 1.0.0
   */
  color?: ButtonColor;
  /**
   * @description: 按钮尺寸
   * @default "medium"
   * @version: 1.0.0
   */
  size?: ButtonSize;
  /**
   * @description: 点击事件
   * @default: () => {}
   * @version: 1.0.0
   */
  onClick?: () => void;
  /**
   * @description: 自定义类名
   * @default: ""
   * @version: 1.0.0
   */
  className?: string;
  /**
   * @description: 子元素
   * @default: ""
   * @version: 1.0.0
   */
  children: React.ReactNode;
}

/**
 * @description: 按钮组件默认属性
 * @version: 1.0.0
 */
export const defaultButtonProps: ButtonProps = {
  variant: 'solid',
  color: 'info',
  size: 'medium',
  onClick: () => {},
  className: '',
  children: '',
};
