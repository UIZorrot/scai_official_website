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
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-100 border border-gray-300 hover:border-gray-400 text-gray-900 hover:bg-gray-200 transition-all duration-300"
      >
        <span className="text-lg">{languages.find(lang => lang.code === language)?.flag}</span>
        <span className="text-sm font-medium">{getLanguageDisplayName()}</span>
        <motion.svg
          className="w-4 h-4 transition-transform group-hover:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          initial={{ rotate: 0 }}
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.3 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

      {/* Enhanced Dropdown Menu */}
      <motion.div
        className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
        initial={{ opacity: 0, y: -10 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {languages.map((lang, index) => (
          <motion.button
            key={lang.code}
            whileHover={{
              backgroundColor: 'rgba(79, 70, 229, 0.1)',
              x: 5
            }}
            whileTap={{ scale: 0.95 }}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-all duration-200 ${index === 0 ? 'rounded-t-xl' : ''
              } ${index === languages.length - 1 ? 'rounded-b-xl' : ''
              } ${language === lang.code
                ? 'text-[#4F46E5] bg-[#4F46E5]/10 border-l-2 border-[#4F46E5]'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            onClick={() => setLanguage(lang.code)}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="font-medium">{lang.name}</span>
            {language === lang.code && (
              <motion.svg
                className="w-4 h-4 ml-auto text-[#4F46E5]"
                fill="currentColor"
                viewBox="0 0 20 20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </motion.svg>
            )}
          </motion.button>
        ))}
      </motion.div>
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
