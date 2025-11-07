/**
 * @description: 打字机组件
 * @version: 1.0.0
 */
export interface TypewriterProps {
  /**
   * @description: 文字列表
   * @default: []
   * @version: 1.0.0
   */
  texts: string[];
  /**
   * @description: 全局打字速度（ms/字）
   * @default: 100
   * @version: 1.0.0
   */
  typingSpeed?: number;
  /**
   * @description: 全局删除速度
   * @default: 200
   * @version: 1.0.0
   */
  deleteSpeed?: number;
  /**
   * @description: 每段打完后停留时间
   * @default: 1500
   * @version: 1.0.0
   */
  pauseTime?: number;
  /**
   * @description: 是否循环整个列表
   * @default: true
   * @version: 1.0.0
   */
  loop?: boolean;
  /**
   * @description: 是否显示光标
   * @default: true
   * @version: 1.0.0
   */
  cursor?: boolean;
  /**
   * @description: 光标颜色
   * @default: #fff
   * @version: 1.0.0
   */
  cursorColor?: string;
  /**
   * @description: 自定义样式类名
   * @default: ""
   * @version: 1.0.0
   */
  className?: string;
  /**
   * @description: 文字颜色
   * @default: false
   * @version: 1.0.0
   */
  textColor?: string | 'auto';
  /**
   * @description: 是否需要遮罩层
   * @default: false
   * @version: 1.0.0
   */
  mask?: boolean;
  /**
   * @description: 遮罩层颜色
   * @default: ''
   * @version: 1.0.0
   */
  maskColor?: string;
  /**
   * @description: 文字大小
   * @default: 16
   * @version: 1.0.0
   */
  textSize?: number;
}
