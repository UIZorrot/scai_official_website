import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";

export default function Home() {
  const { language, t, isChinese, isEnglish } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

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

  // 两个核心产品
  const coreProducts = [
    {
      title: "SCAI Search",
      subtitle: "AI-Powered Scientific Search Engine",
      description: "Revolutionary AI search engine specifically designed for scientific research. Our advanced algorithms understand scientific context and terminology to deliver precise, relevant results for researchers worldwide.",
      url: "https://search.scai.sh",
      icon: "fa-solid fa-magnifying-glass",
      icon1: "fa-solid fa-brain",
      icon2: "fa-solid fa-network-wired",
      color: "#3B82F6",
      gradient: "from-[#3B82F6] to-[#1D4ED8]",
      images: ["/1-1.png", "/1-2.png"],
      features: [
        "AI-powered semantic search across millions of papers",
        "Advanced filtering and citation analysis",
        "Real-time collaboration tools",
        "Multi-language support"
      ]
    },
    {
      title: "SciBox Store",
      subtitle: "Decentralized Scientific Data Storage",
      description: "The world's first decentralized storage platform built specifically for scientific data and research papers. Ensuring permanent, censorship-resistant access to scientific knowledge for future generations.",
      url: "https://scibox.store",
      icon: "fa-solid fa-database",
      icon1: "fa-solid fa-shield-halved",
      icon2: "fa-solid fa-globe",
      color: "#1E40AF",
      gradient: "from-[#1E40AF] to-[#1E3A8A]",
      images: ["/2-1.png", "/2-2.png"],
      features: [
        "Immutable storage for research data",
        "Distributed network with 99.99% uptime",
        "Advanced encryption and data integrity",
        "Global CDN for fast access"
      ]
    }
  ];



  // 获取翻译文本 - 现在直接从Context获取t函数
  const getTranslation = (key: string) => {
    return t(key);
  };

  const translations = {
    title: getTranslation("SCAI - Web3 Brain of Academic"),
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



  // 语言变化时强制重新渲染
  useEffect(() => {
    console.log(`Language changed to: ${language}, forcing re-render`);
    // 这里不需要做任何操作，依赖项变化会自动触发重新渲染
  }, [language]);

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col bg-white text-gray-900 overflow-hidden critical-content">

      {/* Hero Section with Parallax */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center px-6"
        style={{
          y: heroY,
          opacity: heroOpacity,
          backgroundImage: 'url(/hero-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-white/40"></div>

        <div className="text-center max-w-6xl mx-auto relative z-20">
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
              style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.2)' }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                SCAI | Web3 Brain of Academic
              </span>
            </motion.h1>

            <motion.div
              className="text-lg sm:text-xl md:text-2xl font-light mb-3 text-gray-700"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Scientific AI Collaboration Infrastructure
            </motion.div>

            <motion.p
              className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Building the future of scientific research through decentralized AI networks,
              censorship-resistant storage, and blockchain-powered collaboration
            </motion.p>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-lg hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Ecosystem
            </motion.button>
            <motion.button
              className="px-8 py-4 rounded-xl border border-blue-600 text-blue-600 font-semibold text-lg hover:bg-blue-50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Read Whitepaper
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Section Divider */}
      <div className="relative py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="w-full h-px bg-gray-200"></div>
        </div>
      </div>

      {/* Staking & Rewards Section */}
      <section className="relative py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 pb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
              Staking & Rewards
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Earn rewards by participating in the SCAI ecosystem
            </p>
          </motion.div>

          <motion.div
            className="max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Foundation Staking Content */}
            <div className="text-center">


              <div className="max-w-4xl mx-auto mb-12">
                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                  The SCAI Foundation will launch token staking at the appropriate time. Staking your SCAI tokens will earn you dedicated rewards from the foundation's special fund pool.
                </p>

                <p className="text-lg text-gray-600 leading-relaxed">
                  Join our community to stay updated on the staking launch and be among the first to participate in the SCAI ecosystem rewards program.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">Foundation Fund</div>
                  <div className="text-gray-600 text-lg">Dedicated reward pool</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">Governance</div>
                  <div className="text-gray-600 text-lg">Participate in decisions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">Rewards</div>
                  <div className="text-gray-600 text-lg">Earn SCAI tokens</div>
                </div>
              </div>

              <motion.a
                href="https://foundation.scai.sh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold text-lg hover:from-blue-700 hover:to-blue-900 hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Visit Foundation</span>
                <i className="fa-solid fa-external-link-alt"></i>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="relative py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="w-full h-px bg-gray-200"></div>
        </div>
      </div>

      {/* Core Products Section */}
      <section className="relative py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
              Our Products
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Two powerful platforms revolutionizing scientific research and collaboration
            </p>
          </motion.div>

          <div className="space-y-16">
            {coreProducts.map((product, index) => (
              <motion.div
                key={product.title}
                className="flex flex-col lg:flex-row items-center gap-16"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* 图片展示部分 */}
                <div className="flex-shrink-0 lg:w-1/2">
                  <div className="grid grid-cols-1 gap-6">
                    {product.images.map((image, imgIndex) => (
                      <motion.div
                        key={imgIndex}
                        className="relative rounded-2xl overflow-hidden shadow-xl"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src={image}
                          alt={`${product.title} - ${imgIndex + 1}`}
                          className="w-full h-auto object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* 内容部分 */}
                <div className="flex-1 lg:w-1/2">
                  <div className="max-w-2xl">
                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                    >


                      <h3 className="text-4xl font-bold text-gray-900 mb-3">
                        {product.title}
                      </h3>

                      <div className="text-blue-600 font-semibold text-xl mb-6">
                        {product.subtitle}
                      </div>
                    </motion.div>

                    <motion.p
                      className="text-lg text-gray-700 leading-relaxed mb-8"
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      {product.description}
                    </motion.p>

                    <div className="space-y-3 mb-8">
                      {product.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 border border-gray-200"
                          initial={{ opacity: 0, x: 50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-2"></div>
                          <span className="text-gray-700 font-medium leading-relaxed">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    <motion.a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gray-900 text-white font-semibold text-lg hover:bg-gray-800 hover:shadow-xl border-2 border-gray-900 hover:border-gray-800 transition-all duration-300"
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Visit Platform</span>
                      <i className="fa-solid fa-arrow-right"></i>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="relative py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="w-full h-px bg-gray-200"></div>
        </div>
      </div>

      {/* Network Statistics Section */}
      <section className="relative py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
              Network Analytics
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real-time insights into our decentralized research ecosystem
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Research Network Stats */}
            <motion.div
              className="group relative p-8 rounded-2xl bg-white border border-gray-200 hover:border-[#4F46E5]/50 hover:shadow-lg transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              viewport={{ once: true }}
              style={{
                willChange: "transform",
                backfaceVisibility: "hidden",
              }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#4F46E5]/10 to-[#7C3AED]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className="p-3 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#7C3AED]"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <i className="fa-solid fa-network-wired text-white text-xl"></i>
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900">Network Activity</h3>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-xl bg-gray-50 border border-gray-200">
                      <p className="text-sm text-gray-600 mb-2">Active Nodes</p>
                      <p className="text-2xl font-bold text-[#4F46E5]">2,847</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-gray-50 border border-gray-200">
                      <p className="text-sm text-gray-600 mb-2">Total Staked</p>
                      <p className="text-2xl font-bold text-[#7C3AED]">18M SCAI</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {stakingData.map((epoch, index) => (
                      <motion.div
                        key={epoch.epoch}
                        className="flex justify-between items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <span className="text-sm text-gray-600">Epoch {epoch.epoch}</span>
                        <span className="font-medium text-gray-900">{epoch.totalStaked.toLocaleString()} SCAI</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Research Papers Analytics */}
            <motion.div
              className="group relative p-8 rounded-2xl bg-white border border-gray-200 hover:border-[#059669]/50 hover:shadow-lg transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
              viewport={{ once: true }}
              style={{
                willChange: "transform",
                backfaceVisibility: "hidden",
              }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#059669]/10 to-[#0D9488]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className="p-3 rounded-xl bg-gradient-to-br from-[#059669] to-[#0D9488]"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <i className="fa-solid fa-file-lines text-white text-xl"></i>
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900">Research Papers</h3>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-xl bg-gray-50 border border-gray-200">
                      <p className="text-sm text-gray-600 mb-2">Total Papers</p>
                      <p className="text-2xl font-bold text-[#059669]">1,245</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-gray-50 border border-gray-200">
                      <p className="text-sm text-gray-600 mb-2">This Month</p>
                      <p className="text-2xl font-bold text-[#0D9488]">+87</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {paperStats.categories.map((category, index) => (
                      <motion.div
                        key={category.name}
                        className="flex justify-between items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <span className="text-sm text-gray-600">{category.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-[#059669] to-[#0D9488] rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${category.percentage}%` }}
                              transition={{ duration: 1, delay: index * 0.2 }}
                              viewport={{ once: true }}
                            />
                          </div>
                          <span className="font-medium text-gray-900 text-sm">{category.percentage}%</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tokenomics Analytics */}
            <motion.div
              className="group relative p-8 rounded-2xl bg-white border border-gray-200 hover:border-[#DC2626]/50 hover:shadow-lg transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.02, y: -5 }}
              viewport={{ once: true }}
              style={{
                willChange: "transform",
                backfaceVisibility: "hidden",
              }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#DC2626]/10 to-[#EA580C]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className="p-3 rounded-xl bg-gradient-to-br from-[#DC2626] to-[#EA580C]"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <i className="fa-solid fa-coins text-white text-xl"></i>
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900">Token Economics</h3>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-xl bg-gray-50 border border-gray-200">
                      <p className="text-sm text-gray-600 mb-2">Total Burned</p>
                      <p className="text-2xl font-bold text-[#DC2626]">1.5M SCAI</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-gray-50 border border-gray-200">
                      <p className="text-sm text-gray-600 mb-2">Foundation</p>
                      <p className="text-2xl font-bold text-[#EA580C]">120M SCAI</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {tokenBurnData.map((month, index) => (
                      <motion.div
                        key={month.date}
                        className="flex justify-between items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <span className="text-sm text-gray-600">{month.date}</span>
                        <span className="font-medium text-gray-900">{month.amount.toLocaleString()} SCAI</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="relative py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="w-full h-px bg-gray-200"></div>
        </div>
      </div>

      {/* Team Section */}
      <section className="relative py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
              Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leading researchers and engineers building the future of decentralized science
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Alex Chen",
                role: "Chief Scientist",
                expertise: "AI Research & Blockchain",
                image: "👨‍🔬",
                description: "Former MIT researcher with 10+ years in AI and distributed systems"
              },
              {
                name: "Sarah Johnson",
                role: "Lead Engineer",
                expertise: "Decentralized Systems",
                image: "👩‍💻",
                description: "Ex-Google engineer specializing in large-scale distributed architectures"
              },
              {
                name: "Dr. Maria Rodriguez",
                role: "Research Director",
                expertise: "Scientific Publishing",
                image: "👩‍🔬",
                description: "Former Nature editor with expertise in peer review and academic publishing"
              },
              {
                name: "David Kim",
                role: "Blockchain Architect",
                expertise: "Smart Contracts & DeFi",
                image: "👨‍💼",
                description: "Ethereum core contributor with deep knowledge of tokenomics"
              },
              {
                name: "Dr. Emily Watson",
                role: "Data Scientist",
                expertise: "Machine Learning",
                image: "👩‍🎓",
                description: "Stanford PhD with focus on scientific data analysis and AI models"
              },
              {
                name: "Michael Zhang",
                role: "Product Manager",
                expertise: "User Experience",
                image: "👨‍🎯",
                description: "Former Apple PM with experience in building research tools"
              }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                className="group relative p-8 rounded-2xl bg-white border border-gray-200 hover:border-gray-400 hover:-translate-y-2 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#4F46E5]/10 to-[#059669]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 text-center">
                  <div
                    className="text-6xl mb-4"
                  >
                    {member.image}
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#4F46E5] group-hover:to-[#059669] transition-all duration-300">
                    {member.name}
                  </h3>

                  <div className="text-[#4F46E5] font-semibold mb-2">
                    {member.role}
                  </div>

                  <div className="text-sm text-[#059669] mb-4 font-medium">
                    {member.expertise}
                  </div>

                  <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300 leading-relaxed text-sm">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="relative py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="w-full h-px bg-gray-200"></div>
        </div>
      </div>

      {/* Roadmap Section */}
      <section className="relative py-16 px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">{translations.roadmap}</h2>

        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-300"></div>

            {/* Timeline items */}
            <div className="space-y-16 pl-16">
              {[
                {
                  quarter: "2025 Q3",
                  title: "Foundation & Community",
                  items: language === "en" ? [
                    "Complete community migration and initial token distribution",
                    "Establish strategic research partnerships",
                    "Launch SCAI Developer Hackathon",
                    "Release SCAI Research NFT collection"
                  ] : [
                    "完成社区迁移和初始代币分配",
                    "建立战略研究合作伙伴关系",
                    "启动SCAI开发者黑客松",
                    "发布SCAI研究NFT收藏"
                  ],
                },
                {
                  quarter: "2025 Q4",
                  title: "Platform Development",
                  items: language === "en" ? [
                    "Launch decentralized scholar social network",
                    "Establish SCAI Foundation governance",
                    "Major website and UX overhaul",
                    "Open public staking mechanisms"
                  ] : [
                    "启动去中心化学者社交网络",
                    "建立SCAI基金会治理",
                    "重大网站和用户体验改革",
                    "开放公共质押机制"
                  ],
                },
                {
                  quarter: "2026 Q1",
                  title: "Advanced Features",
                  items: language === "en" ? [
                    "SCAICH v2.0 with premium membership services",
                    "Implement token burning mechanisms",
                    "Open source core SCAI protocols",
                    "Launch peer review incentive system"
                  ] : [
                    "SCAICH v2.0及高级会员服务",
                    "实施代币燃烧机制",
                    "开源核心SCAI协议",
                    "启动同行评议激励系统"
                  ],
                },
                {
                  quarter: "2026 Q2",
                  title: "Ecosystem Expansion",
                  items: language === "en" ? [
                    "Launch SCAI preprint publication service",
                    "Deploy decentralized academic database",
                    "Release comprehensive SCAI API suite",
                    "Open SCAI Research Marketplace"
                  ] : [
                    "启动SCAI预印本发布服务",
                    "部署去中心化学术数据库",
                    "发布综合SCAI API套件",
                    "开放SCAI研究市场"
                  ],
                },
                {
                  quarter: "2026 Q3",
                  title: "DeFi Integration",
                  items: language === "en" ? [
                    "Scholar Real World Assets (RWA) tokenization",
                    "Launch SCAI project incubator platform",
                    "Deploy DeSci staking and yield farming",
                    "Cross-chain research collaboration tools"
                  ] : [
                    "学者真实世界资产(RWA)代币化",
                    "启动SCAI项目孵化平台",
                    "部署DeSci质押和流动性挖矿",
                    "跨链研究协作工具"
                  ],
                },
                {
                  quarter: "2026 Q4",
                  title: "AI Integration",
                  items: language === "en" ? [
                    "SCAI AuditorAI automated peer review system",
                    "Launch fully decentralized academic journal",
                    "AI-powered research discovery engine",
                    "Smart contract-based research funding"
                  ] : [
                    "SCAI AuditorAI自动化同行评议系统",
                    "启动完全去中心化学术期刊",
                    "AI驱动的研究发现引擎",
                    "基于智能合约的研究资助"
                  ],
                },
                {
                  quarter: "2027+",
                  title: "Autonomous Research",
                  items: language === "en" ? [
                    "SCAI LAB - Autonomous scientific research agents",
                    "Self-organizing research communities",
                    "AI-human collaborative research protocols",
                    "Global decentralized science infrastructure"
                  ] : [
                    "SCAI LAB - 自主科学研究智能体",
                    "自组织研究社区",
                    "AI-人类协作研究协议",
                    "全球去中心化科学基础设施"
                  ],
                },
              ].map((period, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, rotateX: 45 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="relative group"
                  style={{
                    willChange: "transform, opacity",
                    backfaceVisibility: "hidden",
                  }}
                >
                  {/* Enhanced Timeline dot */}
                  <motion.div
                    className="absolute -left-12 top-6 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-[#4F46E5] to-[#059669] ring-4 ring-gray-200 shadow-lg"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    <i className="fa-solid fa-rocket text-white text-sm"></i>
                  </motion.div>

                  {/* Quarter and Title */}
                  <div className="mb-6">
                    <motion.h3
                      className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {period.quarter}
                    </motion.h3>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">{period.title}</h4>
                  </div>

                  {/* Enhanced Items */}
                  <div className="space-y-4">
                    {period.items.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        whileHover={{
                          x: 10,
                          scale: 1.02,
                          transition: { duration: 0.2 }
                        }}
                        className="group/item relative p-6 rounded-xl bg-white border border-gray-200 hover:border-[#4F46E5]/30 hover:shadow-lg transition-all duration-300"
                        viewport={{ once: true }}
                        style={{
                          willChange: "transform",
                          backfaceVisibility: "hidden",
                        }}
                      >
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#4F46E5]/5 to-[#059669]/5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />

                        <div className="relative z-10 flex items-start gap-4">
                          <motion.div
                            className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#059669] flex items-center justify-center mt-1"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <i className="fa-solid fa-check text-white text-xs"></i>
                          </motion.div>
                          <p className="text-gray-800 group-hover/item:text-gray-900 transition-colors duration-300 leading-relaxed font-medium">
                            {item}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="relative py-12 px-6 border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-6">
              <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text">
                SCAI
              </div>
            </div>

            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Scientific AI Collaboration Infrastructure - Building the future of decentralized science
            </p>

            <div className="flex justify-center gap-6 mb-8">
              {[
                { icon: "fa-brands fa-twitter" },
                { icon: "fa-brands fa-github" },
                { icon: "fa-brands fa-discord" },
                { icon: "fa-brands fa-telegram" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className={social.icon}></i>
                </motion.a>
              ))}
            </div>

            <div className="text-gray-600 text-sm">
              © 2025 SCAI. All rights reserved.
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
