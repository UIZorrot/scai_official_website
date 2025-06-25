import { useState } from "react";
import { motion } from "framer-motion";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { SimpleNodeVisualization } from "@/components/SimpleNodeVisualization";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/useLanguage";

// Mock data
const uploadHistory = [
  { id: "1", name: "research_paper.pdf", size: "2.4 MB", cid: "QmXoypiz...", date: "2025-06-20" },
  { id: "2", name: "dataset.zip", size: "156 MB", cid: "QmYwAPJ...", date: "2025-06-18" },
];

const nodeData = [
  { id: "1", location: "Tokyo", capacity: "12.5 TB", status: "normal" as const, coordinates: [139.6917, 35.6895] as [number, number] },
  { id: "2", location: "New York", capacity: "8.2 TB", status: "normal" as const, coordinates: [-74.006, 40.7128] as [number, number] },
  { id: "3", location: "London", capacity: "5.7 TB", status: "warning" as const, coordinates: [-0.1276, 51.5072] as [number, number] },
  { id: "4", location: "Singapore", capacity: "9.1 TB", status: "normal" as const, coordinates: [103.8198, 1.3521] as [number, number] },
  { id: "5", location: "Moscow", capacity: "3.2 TB", status: "error" as const, coordinates: [37.6173, 55.7558] as [number, number] },
];

