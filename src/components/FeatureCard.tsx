import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: string;
  color: string;
  gradient?: string;
  delay: number;
  onClick: () => void;
};

export function FeatureCard({ title, description, icon, color, gradient = "from-[#00F0FF] to-[#00A8FF]", delay, onClick }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, transform: "translate3d(0, 30px, 0) rotateX(90deg)" }}
      animate={{ opacity: 1, transform: "translate3d(0, 0, 0) rotateX(0deg)" }}
      transition={{
        duration: 0.6,
        delay: delay * 0.15,
        type: "spring",
        damping: 10,
        stiffness: 100,
      }}
      whileHover={{
        transform: "translate3d(0, -5px, 0) scale3d(1.05, 1.05, 1)",
      }}
      whileTap={{ transform: "translate3d(0, 0, 0) scale3d(0.95, 0.95, 1)" }}
      className={cn("p-8 rounded-2xl backdrop-blur-xl border-2 cursor-pointer relative overflow-hidden group transform-gpu card-hover", `border-[${color}]/40 hover:border-[${color}]/90 bg-gradient-to-br from-[#0A0F1F]/80 to-[#0F172A]/80`)}
      style={{
        willChange: "transform",
        backfaceVisibility: "hidden",
        perspective: "1000px",
      }}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,240,255,0.05)_0%,_transparent_70%)] group-hover:opacity-100 opacity-0 transition-opacity"></div>
      <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none"></div>

      <div className="flex items-center gap-5 mb-5 relative z-10">
        <motion.div
          className={cn("p-4 rounded-xl relative overflow-hidden shadow-lg transform-gpu", `bg-gradient-to-br ${gradient} text-white`)}
          whileHover={{ transform: "translate3d(0, 0, 0) rotate(15deg) scale3d(1.1, 1.1, 1)" }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
          style={{
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
        >
          <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
          <i className={cn("text-3xl relative z-10", icon)}></i>
        </motion.div>
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#00A8FF]">{title}</h3>
      </div>
      <p className="text-base opacity-90 relative z-10">{description}</p>

      <motion.div
        className="absolute -bottom-5 -right-5 w-20 h-20 rounded-full bg-[#00F0FF]/10 blur-xl group-hover:opacity-100 opacity-0 transition-opacity transform-gpu"
        initial={{ transform: "translate3d(0, 0, 0) scale3d(0.5, 0.5, 1)" }}
        whileHover={{ transform: "translate3d(0, 0, 0) scale3d(1, 1, 1)" }}
        style={{
          willChange: "transform, opacity",
          backfaceVisibility: "hidden",
        }}
      />
    </motion.div>
  );
}
