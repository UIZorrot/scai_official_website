import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 保留英文的特定词汇列表
const ENGLISH_WORDS = ['sai', 'sacich', 'saibox', 'scai', 'scaich', 'scibox'];

// 检查是否应该保留英文
export function shouldKeepEnglish(word: string) {
  return ENGLISH_WORDS.includes(word.toLowerCase());
}
