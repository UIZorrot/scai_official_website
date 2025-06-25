import { motion } from "framer-motion";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { Search } from "@/components/Search";
import { FeatureCard } from "@/components/FeatureCard";
import { useNavigate } from "react-router-dom";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from "recharts";
import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

export default function Home() {
  const navigate = useNavigate();
  const { language, t, isChinese, isEnglish } = useLanguage();

  useEffect(() => {
    console.group("Home Language Update");
    console.log("Current language:", language);
    console.log("Is Chinese:", isChinese);
    console.log("Is English:", isEnglish);
    console.log("Document language:", document.documentElement.getAttribute("lang"));
    console.log("Translating title:", t("home.title"));
    console.groupEnd();
  }, [language, t, isChinese, isEnglish]);

  // 质押数据 (增加第四期数据)
  const stakingData = [
    { epoch: 1, totalStaked: 12000000, rewards: 500000 },
    { epoch: 2, totalStaked: 15000000, rewards: 750000 },
    { epoch: 3, totalStaked: 18000000, rewards: 900000 },
    { epoch: 4, totalStaked: 21000000, rewards: 1050000 },
  ];

  // 代币燃烧数据 (增加更多月份数据)
  const tokenBurnData = [
    { date: "2025-01", amount: 1000000 },
    { date: "2025-02", amount: 1200000 },
    { date: "2025-03", amount: 1500000 },
    { date: "2025-04", amount: 1800000 },
    { date: "2025-05", amount: 2000000 },
  ];

  // 基金会资金数据
  const foundationData = {
    total: 120000000,
    allocated: 45000000,
    remaining: 75000000,
  };

  // 论文数据
  const paperStats = {
    total: 1245,
    lastMonth: 87,
    trending: "Decentralized AI",
    categories: [
      { name: "Decentralized AI", percentage: 72 },
      { name: "Blockchain", percentage: 18 },
      { name: "Privacy", percentage: 10 },
    ],
  };

  // API状态数据
  const apiStatusData = [
    { name: "AI API", status: "active", uptime: 99.9 },
    { name: "Storage API", status: "active", uptime: 99.5 },
    { name: "Token API", status: "maintenance", uptime: 98.2 },
  ];

  const features = [
    {
      title: "Scaich",
      description: "AI-powered paper search and analysis platform",
      icon: "fa-solid fa-magnifying-glass",
      color: "#00F0FF",
      gradient: "from-[#00F0FF] to-[#00A8FF]",
    },
    {
      title: "Scibox",
      description: "Decentralized censorship-resistant file storage",
      icon: "fa-solid fa-database",
      color: "#00F0FF",
      gradient: "from-[#00F0FF] to-[#00FFA8]",
    },
    {
      title: "Web3",
      description: "Blockchain technology and tokenomics",
      icon: "fa-solid fa-link",
      color: "#00F0FF",
      gradient: "from-[#00F0FF] to-[#A800FF]",
    },
  ];

  // 获取翻译文本 - 现在直接从Context获取t函数
  const getTranslation = (key: string) => {
    return t(key);
  };

  const translations = {
    title: getTranslation("SCAI - Scientific AI Collaboration Framework"),
    subtitle: getTranslation("Building scientific AI agent networks to accelerate research breakthroughs"),
    tokenButton: getTranslation("Learn about our token"),
    networkStats: getTranslation("Network Stats"),
    stakingData: getTranslation("Staking Data"),
    totalStaked: getTranslation("Total Staked"),
    currentRewards: getTranslation("Current Rewards"),
    paperData: getTranslation("Paper Data"),
    totalPapers: getTranslation("Total Papers"),
    lastMonth: getTranslation("Last Month"),
    tokenomics: getTranslation("Tokenomics"),
    totalBurned: getTranslation("Total Burned"),
    foundationFunds: getTranslation("Foundation Funds"),
    roadmap: getTranslation("Project Roadmap"),
    joinCommunity: getTranslation("Join our research community"),
  };

  // 确保所有文本都通过translateText处理
  const featureTranslations = features.map((feature) => ({
    ...feature,
    title: getTranslation(feature.title),
    description: getTranslation(feature.description),
  }));

  // 语言变化时强制重新渲染
  useEffect(() => {
    console.log(`Language changed to: ${language}, forcing re-render`);
    // 这里不需要做任何操作，依赖项变化会自动触发重新渲染
  }, [language]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0F1F] text-white overflow-hidden">
      <ParticlesBackground />

      {/* Main Content */}
      <main className="flex-1 px-6 pb-12 relative z-10">
        {/* 标题和搜索 */}
        <div className="text-center mb-8 sm:mb-12 max-w-4xl mx-auto pt-6 sm:pt-8">
          <motion.h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#00A8FF]">SCAI</span> - {t("home.title").split(" - ")[1] || "Scientific AI Collaboration Framework"}
          </motion.h1>
          <motion.p className="text-xl opacity-90 max-w-3xl mx-auto mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
            {t("home.subtitle")}
          </motion.p>
          <motion.div className="w-full max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}>
            <Search />
            <button className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#0062FF] text-[#0A0F1F] font-bold text-lg shadow-lg hover:shadow-[#00F0FF]/30 transition-all" onClick={() => navigate("/token")}>
              {t("home.tokenButton")}
            </button>
          </motion.div>
        </div>

        {/* 功能卡片 - 对称布局 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {featureTranslations.map((feature, index) => (
            <FeatureCard key={feature.title} title={feature.title} description={feature.description} icon={feature.icon} color={feature.color} gradient={feature.gradient} delay={index % 2 === 0 ? index / 2 : (index + 1) / 2} onClick={() => navigate(`/${feature.title.toLowerCase()}`)} />
          ))}
          {/* 新增第四个功能卡片 */}
          <FeatureCard title="Community" description={translations.joinCommunity} icon="fa-solid fa-users" color="#00F0FF" gradient="from-[#00F0FF] to-[#FF00F0]" delay={1.5} onClick={() => navigate("/community")} />
        </div>

        {/* 数据统计面板 */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#00F0FF]">{translations.networkStats}</h2>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* 质押数据卡片 */}
            <motion.div className="bg-[#0A0F1F]/50 backdrop-blur-md rounded-xl border border-[#00F0FF]/20 p-6" whileHover={{ y: -5 }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-[#00F0FF] to-[#00A8FF]">
                  <i className="fa-solid fa-lock text-white text-lg"></i>
                </div>
                <h3 className="text-lg font-bold">{translations.stakingData}</h3>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm opacity-80 mb-1">{translations.totalStaked}</p>
                    <p className="text-2xl font-bold text-[#00F0FF]">18M SCAI</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-80 mb-1">{translations.currentRewards}</p>
                    <p className="text-xl font-bold text-[#00A8FF]">900K SCAI</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {stakingData.map((epoch) => (
                    <div key={epoch.epoch} className="flex justify-between items-center">
                      <span className="text-sm opacity-80">Epoch {epoch.epoch}</span>
                      <span className="font-medium">{epoch.totalStaked.toLocaleString()} SCAI</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 论文数据卡片 */}
            <motion.div className="bg-[#0A0F1F]/50 backdrop-blur-md rounded-xl border border-[#00F0FF]/20 p-6" whileHover={{ y: -5 }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-[#00F0FF] to-[#00A8FF]">
                  <i className="fa-solid fa-file-lines text-white text-lg"></i>
                </div>
                <h3 className="text-lg font-bold">{translations.paperData}</h3>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm opacity-80 mb-1">{translations.totalPapers}</p>
                    <p className="text-2xl font-bold text-[#00F0FF]">1,245</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-80 mb-1">{translations.lastMonth}</p>
                    <p className="text-xl font-bold text-[#00F0FF]">+87</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {paperStats.categories.map((category) => (
                    <div key={category.name} className="flex justify-between items-center">
                      <span className="text-sm opacity-80">{category.name}</span>
                      <span className="font-medium">{category.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 代币数据卡片 */}
            <motion.div className="bg-[#0A0F1F]/50 backdrop-blur-md rounded-xl border border-[#00F0FF]/20 p-6" whileHover={{ y: -5 }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-[#00F0FF] to-[#00A8FF]">
                  <i className="fa-solid fa-coins text-white text-lg"></i>
                </div>
                <h3 className="text-lg font-bold">{translations.tokenomics}</h3>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm opacity-80 mb-1">{translations.totalBurned}</p>
                    <p className="text-2xl font-bold text-[#00F0FF]">1.5M SCAI</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-80 mb-1">{translations.foundationFunds}</p>
                    <p className="text-xl font-bold text-[#00A8FF]">120M SCAI</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {tokenBurnData.map((month) => (
                    <div key={month.date} className="flex justify-between items-center">
                      <span className="text-sm opacity-80">{month.date}</span>
                      <span className="font-medium">{month.amount.toLocaleString()} SCAI</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Roadmap Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#00F0FF]">{translations.roadmap}</h2>

          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#00F0FF]/30"></div>

              {/* Timeline items */}
              <div className="space-y-12 pl-16">
                {[
                  {
                    quarter: "2025 Q3",
                    items: language === "en" ? ["Complete community migration initial token distribution", "Project partnerships", "Hackathon", "NFT"] : ["完成社区迁移初始代币分配", "项目合作", "黑客松", "NFT"],
                  },
                  {
                    quarter: "2025 Q4",
                    items: language === "en" ? ["Decentralized scholar social system", "Foundation", "Website update", "Open Staking"] : ["去中心化学者社交系统", "Foundation", "官网更新", "开放Staking"],
                  },
                  {
                    quarter: "2026 Q1",
                    items: language === "en" ? ["SCAICH y2.0 and membership services", "Token burning", "SCAI open source"] : ["SCAICH y2.0以及会员服务", "燃烧代币", "SCAI开源"],
                  },
                  {
                    quarter: "2026 Q2",
                    items: language === "en" ? ["SCAI preprint service", "Decentralized academic database", "SCAI API service", "SCAI Marketplace"] : ["SCAI预印本服务", "去中心化学术数据库", "SCAIAPI服务", "SCAI商城"],
                  },
                  {
                    quarter: "2026 Q3",
                    items: language === "en" ? ["Scholar RWA", "SCAI Launchpad", "DeSci staking platform"] : ["学者RWA", "SCAI Launchpad", "Desci质押平台"],
                  },
                  {
                    quarter: "2026 Q4",
                    items: language === "en" ? ["SCAI AuditorAI simulated reviewer", "Decentralized journal"] : ["SCAI AuditorAI模拟审稿人", "去中心化期刊"],
                  },
                  {
                    quarter: "2027",
                    items: language === "en" ? ["SCAI LAB - An autonomous scientific research Agent"] : ["SCAI LAB一个能够自主进行科研创造的Agent"],
                  },
                ].map((period, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="relative">
                    {/* Timeline dot */}
                    <div className="absolute -left-11 top-4 w-6 h-6 rounded-full flex items-center justify-center bg-[#00F0FF] ring-4 ring-[#00F0FF]/30">
                      <i className="fa-solid fa-calendar text-[#0F172A] text-xs"></i>
                    </div>

                    {/* Quarter */}
                    <h3 className="text-xl font-bold mb-4 text-[#00F0FF]">{period.quarter}</h3>

                    {/* Items */}
                    <div className="space-y-3">
                      {period.items.map((item, i) => (
                        <motion.div key={i} whileHover={{ x: 5 }} className="p-4 rounded-lg bg-[#0F172A]/50 border border-[#00F0FF]/20 backdrop-blur-md">
                          <div className="flex items-center gap-3">
                            <i className="fa-solid fa-check text-[#00F0FF]"></i>
                            <p>{item}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
