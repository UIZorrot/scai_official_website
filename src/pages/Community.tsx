import { motion } from "framer-motion";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { useNavigate } from "react-router-dom";

export default function Community() {
  const navigate = useNavigate();

  const socialLinks = [
    { name: "Twitter", icon: "fa-brands fa-twitter", url: "#" },
    { name: "Discord", icon: "fa-brands fa-discord", url: "#" },
    { name: "GitHub", icon: "fa-brands fa-github", url: "#" },
    { name: "Telegram", icon: "fa-brands fa-telegram", url: "#" }
  ];

  const governanceSteps = [
    { step: 1, title: "提案", description: "社区成员提交改进提案" },
    { step: 2, title: "讨论", description: "社区讨论提案优缺点" },
    { step: 3, title: "投票", description: "代币持有者进行投票" },
    { step: 4, title: "实施", description: "通过后由核心团队实施" }
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
              加入 SCAI 社区
            </h1>
            <p className="text-xl opacity-80 max-w-2xl mx-auto">
              共同构建去中心化科学研究的未来
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className="bg-[#0F172A]/50 backdrop-blur-md rounded-xl border border-[#00F0FF]/20 p-6 text-center"
              >
                <i className={`${social.icon} text-4xl text-[#00F0FF] mb-3`}></i>
                <h3 className="text-lg font-medium">{social.name}</h3>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#0F172A]/50 backdrop-blur-md rounded-xl border border-[#00F0FF]/20 p-8 mb-12"
          >
            <h2 className="text-2xl font-bold mb-6 text-[#00F0FF]">治理流程</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {governanceSteps.map((step) => (
                <motion.div
                  key={step.step}
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#0F172A]/30 rounded-lg p-6 border border-[#00F0FF]/20"
                >
                  <div className="w-12 h-12 rounded-full bg-[#00F0FF] text-[#0F172A] flex items-center justify-center text-xl font-bold mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                  <p className="opacity-80">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#00A8FF] text-[#0F172A] font-bold text-lg"
            >
              立即加入社区
            </motion.button>
          </div>
        </div>
      </main>
    </div>
  );
}