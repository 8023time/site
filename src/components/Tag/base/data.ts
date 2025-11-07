import type { ReactNode } from 'react';

/**
 * @description: 标签颜色
 * @version: 1.0.0
 */
export type TagColor = 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray' | 'indigo';

/**
 * @description：标签尺寸
 * @version: 1.0.0
 */
export type TagSize = 'xs' | 'sm' | 'md';

/**
 * @description: 标签props
 * @version: 1.0.0
 */
export interface TagProps {
  /**
   * @description: 标签内容
   * @default: ""
   * @version: 1.0.0
   */
  children?: ReactNode;
  /**
   * @description: 标签颜色
   * @default: "gray"
   * @version: 1.0.0
   */
  color?: TagColor;
  /**
   * @description: 标签尺寸
   * @default: "md"
   * @version: 1.0.0
   */
  size?: TagSize;
  /**
   * @description: 是否可删除
   * @default: false
   * @version: 1.0.0
   */
  removable?: boolean;
  /**
   * @description: 点击删除回调
   * @default: undefined
   * @version: 1.0.0
   */
  onRemove?: () => void;
  /**
   * @description: 点击回调
   * @default: undefined
   * @version: 1.0.0
   */
  onClick?: () => void;
  /**
   * @description: 是否禁用
   * @default: false
   * @version: 1.0.0
   */
  disabled?: boolean;
  /**
   * @description: 自定义类名
   * @default: ""
   * @version: 1.0.0
   */
  className?: string;
  /**
   * @description: 自定义图标
   * @default: undefined
   * @version: 1.0.0
   */
  icon?: ReactNode;
}

/**
 * @description: 标签默认props
 * @version: 1.0.0
 */
export const defaultTagProps: TagProps = {
  children: '',
  color: 'gray',
  size: 'sm',
  removable: false,
  onRemove: undefined,
  onClick: undefined,
  disabled: false,
  className: '',
};
