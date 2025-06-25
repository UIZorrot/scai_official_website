import { motion } from "framer-motion";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { useNavigate } from "react-router-dom";

// Mock data
const milestones = [
  {
    date: "2024 Q1",
    event: "项目概念验证与原型开发",
    completed: true,
  },
  {
    date: "2024 Q2",
    event: "SCAICH论文AI引擎集成",
    completed: true,
  },
  {
    date: "2024 Q3",
    event: "Web3存储系统开发",
    completed: true,
  },
  {
    date: "2024 Q4",
    event: "代币经济模型设计",
    completed: false,
  },
  {
    date: "2025 Q1",
    event: "公开测试版发布",
    completed: false,
  },
  {
    date: "2025 Q2",
    event: "DAO治理系统上线",
    completed: false,
  },
];

const partners = [
  {
    name: "Web3 Foundation",
    logo: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Web3%20Foundation%20logo%2C%20minimalist%20design%2C%20white%20background&sign=264530b88473e8a0f8ec527e4f64b909",
    url: "https://web3.foundation",
  },
  {
    name: "IPFS",
    logo: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=IPFS%20logo%2C%20minimalist%20design%2C%20white%20background&sign=e9c3d43b554719641618168a31c3a05a",
    url: "https://ipfs.io",
  },
  {
    name: "Ethereum",
    logo: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Ethereum%20logo%2C%20minimalist%20design%2C%20white%20background&sign=11ad28f71b1b2dd24d7bba745e542756",
    url: "https://ethereum.org",
  },
  {
    name: "Arweave",
    logo: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Arweave%20logo%2C%20minimalist%20design%2C%20white%20background&sign=0be7b56e4fb269ebb8394c0c4bcfd903",
    url: "https://arweave.org",
  },
];

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A] text-white">
      <ParticlesBackground />



      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
             <h1 className="text-4xl md:text-5xl font-bold mb-4">
               关于 <span className="text-[#00F0FF]">SCAI</span>
             </h1>
             <p className="text-xl opacity-80 max-w-2xl mx-auto">
               由SciHub社区孵化的科学AI协作框架
             </p>
          </motion.div>

          {/* Roadmap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-8 text-[#00F0FF]">项目路线图</h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#00F0FF]/30"></div>

              {/* Timeline items */}
              <div className="space-y-8 pl-16">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="relative"
                  >
                    {/* Timeline dot */}
                    <div
                      className={`absolute -left-11 top-4 w-6 h-6 rounded-full flex items-center justify-center ${
                        milestone.completed
                          ? "bg-[#00F0FF] ring-4 ring-[#00F0FF]/30"
                          : "bg-[#0F172A] border-2 border-[#00F0FF]"
                      }`}
                    >
                      {milestone.completed && (
                        <i className="fa-solid fa-check text-[#0F172A] text-xs"></i>
                      )}
                    </div>

                    {/* Content */}
                    <div
                      className={`p-6 rounded-xl backdrop-blur-md border transition-all ${
                        milestone.completed
                          ? "border-[#00F0FF]/50 bg-[#00F0FF]/10"
                          : "border-[#00F0FF]/20 bg-[#0F172A]/50"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="w-24 flex-shrink-0">
                          <span className="font-bold">{milestone.date}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium">
                            {milestone.event}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

           {/* SciHub Community */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.1 }}
           >
             <h2 className="text-2xl font-bold mb-8 text-[#00F0FF]">Incubated by SciHub Community</h2>
             <div className="p-6 rounded-xl backdrop-blur-md border border-[#00F0FF]/20">
               <p className="mb-4">
                 SCAI框架由SciHub社区孵化，旨在推动开放科学和协作研究。我们相信AI代理可以成为研究者解决复杂问题的强大工具。
               </p>
               <p>
                 通过分布式AI代理网络，SCAI使研究者能够共享知识、协作分析，并加速科学发现。
               </p>
             </div>
           </motion.div>

           {/* Partners */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.2 }}
           >
             <h2 className="text-2xl font-bold mb-8 text-[#00F0FF]">合作伙伴</h2>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               {partners.map((partner, index) => (
                 <motion.a
                   key={index}
                   href={partner.url}
                   target="_blank"
                   rel="noopener noreferrer"
                   whileHover={{ scale: 1.05 }}
                   className="p-6 rounded-xl backdrop-blur-md border border-[#00F0FF]/20 hover:bg-[#00F0FF]/10 transition-all flex flex-col items-center"
                 >
                   <img
                     src={partner.logo}
                     alt={partner.name}
                     className="w-24 h-24 object-contain mb-4"
                   />
                   <span className="font-medium">{partner.name}</span>
                 </motion.a>
               ))}
             </div>
           </motion.div>
        </div>
      </main>


    </div>
  );
}