export default function Storage() {
  const { t } = useLanguage();
  const [storageType, setStorageType] = useState<"ipfs" | "arweave">("ipfs");
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  // Handle node selection from 3D visualization
  const handleNodeSelect = (node: any) => {
    setSelectedNode(node);
    toast.info(`Selected node: ${node.location}`);
  };

  // Handle file drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (!isWalletConnected) {
      toast.error("Please connect wallet first");
      return;
    }

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      toast.success(`File ${files[0].name} ready for upload to ${storageType.toUpperCase()}`);
      // Simulate upload process
      setTimeout(() => {
        toast.success("File uploaded successfully! CID: QmNew...");
      }, 2000);
    }
  };

  const connectWallet = () => {
    setIsWalletConnected(true);
    toast.success("Wallet connected successfully");
  };

  const handleFileSelect = () => {
    if (!isWalletConnected) {
      toast.error("Please connect wallet first");
      return;
    }
    // Simulate file selection
    toast.info("File selection dialog would open here");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A] text-white">
      <ParticlesBackground />

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row p-4 sm:p-6 gap-4 sm:gap-6">
        {/* Left Panel - Upload */}
        <div className="w-full lg:w-96 xl:w-[28rem] flex flex-col gap-4 sm:gap-6">
          {/* Upload Panel */}
          <motion.div className="bg-[#0F172A]/50 backdrop-blur-md rounded-xl border border-[#00F0FF]/20 p-4 sm:p-6" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#00F0FF]">{t("storage.uploadPanel") || "Upload Panel"}</h2>

            <div className="flex gap-2 sm:gap-4 mb-4 sm:mb-6">
              <button onClick={() => setStorageType("ipfs")} className={`flex-1 py-2 rounded-lg text-sm sm:text-base ${storageType === "ipfs" ? "bg-[#00F0FF] text-[#0F172A]" : "bg-[#0F172A] border border-[#00F0FF]/50 text-[#00F0FF]"}`}>
                IPFS
              </button>
              <button onClick={() => setStorageType("arweave")} className={`flex-1 py-2 rounded-lg text-sm sm:text-base ${storageType === "arweave" ? "bg-[#00F0FF] text-[#0F172A]" : "bg-[#0F172A] border border-[#00F0FF]/50 text-[#00F0FF]"}`}>
                Arweave
              </button>
            </div>

            <div
              className={`border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-colors ${isDragging ? "border-[#00F0FF] bg-[#00F0FF]/10" : "border-[#00F0FF]/30"}`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <i className="fa-solid fa-cloud-arrow-up text-3xl sm:text-4xl text-[#00F0FF] mb-4"></i>
              <p className="mb-2 text-sm sm:text-base">{t("storage.dragDrop") || "Drag & drop files here"}</p>
              <p className="text-xs sm:text-sm opacity-70 mb-4">{t("storage.orClick") || "or click to browse"}</p>
              <button className="px-4 sm:px-6 py-2 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-sm sm:text-base" onClick={handleFileSelect}>
                {t("storage.selectFiles") || "Select Files"}
              </button>
            </div>

            <button
              className="w-full mt-4 sm:mt-6 py-3 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#00F0FF]/70 text-[#0F172A] font-medium flex items-center justify-center gap-2 text-sm sm:text-base"
              onClick={() => {
                if (!isWalletConnected) {
                  connectWallet();
                } else {
                  toast.success("Transaction signed successfully");
                }
              }}
            >
              <i className="fa-solid fa-signature"></i>
              <span>{isWalletConnected ? t("storage.signUpload") || "Sign & Upload" : t("storage.connectWallet") || "Connect Wallet"}</span>
            </button>
          </motion.div>

          {/* Upload History */}
          <motion.div className="bg-[#0F172A]/50 backdrop-blur-md rounded-xl border border-[#00F0FF]/20 p-4 sm:p-6" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-[#00F0FF]">{t("storage.uploadHistory") || "Upload History"}</h3>
            <div className="space-y-3 sm:space-y-4">
              {uploadHistory.map((item) => (
                <div key={item.id} className="p-3 sm:p-4 rounded-lg bg-[#0F172A]/30 border border-[#00F0FF]/10">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-sm sm:text-base">{item.name}</p>
                      <p className="text-xs sm:text-sm opacity-70">
                        {item.size} • {item.date}
                      </p>
                    </div>
                    <button
                      className="text-[#00F0FF] text-xs sm:text-sm"
                      onClick={() => {
                        navigator.clipboard.writeText(item.cid);
                        toast.success("CID copied to clipboard");
                      }}
                    >
                      Copy CID
                    </button>
                  </div>
                  <div className="mt-2 text-xs font-mono opacity-70 truncate">{item.cid}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Panel - Node Map */}
        <div className="flex-1 flex flex-col gap-4 sm:gap-6">
          {/* Node Map */}
          <motion.div className="bg-[#0F172A]/50 backdrop-blur-md rounded-xl border border-[#00F0FF]/20 p-4 sm:p-6 flex-1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#00F0FF]">{t("storage.storageNodes") || "Storage Nodes"}</h2>
            <div className="w-full h-full rounded-lg overflow-hidden bg-[#0F172A]/30" style={{ minHeight: "400px" }}>
              <SimpleNodeVisualization nodes={nodeData} onNodeSelect={handleNodeSelect} className="w-full h-full" />
            </div>
          </motion.div>

          {/* Node Details */}
          {selectedNode && (
            <motion.div className="bg-[#0F172A]/50 backdrop-blur-md rounded-xl border border-[#00F0FF]/20 p-4 sm:p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-[#00F0FF]">{t("storage.nodeDetails") || "Node Details"}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs sm:text-sm opacity-70">{t("storage.location") || "Location"}</p>
                  <p className="font-medium text-sm sm:text-base">{selectedNode.location}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm opacity-70">{t("storage.capacity") || "Capacity"}</p>
                  <p className="font-medium text-sm sm:text-base">{selectedNode.capacity}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm opacity-70">{t("storage.status") || "Status"}</p>
                  <p className={`font-medium text-sm sm:text-base ${selectedNode.status === "normal" ? "text-green-400" : selectedNode.status === "warning" ? "text-yellow-400" : "text-red-400"}`}>{selectedNode.status.toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm opacity-70">{t("storage.coordinates") || "Coordinates"}</p>
                  <p className="font-mono text-xs sm:text-sm">{selectedNode.coordinates.join(", ")}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
