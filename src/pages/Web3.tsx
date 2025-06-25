import { motion } from "framer-motion";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { useNavigate } from "react-router-dom";

export default function Web3() {
  const navigate = useNavigate();

  const features = [
    {
      title: "去中心化",
      description: "消除中间商，实现点对点交互",
      icon: "fa-solid fa-network-wired"
    },
    {
      title: "透明性",
      description: "所有交易公开可验证",
      icon: "fa-solid fa-eye"
    },
    {
      title: "安全性",
      description: "密码学保障的数据安全",
      icon: "fa-solid fa-lock"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A] text-white">
      <ParticlesBackground />



      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Web3 技术简介
            </h1>
            <p className="text-xl opacity-80 max-w-2xl mx-auto">
              下一代去中心化互联网基础设施
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#0F172A]/50 backdrop-blur-md rounded-xl border border-[#00F0FF]/20 p-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-[#00F0FF] to-[#00A8FF]">
                    <i className={`${feature.icon} text-white text-xl`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-[#00F0FF]">{feature.title}</h3>
                </div>
                <p className="opacity-90">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#0F172A]/50 backdrop-blur-md rounded-xl border border-[#00F0FF]/20 p-8 mb-12"
          >
            <h2 className="text-2xl font-bold mb-6 text-[#00F0FF]">区块链工作原理</h2>
            <div className="flex justify-center">
              <img 
                src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Blockchain%20technology%20infographic%2C%20showing%20nodes%2C%20blocks%20and%20connections%2C%20minimalist%20style&sign=ef56ba156436606cd2b9cf6d4aa6a801" 
                alt="Blockchain diagram"
                className="rounded-lg max-w-full"
              />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}