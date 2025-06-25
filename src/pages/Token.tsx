import { useState, useRef, useEffect, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/useLanguage";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Mock data - will be translated in component
const tokenAllocationData = [
  { categoryKey: "researchIncentives", percentage: 40, amount: "400M" },
  { categoryKey: "communityRewards", percentage: 25, amount: "250M" },
  { categoryKey: "teamAdvisors", percentage: 15, amount: "150M" },
  { categoryKey: "ecosystemFund", percentage: 12, amount: "120M" },
  { categoryKey: "liquidity", percentage: 8, amount: "80M" },
];

const proposals = [
  {
    id: "1",
    title: "Increase research grant funding by 5%",
    status: "active",
    endDate: "2025-07-15",
    votes: 1245,
    for: 68,
    against: 32,
  },
  {
    id: "2",
    title: "Update tokenomics model for long-term sustainability",
    status: "passed",
    endDate: "2025-06-10",
    votes: 2341,
    for: 82,
    against: 18,
  },
  {
    id: "3",
    title: "Reject partnership with Centralized AI Lab",
    status: "rejected",
    endDate: "2025-05-28",
    votes: 1876,
    for: 41,
    against: 59,
  },
];

// New staking data
const stakingData = [
  { epoch: 1, totalStaked: 12000000, rewards: 500000 },
  { epoch: 2, totalStaked: 15000000, rewards: 750000 },
  { epoch: 3, totalStaked: 18000000, rewards: 900000 },
  { epoch: 4, totalStaked: 21000000, rewards: 1050000 },
];

const tokenBurnData = [
  { date: "2025-01", amount: 1000000 },
  { date: "2025-02", amount: 1200000 },
  { date: "2025-03", amount: 1500000 },
  { date: "2025-04", amount: 1800000 },
  { date: "2025-05", amount: 2000000 },
];

// Optimized animation variants for performance
const fadeInVariants = {
  hidden: {
    opacity: 0,
    transform: "translate3d(0, 20px, 0)",
    willChange: "transform, opacity",
  },
  visible: {
    opacity: 1,
    transform: "translate3d(0, 0, 0)",
    willChange: "auto",
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smoother animation
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const scaleVariants = {
  initial: {
    scale: 1,
    willChange: "transform",
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1, ease: "easeOut" },
  },
};

// Loading skeleton component with hardware acceleration
const ChartSkeleton = memo(() => (
  <div className="h-64 bg-[#0F172A]/20 rounded-lg p-4 border border-[#00F0FF]/10 animate-pulse transform-gpu">
    <div className="h-full bg-[#00F0FF]/10 rounded transform-gpu"></div>
  </div>
));

export default function Token() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedProposal, setSelectedProposal] = useState<any>(null);
  const [stakeAmount, setStakeAmount] = useState("");
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [activeTab, setActiveTab] = useState<"governance" | "staking" | "tokenomics">("governance");
  const [isLoading, setIsLoading] = useState(false);
  const [isStaking, setIsStaking] = useState(false);

  // Memoized data for performance optimization
  const tokenAllocation = useMemo(
    () =>
      tokenAllocationData.map((item) => ({
        ...item,
        category: t(`token.${item.categoryKey}`),
      })),
    [t]
  );

  const pieChartData = useMemo(
    () =>
      tokenAllocation.map((item, index) => ({
        name: item.category,
        value: item.percentage,
        fill: `hsl(${index * 72}, 80%, 60%)`,
      })),
    [tokenAllocation]
  );

  // Optimized event handlers with useCallback
  const connectWallet = useCallback(() => {
    setIsWalletConnected(true);
    toast.success(t("token.walletConnected"));
  }, [t]);

  const handleStake = useCallback(async () => {
    if (!stakeAmount) {
      toast.error(t("token.enterStakeAmount"));
      return;
    }

    setIsStaking(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success(t("token.stakeSuccess").replace("{amount}", stakeAmount));
      setStakeAmount("");
    } catch (error) {
      toast.error("Failed to stake tokens. Please try again.");
    } finally {
      setIsStaking(false);
    }
  }, [stakeAmount, t]);

  const handleTabChange = useCallback((tab: "governance" | "staking" | "tokenomics") => {
    setActiveTab(tab);
  }, []);

  const handleProposalSelect = useCallback((proposal: any) => {
    setSelectedProposal(proposal);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProposal(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0A0F1C] via-[#0F172A] to-[#1A1F2E] text-white">
      <ParticlesBackground />

      {/* Main Content */}
      <main className="flex flex-col flex-1 gap-6 p-6 lg:flex-row">
        {/* Left Panel - Token Model */}
        <motion.div className="flex flex-col flex-1 gap-6" variants={staggerContainer} initial="hidden" animate="visible">
          {/* Token Model */}
          <motion.div className="bg-[#0F172A]/50 backdrop-blur-md rounded-xl border border-[#00F0FF]/20 p-6 transform-gpu" variants={fadeInVariants} layout={false}>
            <h2 className="text-2xl font-bold mb-6 text-[#00F0FF]">{t("token.title")}</h2>
            <div className="w-full h-80 md:h-96 rounded-lg overflow-hidden bg-[#0F172A]/30 flex items-center justify-center p-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieChartData} cx="50%" cy="50%" labelLine={false} outerRadius="65%" innerRadius="20%" fill="#8884d8" dataKey="value" label={({ percent }) => `${(percent * 100).toFixed(0)}%`} animationBegin={200} animationDuration={800} animationEasing="ease-out">
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0F172A",
                      borderColor: "#00F0FF",
                      borderRadius: "12px",
                      border: "1px solid #00F0FF",
                      boxShadow: "0 4px 6px rgba(0, 240, 255, 0.1)",
                    }}
                    labelStyle={{ color: "#00F0FF" }}
                    itemStyle={{ color: "#FFFFFF" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Allocation Details */}
          <motion.div className="bg-[#0F172A]/50 backdrop-blur-md rounded-xl border border-[#00F0FF]/20 p-6 transform-gpu" variants={fadeInVariants} layout={false}>
            <h3 className="text-xl font-bold mb-4 text-[#00F0FF]">{t("token.allocationDetails")}</h3>
            <div className="space-y-4">
              {tokenAllocation.map((item, index) => (
                <motion.div key={item.category} className="space-y-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 + 0.3, duration: 0.3 }}>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{item.category}</span>
                    <span className="text-[#00F0FF]">
                      {item.percentage}% • {item.amount}
                    </span>
                  </div>
                  <div className="w-full bg-[#0F172A]/30 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="bg-[#00F0FF] h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{
                        delay: index * 0.1 + 0.5,
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Panel - DAO Governance */}
        <motion.div className="w-full lg:w-96 xl:w-[28rem] flex flex-col gap-6" initial={{ opacity: 0, transform: "translate3d(20px, 0, 0)" }} animate={{ opacity: 1, transform: "translate3d(0, 0, 0)" }} transition={{ duration: 0.5, delay: 0.2 }}>
          {/* Tab Navigation */}
          <div className="flex bg-[#0F172A]/50 backdrop-blur-md rounded-xl p-1 border border-[#00F0FF]/10 transform-gpu">
            <motion.button
              onClick={() => handleTabChange("governance")}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 transform-gpu ${activeTab === "governance" ? "bg-[#00F0FF] text-[#0F172A] shadow-lg shadow-[#00F0FF]/20" : "text-[#00F0FF] hover:bg-[#00F0FF]/10"}`}
              aria-pressed={activeTab === "governance"}
              aria-label={t("token.governance")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {t("token.governance")}
            </motion.button>
            <motion.button
              onClick={() => handleTabChange("staking")}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 transform-gpu ${activeTab === "staking" ? "bg-[#00F0FF] text-[#0F172A] shadow-lg shadow-[#00F0FF]/20" : "text-[#00F0FF] hover:bg-[#00F0FF]/10"}`}
              aria-pressed={activeTab === "staking"}
              aria-label={t("token.staking")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {t("token.staking")}
            </motion.button>
            <motion.button
              onClick={() => handleTabChange("tokenomics")}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 transform-gpu ${activeTab === "tokenomics" ? "bg-[#00F0FF] text-[#0F172A] shadow-lg shadow-[#00F0FF]/20" : "text-[#00F0FF] hover:bg-[#00F0FF]/10"}`}
              aria-pressed={activeTab === "tokenomics"}
              aria-label={t("token.tokenomics")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {t("token.tokenomics")}
            </motion.button>
          </div>

          {activeTab === "governance" && (
            <>
              {/* Stake Panel */}
              <motion.div className="bg-[#0F172A]/50 backdrop-blur-md rounded-xl border border-[#00F0FF]/20 p-6 hover:border-[#00F0FF]/30 transition-colors" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <h2 className="text-2xl font-bold mb-6 text-[#00F0FF] flex items-center gap-2">
                  <i className="text-xl fa-solid fa-coins"></i>
                  {t("token.stakeTokens")}
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium opacity-90 mb-2 text-[#00F0FF]">{t("token.amountToStake")}</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                        placeholder={t("token.enterAmount")}
                        className="w-full px-4 py-3 rounded-lg bg-[#0F172A]/30 border border-[#00F0FF]/30 text-white placeholder-[#00F0FF]/50 focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 focus:border-[#00F0FF] transition-all"
                        aria-label={t("token.amountToStake")}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#00F0FF]/70 text-sm font-medium">SCAI</div>
                    </div>
                  </div>
                  <motion.button
                    onClick={handleStake}
                    disabled={isStaking || !stakeAmount}
                    whileHover={!isStaking ? { scale: 1.02 } : {}}
                    whileTap={!isStaking ? { scale: 0.98 } : {}}
                    className={`w-full py-3 rounded-full font-semibold flex items-center justify-center gap-2 shadow-lg transition-all ${
                      isStaking || !stakeAmount ? "bg-gray-500/50 text-gray-300 cursor-not-allowed" : "bg-gradient-to-r from-[#00F0FF] to-[#00F0FF]/70 text-[#0F172A] shadow-[#00F0FF]/20 hover:shadow-[#00F0FF]/30"
                    }`}
                  >
                    {isStaking ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin"></i>
                        <span>Staking...</span>
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-lock"></i>
                        <span>{t("token.stakeButton")}</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>

              {/* Proposals */}
              <motion.div className="bg-[#0F172A]/50 backdrop-blur-md rounded-xl border border-[#00F0FF]/20 p-6 flex-1 overflow-y-auto hover:border-[#00F0FF]/30 transition-colors" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                <h2 className="text-2xl font-bold mb-6 text-[#00F0FF] flex items-center gap-2">
                  <i className="text-xl fa-solid fa-vote-yea"></i>
                  {t("token.daoProposals")}
                </h2>
                <div className="space-y-4">
                  {proposals.map((proposal) => (
                    <motion.div
                      key={proposal.id}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-5 rounded-lg bg-[#0F172A]/30 border border-[#00F0FF]/20 cursor-pointer hover:border-[#00F0FF]/40 hover:bg-[#0F172A]/40 transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-[#00F0FF]/10"
                      onClick={() => handleProposalSelect(proposal)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="pr-2 font-semibold leading-tight text-white">{proposal.title}</h3>
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap ${
                            proposal.status === "active" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-400/30" : proposal.status === "passed" ? "bg-green-500/20 text-green-400 border border-green-400/30" : "bg-red-500/20 text-red-400 border border-red-400/30"
                          }`}
                        >
                          {t(`token.${proposal.status}`)}
                        </span>
                      </div>
                      <p className="text-sm opacity-80 mb-4 text-[#00F0FF]/80">
                        {t("token.proposalEnds")}: {proposal.endDate} • {proposal.votes} {t("token.votes")}
                      </p>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium text-green-400">{t("token.voteFor")}</span>
                            <span className="font-semibold">{proposal.for}%</span>
                          </div>
                          <div className="w-full bg-[#0F172A]/50 rounded-full h-2.5 overflow-hidden">
                            <motion.div className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full" initial={{ width: 0 }} animate={{ width: `${proposal.for}%` }} transition={{ duration: 1, delay: 0.2 }} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium text-red-400">{t("token.voteAgainst")}</span>
                            <span className="font-semibold">{proposal.against}%</span>
                          </div>
                          <div className="w-full bg-[#0F172A]/50 rounded-full h-2.5 overflow-hidden">
                            <motion.div className="h-full bg-gradient-to-r from-red-400 to-red-500 rounded-full" initial={{ width: 0 }} animate={{ width: `${proposal.against}%` }} transition={{ duration: 1, delay: 0.3 }} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          )}

          {activeTab === "staking" && (
            <motion.div className="bg-[#0F172A]/50 backdrop-blur-md rounded-xl border border-[#00F0FF]/20 p-6 flex-1 overflow-y-auto hover:border-[#00F0FF]/30 transition-colors" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl font-bold mb-6 text-[#00F0FF] flex items-center gap-2">
                <i className="text-xl fa-solid fa-chart-line"></i>
                {t("token.stakingDashboard")}
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <motion.div className="bg-gradient-to-br from-[#0F172A]/40 to-[#0F172A]/60 p-5 rounded-lg border border-[#00F0FF]/20 hover:border-[#00F0FF]/40 transition-all" whileHover={{ scale: 1.02 }}>
                  <div className="flex gap-2 items-center mb-2">
                    <i className="fa-solid fa-coins text-[#00F0FF]"></i>
                    <p className="text-sm font-medium opacity-90">{t("token.totalStaked")}</p>
                  </div>
                  <p className="text-2xl font-bold text-[#00F0FF]">18,000,000 SCAI</p>
                </motion.div>
                <motion.div className="bg-gradient-to-br from-[#0F172A]/40 to-[#0F172A]/60 p-5 rounded-lg border border-[#00F0FF]/20 hover:border-[#00F0FF]/40 transition-all" whileHover={{ scale: 1.02 }}>
                  <div className="flex gap-2 items-center mb-2">
                    <i className="fa-solid fa-clock text-[#00F0FF]"></i>
                    <p className="text-sm font-medium opacity-90">{t("token.currentEpoch")}</p>
                  </div>
                  <p className="text-2xl font-bold text-[#00F0FF]">3</p>
                </motion.div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold mb-4 text-[#00F0FF] flex items-center gap-2">
                  <i className="text-sm fa-solid fa-chart-area"></i>
                  {t("token.stakingHistory")}
                </h3>
                <div className="h-64 bg-[#0F172A]/20 rounded-lg p-4 border border-[#00F0FF]/10 transform-gpu">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stakingData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#00F0FF" strokeOpacity={0.2} horizontal={true} vertical={false} />
                      <XAxis dataKey="epoch" stroke="#00F0FF" fontSize={12} tickFormatter={(value) => `Epoch ${value}`} axisLine={false} tickLine={false} />
                      <YAxis stroke="#00F0FF" fontSize={12} tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0F172A",
                          borderColor: "#00F0FF",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px rgba(0, 240, 255, 0.1)",
                        }}
                        formatter={(value: any) => [`${(value / 1000000).toFixed(1)}M SCAI`, "Total Staked"]}
                        labelFormatter={(label) => `Epoch ${label}`}
                        animationDuration={200}
                      />
                      <Area type="monotone" dataKey="totalStaked" stroke="#00F0FF" strokeWidth={2} fill="url(#stakingGradient)" animationBegin={300} animationDuration={1200} animationEasing="ease-out" dot={false} activeDot={{ r: 4, fill: "#00F0FF", strokeWidth: 0 }} />
                      <defs>
                        <linearGradient id="stakingGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#00F0FF" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4 text-[#00F0FF] flex items-center gap-2">
                  <i className="text-sm fa-solid fa-gift"></i>
                  {t("token.epochRewards")} 3
                </h3>
                <motion.div className="bg-gradient-to-br from-[#0F172A]/40 to-[#0F172A]/60 p-5 rounded-lg border border-[#00F0FF]/20 hover:border-[#00F0FF]/40 transition-all" whileHover={{ scale: 1.02 }}>
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex gap-2 items-center">
                      <i className="text-yellow-400 fa-solid fa-trophy"></i>
                      <p className="text-sm font-medium opacity-90">{t("token.totalRewards")}</p>
                    </div>
                    <span className="px-2 py-1 text-xs text-green-400 rounded-full bg-green-500/20">+15% APY</span>
                  </div>
                  <p className="text-xl font-bold text-[#00F0FF] mb-2">900,000 SCAI</p>
                  <p className="text-sm opacity-80">{t("token.apy")}: ~15%</p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === "tokenomics" && (
            <motion.div className="bg-[#0F172A]/50 backdrop-blur-md rounded-xl border border-[#00F0FF]/20 p-6 flex-1 overflow-y-auto hover:border-[#00F0FF]/30 transition-colors" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl font-bold mb-6 text-[#00F0FF] flex items-center gap-2">
                <i className="text-xl fa-solid fa-chart-pie"></i>
                {t("token.tokenMetrics")}
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <motion.div className="bg-gradient-to-br from-[#0F172A]/40 to-[#0F172A]/60 p-5 rounded-lg border border-[#00F0FF]/20 hover:border-[#00F0FF]/40 transition-all" whileHover={{ scale: 1.02 }}>
                  <div className="flex gap-2 items-center mb-2">
                    <i className="fa-solid fa-circle-notch text-[#00F0FF]"></i>
                    <p className="text-sm font-medium opacity-90">{t("token.circulatingSupply")}</p>
                  </div>
                  <p className="text-xl font-bold text-[#00F0FF]">450M SCAI</p>
                  <p className="mt-1 text-xs opacity-70">45% of total supply</p>
                </motion.div>
                <motion.div className="bg-gradient-to-br from-[#0F172A]/40 to-[#0F172A]/60 p-5 rounded-lg border border-[#00F0FF]/20 hover:border-[#00F0FF]/40 transition-all" whileHover={{ scale: 1.02 }}>
                  <div className="flex gap-2 items-center mb-2">
                    <i className="fa-solid fa-coins text-[#00F0FF]"></i>
                    <p className="text-sm font-medium opacity-90">{t("token.totalSupply")}</p>
                  </div>
                  <p className="text-xl font-bold text-[#00F0FF]">1B SCAI</p>
                  <p className="mt-1 text-xs opacity-70">Maximum supply</p>
                </motion.div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold mb-4 text-[#00F0FF] flex items-center gap-2">
                  <i className="text-sm fa-solid fa-fire"></i>
                  {t("token.tokenBurnHistory")}
                </h3>
                <div className="h-64 bg-[#0F172A]/20 rounded-lg p-4 border border-[#00F0FF]/10 transform-gpu">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={tokenBurnData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#00F0FF" strokeOpacity={0.2} horizontal={true} vertical={false} />
                      <XAxis dataKey="date" stroke="#00F0FF" fontSize={12} axisLine={false} tickLine={false} />
                      <YAxis stroke="#00F0FF" fontSize={12} tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0F172A",
                          borderColor: "#00F0FF",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px rgba(0, 240, 255, 0.1)",
                        }}
                        formatter={(value: any) => [`${(value / 1000000).toFixed(1)}M SCAI`, "Burned"]}
                        labelFormatter={(label) => `Month: ${label}`}
                        animationDuration={200}
                      />
                      <Bar dataKey="amount" fill="url(#burnGradient)" radius={[4, 4, 0, 0]} animationBegin={400} animationDuration={1000} animationEasing="ease-out" />
                      <defs>
                        <linearGradient id="burnGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#FF6B6B" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#FF6B6B" stopOpacity={0.3} />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <motion.div className="bg-gradient-to-br from-[#0F172A]/40 to-[#0F172A]/60 p-5 rounded-lg border border-[#00F0FF]/20 hover:border-[#00F0FF]/40 transition-all" whileHover={{ scale: 1.02 }}>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex gap-2 items-center">
                    <i className="fa-solid fa-university text-[#00F0FF]"></i>
                    <p className="text-sm font-medium opacity-90">{t("token.foundationTreasury")}</p>
                  </div>
                  <span className="px-2 py-1 text-xs text-blue-400 rounded-full bg-blue-500/20">Locked</span>
                </div>
                <p className="text-xl font-bold text-[#00F0FF] mb-2">120M SCAI</p>
                <p className="text-sm opacity-80">$12,000,000 USD</p>
                <p className="mt-1 text-xs opacity-70">12% of total supply</p>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </main>

      {/* Proposal Modal */}
      <AnimatePresence>
        {selectedProposal && (
          <motion.div className="flex fixed inset-0 z-50 justify-center items-center p-4 backdrop-blur-md bg-black/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleCloseModal}>
            <motion.div
              className="bg-[#0F172A] rounded-xl border border-[#00F0FF]/30 p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-[#00F0FF]/10"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-3 items-center">
                  <i className="fa-solid fa-file-text text-[#00F0FF] text-lg"></i>
                  <h2 className="text-xl font-bold text-[#00F0FF]">{selectedProposal.title}</h2>
                </div>
                <motion.button className="text-[#00F0FF]/70 hover:text-[#00F0FF] p-2 rounded-lg hover:bg-[#00F0FF]/10 transition-colors" onClick={handleCloseModal} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <i className="text-lg fa-solid fa-times"></i>
                </motion.button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-[#0F172A]/30 rounded-lg border border-[#00F0FF]/20">
                    <p className="mb-1 text-xs opacity-80">{t("token.proposalStatus")}</p>
                    <p className={`font-semibold text-sm ${selectedProposal.status === "active" ? "text-yellow-400" : selectedProposal.status === "passed" ? "text-green-400" : "text-red-400"}`}>{t(`token.${selectedProposal.status}`)}</p>
                  </div>
                  <div className="text-center p-3 bg-[#0F172A]/30 rounded-lg border border-[#00F0FF]/20">
                    <p className="mb-1 text-xs opacity-80">{t("token.endDate")}</p>
                    <p className="font-semibold text-sm text-[#00F0FF]">{selectedProposal.endDate}</p>
                  </div>
                  <div className="text-center p-3 bg-[#0F172A]/30 rounded-lg border border-[#00F0FF]/20">
                    <p className="mb-1 text-xs opacity-80">{t("token.totalVotes")}</p>
                    <p className="font-semibold text-sm text-[#00F0FF]">{selectedProposal.votes}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#00F0FF] flex items-center gap-2">
                    <i className="text-sm fa-solid fa-chart-bar"></i>
                    {t("token.votingResults")}
                  </h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="flex gap-2 items-center font-medium text-green-400">
                          <i className="text-sm fa-solid fa-thumbs-up"></i>
                          {t("token.voteFor")}
                        </span>
                        <span className="text-lg font-bold">{selectedProposal.for}%</span>
                      </div>
                      <div className="w-full bg-[#0F172A]/50 rounded-full h-3 overflow-hidden">
                        <motion.div className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full" initial={{ width: 0 }} animate={{ width: `${selectedProposal.for}%` }} transition={{ duration: 1, delay: 0.2 }} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="flex gap-2 items-center font-medium text-red-400">
                          <i className="text-sm fa-solid fa-thumbs-down"></i>
                          {t("token.voteAgainst")}
                        </span>
                        <span className="text-lg font-bold">{selectedProposal.against}%</span>
                      </div>
                      <div className="w-full bg-[#0F172A]/50 rounded-full h-3 overflow-hidden">
                        <motion.div className="h-full bg-gradient-to-r from-red-400 to-red-500 rounded-full" initial={{ width: 0 }} animate={{ width: `${selectedProposal.against}%` }} transition={{ duration: 1, delay: 0.3 }} />
                      </div>
                    </div>
                  </div>
                </div>

                {selectedProposal.status === "active" && (
                  <div className="pt-4 border-t border-[#00F0FF]/20 space-y-3">
                    <motion.button
                      className="flex gap-2 justify-center items-center py-3 w-full font-medium text-green-400 bg-gradient-to-r rounded-full border transition-all from-green-500/20 to-green-400/20 border-green-400/30 hover:bg-green-400/10"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <i className="fa-solid fa-thumbs-up"></i>
                      {t("token.voteFor")}
                    </motion.button>
                    <motion.button className="flex gap-2 justify-center items-center py-3 w-full font-medium text-red-400 bg-gradient-to-r rounded-full border transition-all from-red-500/20 to-red-400/20 border-red-400/30 hover:bg-red-400/10" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <i className="fa-solid fa-thumbs-down"></i>
                      {t("token.voteAgainst")}
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
