import React from 'react';
import type { ReactNode } from 'react';

/**
 * @description: Tooltip组件位置类型定义
 * @version: 1.0.0
 */
export type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

/**
 * @description: Tooltip组件props类型定义
 * @version: 1.0.0
 */
export interface TooltipProps {
  /**
   * @description: 提示内容
   * @default: ""
   * @version: 1.0.0
   */
  children: React.ReactElement;
  /**
   * @description: 显示内容
   * @default: ""
   * @version: 1.0.0
   */
  content?: ReactNode | string;
  /**
   * @description: 位置
   * @default: "top"
   * @version: 1.0.0
   */
  placement?: Placement;
  /**
   * @description: 进入延时(ms)
   * @default: 100
   * @version: 1.0.0
   */
  enterDelay?: number;
  /**
   * @description: 离开延时(ms)
   * @default: 100
   * @version: 1.0.0
   */
  leaveDelay?: number;
  /**
   * @description: className
   * @default: ""
   * @version: 1.0.0
   */
  className?: string;
  /**
   * @description: 是否显示箭头
   * @default: true
   * @version: 1.0.0
   */
  arrow?: boolean;
}

/**
 * @description: 默认props
 * @version: 1.0.0
 */
export const defaultTooltipProps = {
  content: '',
  placement: 'top',
  enterDelay: 100,
  leaveDelay: 300,
  className: '',
  arrow: true,
} satisfies Partial<Omit<TooltipProps, 'children'>>;
