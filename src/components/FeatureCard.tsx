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

export function FeatureCard({
  title,
  description,
  icon,
  color,
  gradient = "from-[#00F0FF] to-[#00A8FF]",
  delay,
  onClick,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: delay * 0.15,
        type: "spring",
        damping: 10,
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.05,
        y: -5,
        boxShadow: "0 20px 40px -10px rgba(0, 240, 255, 0.3)",
        backgroundColor: "rgba(0, 240, 255, 0.05)"
      }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "p-8 rounded-2xl backdrop-blur-xl border-2 cursor-pointer transition-all relative overflow-hidden group",
        `border-[${color}]/40 hover:border-[${color}]/90 bg-gradient-to-br from-[#0A0F1F]/80 to-[#0F172A]/80`
      )}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,240,255,0.05)_0%,_transparent_70%)] group-hover:opacity-100 opacity-0 transition-opacity"></div>
      <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none"></div>
      
      <div className="flex items-center gap-5 mb-5 relative z-10">
        <motion.div
          className={cn(
            "p-4 rounded-xl relative overflow-hidden shadow-lg",
            `bg-gradient-to-br ${gradient} text-white`
          )}
          whileHover={{ rotate: 15, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
          <i className={cn("text-3xl relative z-10", icon)}></i>
        </motion.div>
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#00A8FF]">
          {title}
        </h3>
      </div>
      <p className="text-base opacity-90 relative z-10">{description}</p>
      
      <motion.div 
        className="absolute -bottom-5 -right-5 w-20 h-20 rounded-full bg-[#00F0FF]/10 blur-xl group-hover:opacity-100 opacity-0 transition-opacity"
        initial={{ scale: 0.5 }}
        whileHover={{ scale: 1 }}
      />
    </motion.div>
  );
}