import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/useLanguage";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Mock data
const tokenAllocation = [
  { category: "Research Incentives", percentage: 40, amount: "400M" },
  { category: "Community Rewards", percentage: 25, amount: "250M" },
  { category: "Team & Advisors", percentage: 15, amount: "150M" },
  { category: "Ecosystem Fund", percentage: 12, amount: "120M" },
  { category: "Liquidity", percentage: 8, amount: "80M" },
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

export default function Token() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedProposal, setSelectedProposal] = useState<any>(null);
  const [stakeAmount, setStakeAmount] = useState("");
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [activeTab, setActiveTab] = useState<"governance" | "staking" | "tokenomics">("governance");

  // Prepare data for PieChart
  const pieChartData = tokenAllocation.map((item, index) => ({
    name: item.category,
    value: item.percentage,
    fill: `hsl(${index * 72}, 80%, 60%)`,
  }));

  const connectWallet = () => {
    setIsWalletConnected(true);
    toast.success("Wallet connected successfully");
  };

  const handleStake = () => {
    if (!stakeAmount) {
      toast.error("Please enter stake amount");
      return;
    }
    toast.success(`Staked ${stakeAmount} tokens successfully`);
    setStakeAmount("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A] text-white">
      <ParticlesBackground />

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row p-6 gap-6">
        {/* Left Panel - Token Model */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Token Model */}
          <motion.div className="bg-[#0F172A]/50 backdrop-blur-md rounded-xl border border-[#00F0FF]/20 p-6 flex-1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-bold mb-6 text-[#00F0FF]">{t("token.title")}</h2>
            <div className="w-full h-full rounded-lg overflow-hidden bg-[#0F172A]/30 flex items-center justify-center p-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieChartData} cx="50%" cy="50%" labelLine={false} outerRadius="80%" fill="#8884d8" dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0F172A",
                      borderColor: "#00F0FF",
                      borderRadius: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Allocation Details */}
          <motion.div className="bg-[#0F172A]/50 backdrop-blur-md rounded-xl border border-[#00F0FF]/20 p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <h3 className="text-xl font-bold mb-4 text-[#00F0FF]">{t("token.allocationDetails")}</h3>
            <div className="space-y-4">
              {tokenAllocation.map((item) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{item.category}</span>
                    <span className="text-[#00F0FF]">
                      {item.percentage}% • {item.amount}
                    </span>
                  </div>
                  <div className="w-full bg-[#0F172A]/30 rounded-full h-2">
                    <div className="bg-[#00F0FF] h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Panel - DAO Governance */}
        <div className="w-full lg:w-96 xl:w-[28rem] flex flex-col gap-6">
          {/* Tab Navigation */}
          <div className="flex bg-[#0F172A]/50 rounded-xl p-1">
            <button onClick={() => setActiveTab("governance")} className={`flex-1 py-2 rounded-lg ${activeTab === "governance" ? "bg-[#00F0FF] text-[#0F172A]" : "text-[#00F0FF]"}`}>
              {t("token.governance")}
            </button>
            <button onClick={() => setActiveTab("staking")} className={`flex-1 py-2 rounded-lg ${activeTab === "staking" ? "bg-[#00F0FF] text-[#0F172A]" : "text-[#00F0FF]"}`}>
              Staking
            </button>
            <button onClick={() => setActiveTab("tokenomics")} className={`flex-1 py-2 rounded-lg ${activeTab === "tokenomics" ? "bg-[#00F0FF] text-[#0F172A]" : "text-[#00F0FF]"}`}>
              Tokenomics
            </button>
          </div>

          {activeTab === "governance" && (
            <>
              {/* Stake Panel */}
              <motion.div className="bg-[#0F172A]/50 backdrop-blur-md rounded-xl border border-[#00F0FF]/20 p-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <h2 className="text-2xl font-bold mb-6 text-[#00F0FF]">Stake Tokens</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm opacity-80 mb-1">Amount to stake</label>
                    <input
                      type="number"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full px-4 py-3 rounded-lg bg-[#0F172A]/30 border border-[#00F0FF]/30 text-white placeholder-[#00F0FF]/50 focus:outline-none focus:ring-1 focus:ring-[#00F0FF]"
                    />
                  </div>
                  <button onClick={handleStake} className="w-full py-3 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#00F0FF]/70 text-[#0F172A] font-medium flex items-center justify-center gap-2">
                    <i className="fa-solid fa-lock"></i>
                    <span>Stake Tokens</span>
                  </button>
                </div>
              </motion.div>

              {/* Proposals */}
              <motion.div className="bg-[#0F172A]/50 backdrop-blur-md rounded-xl border border-[#00F0FF]/20 p-6 flex-1 overflow-y-auto" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                <h2 className="text-2xl font-bold mb-6 text-[#00F0FF]">DAO Proposals</h2>
                <div className="space-y-4">
                  {proposals.map((proposal) => (
                    <motion.div key={proposal.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="p-4 rounded-lg bg-[#0F172A]/30 border border-[#00F0FF]/20 cursor-pointer" onClick={() => setSelectedProposal(proposal)}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{proposal.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${proposal.status === "active" ? "bg-yellow-500/20 text-yellow-400" : proposal.status === "passed" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>{proposal.status.toUpperCase()}</span>
                      </div>
                      <p className="text-sm opacity-80 mb-3">
                        Ends: {proposal.endDate} • {proposal.votes} votes
                      </p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>For</span>
                          <span>{proposal.for}%</span>
                        </div>
                        <div className="w-full bg-[#0F172A]/50 rounded-full h-2">
                          <div className="bg-[#00F0FF] h-2 rounded-full" style={{ width: `${proposal.for}%` }} />
                        </div>
                      </div>
                      <div className="space-y-1 mt-2">
                        <div className="flex justify-between text-sm">
                          <span>Against</span>
                          <span>{proposal.against}%</span>
                        </div>
                        <div className="w-full bg-[#0F172A]/50 rounded-full h-2">
                          <div className="bg-red-400 h-2 rounded-full" style={{ width: `${proposal.against}%` }} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          )}

          {activeTab === "staking" && (
            <motion.div className="bg-[#0F172A]/50 backdrop-blur-md rounded-xl border border-[#00F0FF]/20 p-6 flex-1 overflow-y-auto" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl font-bold mb-6 text-[#00F0FF]">Staking Dashboard</h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#0F172A]/30 p-4 rounded-lg border border-[#00F0FF]/20">
                  <p className="text-sm opacity-80">Total Staked</p>
                  <p className="text-2xl font-bold text-[#00F0FF]">18,000,000 SCAI</p>
                </div>
                <div className="bg-[#0F172A]/30 p-4 rounded-lg border border-[#00F0FF]/20">
                  <p className="text-sm opacity-80">Current Epoch</p>
                  <p className="text-2xl font-bold text-[#00F0FF]">3</p>
                </div>
              </div>

              <h3 className="text-lg font-bold mb-4 text-[#00F0FF]">Staking History</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stakingData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#00F0FF/20" />
                    <XAxis dataKey="epoch" stroke="#00F0FF" />
                    <YAxis stroke="#00F0FF" />
                    <Tooltip contentStyle={{ backgroundColor: "#0F172A", borderColor: "#00F0FF" }} />
                    <Area type="monotone" dataKey="totalStaked" stroke="#00F0FF" fill="#00F0FF/20" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <h3 className="text-lg font-bold mt-6 mb-4 text-[#00F0FF]">Epoch 3 Rewards</h3>
              <div className="bg-[#0F172A]/30 p-4 rounded-lg border border-[#00F0FF]/20">
                <p className="text-sm opacity-80">Total Rewards</p>
                <p className="text-xl font-bold text-[#00F0FF]">900,000 SCAI</p>
                <p className="text-sm opacity-80 mt-2">APY: ~15%</p>
              </div>
            </motion.div>
          )}

          {activeTab === "tokenomics" && (
            <motion.div className="bg-[#0F172A]/50 backdrop-blur-md rounded-xl border border-[#00F0FF]/20 p-6 flex-1 overflow-y-auto" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl font-bold mb-6 text-[#00F0FF]">Token Metrics</h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#0F172A]/30 p-4 rounded-lg border border-[#00F0FF]/20">
                  <p className="text-sm opacity-80">Circulating Supply</p>
                  <p className="text-xl font-bold text-[#00F0FF]">450M SCAI</p>
                </div>
                <div className="bg-[#0F172A]/30 p-4 rounded-lg border border-[#00F0FF]/20">
                  <p className="text-sm opacity-80">Total Supply</p>
                  <p className="text-xl font-bold text-[#00F0FF]">1B SCAI</p>
                </div>
              </div>

              <h3 className="text-lg font-bold mb-4 text-[#00F0FF]">Token Burn History</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={tokenBurnData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#00F0FF/20" />
                    <XAxis dataKey="date" stroke="#00F0FF" />
                    <YAxis stroke="#00F0FF" />
                    <Tooltip contentStyle={{ backgroundColor: "#0F172A", borderColor: "#00F0FF" }} />
                    <Bar dataKey="amount" fill="#00F0FF" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-[#0F172A]/30 p-4 rounded-lg border border-[#00F0FF]/20 mt-6">
                <p className="text-sm opacity-80">Foundation Treasury</p>
                <p className="text-xl font-bold text-[#00F0FF]">120M SCAI</p>
                <p className="text-sm opacity-80 mt-2">$12,000,000 USD</p>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Proposal Modal */}
      <AnimatePresence>
        {selectedProposal && (
          <motion.div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProposal(null)}>
            <motion.div className="bg-[#0F172A] rounded-xl border border-[#00F0FF]/30 p-6 max-w-md w-full max-h-[90vh] overflow-y-auto" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-[#00F0FF]">{selectedProposal.title}</h2>
                <button className="text-[#00F0FF]/70 hover:text-[#00F0FF]" onClick={() => setSelectedProposal(null)}>
                  <i className="fa-solid fa-times"></i>
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm opacity-80">Status</p>
                    <p className={`font-medium ${selectedProposal.status === "active" ? "text-yellow-400" : selectedProposal.status === "passed" ? "text-green-400" : "text-red-400"}`}>{selectedProposal.status.toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-80">End Date</p>
                    <p className="font-medium">{selectedProposal.endDate}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Total Votes</p>
                    <p className="font-medium">{selectedProposal.votes}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm opacity-80">Voting Results</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>For</span>
                      <span>{selectedProposal.for}%</span>
                    </div>
                    <div className="w-full bg-[#0F172A]/50 rounded-full h-2">
                      <div className="bg-[#00F0FF] h-2 rounded-full" style={{ width: `${selectedProposal.for}%` }} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Against</span>
                      <span>{selectedProposal.against}%</span>
                    </div>
                    <div className="w-full bg-[#0F172A]/50 rounded-full h-2">
                      <div className="bg-red-400 h-2 rounded-full" style={{ width: `${selectedProposal.against}%` }} />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#00F0FF]/20">
                  <button className="w-full py-2 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF]">Vote For</button>
                  <button className="w-full mt-2 py-2 rounded-full bg-red-400/10 border border-red-400/30 text-red-400">Vote Against</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
