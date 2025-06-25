import { Routes, Route, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Home from "@/pages/Home";
import Paper from "@/pages/Paper";
import Storage from "@/pages/Storage";
import Token from "@/pages/Token";
import Web3 from "@/pages/Web3";
import Community from "@/pages/Community";
import About from "@/pages/About";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { PageErrorBoundary } from "@/components/ErrorBoundary";
import { createContext, useState, useEffect, useCallback, useMemo } from "react";
import { shouldKeepEnglish } from "@/lib/utils";
import { t, clearTranslationCache } from "@/lib/i18n";

// 语言类型定义
export type Language = "en" | "zh";

// 获取初始语言设置
const getInitialLanguage = (): Language => {
  try {
    // 1. 优先从 localStorage 获取
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && ["en", "zh"].includes(savedLanguage)) {
      return savedLanguage;
    }

    // 2. 从浏览器语言设置获取
    const browserLanguage = navigator.language.toLowerCase();
    if (browserLanguage.startsWith("zh")) {
      return "zh";
    }

    // 3. 默认英文
    return "en";
  } catch (error) {
    console.warn("Failed to get initial language:", error);
    return "en";
  }
};

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (_value: boolean) => {},
  logout: () => {},
});

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  isEnglishWord: (word: string) => boolean;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  toggleLanguage: () => {},
  setLanguage: () => {},
  isEnglishWord: (_word: string) => false,
  t: (key: string) => key,
});

export default function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [language, setLanguage] = useState<Language>(() => getInitialLanguage());

  const logout = () => {
    setIsAuthenticated(false);
  };

  // 初始化语言设置
  useEffect(() => {
    const initLanguage = getInitialLanguage();
    if (initLanguage !== language) {
      setLanguage(initLanguage);
    }

    // 设置 HTML 属性
    document.documentElement.setAttribute("lang", initLanguage);
    document.documentElement.setAttribute("data-language", initLanguage);
  }, []);

  // 优化的语言切换函数
  const toggleLanguage = useCallback(() => {
    const newLang: Language = language === "en" ? "zh" : "en";

    try {
      // 清除翻译缓存，确保新语言的翻译生效
      clearTranslationCache();

      // 更新 HTML 属性
      document.documentElement.setAttribute("lang", newLang);
      document.documentElement.setAttribute("data-language", newLang);

      // 保存到 localStorage
      localStorage.setItem("language", newLang);

      // 更新状态
      setLanguage(newLang);

      console.log(`Language switched from ${language} to ${newLang}`);
    } catch (error) {
      console.error("Failed to toggle language:", error);
    }
  }, [language]);

  // 直接设置语言的函数
  const handleSetLanguage = useCallback(
    (newLang: Language) => {
      if (newLang === language) return;

      try {
        // 清除翻译缓存，确保新语言的翻译生效
        clearTranslationCache();

        document.documentElement.setAttribute("lang", newLang);
        document.documentElement.setAttribute("data-language", newLang);
        localStorage.setItem("language", newLang);
        setLanguage(newLang);

        console.log(`Language set to ${newLang}`);
      } catch (error) {
        console.error("Failed to set language:", error);
      }
    },
    [language]
  );

  // 优化的翻译函数
  const translateFunction = useCallback(
    (key: string) => {
      return t(key, language);
    },
    [language]
  );

  // 语言上下文值，使用 useMemo 优化性能
  const languageContextValue = useMemo(
    () => ({
      language,
      toggleLanguage,
      setLanguage: handleSetLanguage,
      isEnglishWord: shouldKeepEnglish,
      t: translateFunction,
    }),
    [language, toggleLanguage, handleSetLanguage, translateFunction]
  );

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout }}>
      <LanguageContext.Provider value={languageContextValue}>
        <div className="sticky top-0 left-0 right-0 z-50 backdrop-blur-optimized bg-gradient-to-r from-[#0A0F1C]/95 via-[#0F172A]/95 to-[#0A0F1C]/95 border-b border-[#00F0FF]/30 shadow-lg shadow-[#00F0FF]/5 transform-gpu">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <motion.div className="text-2xl font-bold cursor-pointer transform-gpu" onClick={() => navigate("/")} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
              <span className="text-transparent bg-gradient-to-r from-[#00F0FF] via-[#00D4FF] to-[#00F0FF] bg-clip-text font-extrabold tracking-wide">SCAI</span>
            </motion.div>
            <div className="flex gap-4 ml-auto items-center">
              <LanguageSwitcher />
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 240, 255, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00F0FF] via-[#00D4FF] to-[#00F0FF] text-[#0F172A] font-semibold flex items-center gap-2 shadow-lg shadow-[#00F0FF]/20 hover:shadow-[#00F0FF]/40 transition-all duration-300 transform-gpu border border-[#00F0FF]/20"
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <i className="fa-solid fa-wallet"></i>
                <span>Connect Wallet</span>
              </motion.button>
            </div>
          </div>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <PageErrorBoundary pageName="Home">
                <Home />
              </PageErrorBoundary>
            }
          />
          <Route
            path="/papers"
            element={
              <PageErrorBoundary pageName="Paper">
                <Paper />
              </PageErrorBoundary>
            }
          />
          <Route
            path="/storage"
            element={
              <PageErrorBoundary pageName="Storage">
                <Storage />
              </PageErrorBoundary>
            }
          />
          <Route
            path="/scibox"
            element={
              <PageErrorBoundary pageName="Storage">
                <Storage />
              </PageErrorBoundary>
            }
          />
          <Route
            path="/scaich"
            element={
              <PageErrorBoundary pageName="Paper">
                <Paper />
              </PageErrorBoundary>
            }
          />
          <Route
            path="/token"
            element={
              <PageErrorBoundary pageName="Token">
                <Token />
              </PageErrorBoundary>
            }
          />
          <Route
            path="/web3"
            element={
              <PageErrorBoundary pageName="Web3">
                <Web3 />
              </PageErrorBoundary>
            }
          />
          <Route
            path="/community"
            element={
              <PageErrorBoundary pageName="Community">
                <Community />
              </PageErrorBoundary>
            }
          />
          <Route
            path="/about"
            element={
              <PageErrorBoundary pageName="About">
                <About />
              </PageErrorBoundary>
            }
          />
        </Routes>
      </LanguageContext.Provider>
    </AuthContext.Provider>
  );
}
