import { useContext } from 'react';
import { LanguageContext } from '@/App';
import type { Language } from '@/App';

/**
 * 语言切换自定义 Hook
 * 提供便捷的语言切换功能和翻译方法
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageContext.Provider');
  }
  
  const { language, toggleLanguage, setLanguage, isEnglishWord, t } = context;
  
  // 检查是否为中文
  const isChinese = language === 'zh';
  
  // 检查是否为英文
  const isEnglish = language === 'en';
  
  // 切换到指定语言
  const switchToEnglish = () => setLanguage('en');
  const switchToChinese = () => setLanguage('zh');
  
  // 获取语言显示名称
  const getLanguageDisplayName = (lang?: Language) => {
    const targetLang = lang || language;
    return targetLang === 'en' ? 'English' : '中文';
  };
  
  // 获取另一种语言的显示名称（用于切换按钮）
  const getToggleLanguageDisplayName = () => {
    return language === 'en' ? '中文' : 'English';
  };
  
  return {
    // 当前语言状态
    language,
    isChinese,
    isEnglish,
    
    // 语言切换方法
    toggleLanguage,
    setLanguage,
    switchToEnglish,
    switchToChinese,
    
    // 翻译相关
    t,
    isEnglishWord,
    
    // 辅助方法
    getLanguageDisplayName,
    getToggleLanguageDisplayName,
  };
}

/**
 * 简化的翻译 Hook
 * 只返回翻译函数，适用于只需要翻译功能的组件
 */
export function useTranslation() {
  const { t } = useLanguage();
  return { t };
}
