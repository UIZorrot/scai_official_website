import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

/**
 * 优化的语言切换组件
 * 展示了如何使用新的语言切换功能
 */
export function LanguageSwitcher() {
  const {
    language,
    isChinese,
    isEnglish,
    toggleLanguage,
    switchToEnglish,
    switchToChinese,
    getLanguageDisplayName,
    getToggleLanguageDisplayName,
    t,
  } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      {/* 主要的切换按钮 */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-4 py-2 rounded-full bg-[#0F172A] border border-[#00F0FF]/50 text-[#00F0FF] hover:bg-[#00F0FF]/10 transition-colors"
        onClick={toggleLanguage}
        title={`Switch to ${getToggleLanguageDisplayName()}`}
      >
        {getToggleLanguageDisplayName()}
      </motion.button>

      {/* 可选：显示当前语言状态的指示器 */}
      <div className="hidden sm:flex items-center gap-1 text-xs text-gray-400">
        <div className={`w-2 h-2 rounded-full ${isChinese ? 'bg-red-500' : 'bg-blue-500'}`} />
        <span>{getLanguageDisplayName()}</span>
      </div>
    </div>
  );
}

/**
 * 下拉式语言选择器
 * 适用于需要更明确语言选择的场景
 */
export function LanguageDropdown() {
  const {
    language,
    setLanguage,
    getLanguageDisplayName,
    t,
  } = useLanguage();

  const languages = [
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
    { code: 'zh' as const, name: '中文', flag: '🇨🇳' },
  ];

  return (
    <div className="relative group">
      <motion.button
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0F172A] border border-[#00F0FF]/30 text-[#00F0FF] hover:border-[#00F0FF]/60 transition-colors"
      >
        <span>{languages.find(lang => lang.code === language)?.flag}</span>
        <span className="text-sm">{getLanguageDisplayName()}</span>
        <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.button>

      {/* 下拉菜单 */}
      <div className="absolute top-full left-0 mt-1 w-full bg-[#0F172A] border border-[#00F0FF]/30 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((lang) => (
          <motion.button
            key={lang.code}
            whileHover={{ backgroundColor: 'rgba(0, 240, 255, 0.1)' }}
            className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors ${
              language === lang.code 
                ? 'text-[#00F0FF] bg-[#00F0FF]/10' 
                : 'text-gray-300 hover:text-[#00F0FF]'
            }`}
            onClick={() => setLanguage(lang.code)}
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
            {language === lang.code && (
              <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

/**
 * 紧凑的语言切换按钮
 * 适用于空间有限的场景
 */
export function CompactLanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="w-8 h-8 rounded-full bg-[#00F0FF]/20 border border-[#00F0FF]/50 text-[#00F0FF] text-xs font-bold hover:bg-[#00F0FF]/30 transition-colors flex items-center justify-center"
      onClick={toggleLanguage}
      title={`Switch to ${language === 'en' ? '中文' : 'English'}`}
    >
      {language === 'en' ? '中' : 'EN'}
    </motion.button>
  );
}

/**
 * 语言状态指示器
 * 仅显示当前语言状态，不提供切换功能
 */
export function LanguageIndicator() {
  const { language, getLanguageDisplayName } = useLanguage();

  return (
    <div className="flex items-center gap-2 text-sm text-gray-400">
      <div className={`w-2 h-2 rounded-full ${language === 'zh' ? 'bg-red-500' : 'bg-blue-500'}`} />
      <span>{getLanguageDisplayName()}</span>
    </div>
  );
}
