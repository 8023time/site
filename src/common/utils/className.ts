import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 智能合并 className
 * - clsx: 处理条件类 { 'active': isActive }
 * - twMerge: 自动删除冲突的 Tailwind 类（如 bg-red-500 和 bg-blue-500）
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
