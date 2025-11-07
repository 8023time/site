export type CanvasStrokeStyle = string | CanvasGradient | CanvasPattern;

export interface GridOffset {
  x: number;
  y: number;
}

/**
 * @description: 网格背景组件
 * @version: 1.0.0
 */
export interface Props {
  /**
   * @description: 动画的方向
   * @default: "right"
   * @version: 1.0.0
   */
  direction?: 'diagonal' | 'up' | 'right' | 'down' | 'left';
  /**
   * @description: 动画的速度 (单位: 像素/秒)
   * @default: 1
   * @version: 1.0.0
   */
  speed?: number;
  /**
   * @description: 网格线的颜色
   * @default: "#999"
   * @version: 1.0.0
   */
  borderColor?: CanvasStrokeStyle;
  /**
   * @description: 网格线的大小 (单位: 像素)
   * @default: 40
   * @version: 1.0.0
   */
  squareSize?: number;
  /**
   * @description: 鼠标悬停时网格线的颜色
   * @default: "#222"
   * @version: 1.0.0
   */
  hoverFillColor?: CanvasStrokeStyle;
}
