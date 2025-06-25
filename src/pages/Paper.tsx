import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/useLanguage";

// Mock data
const paperData = {
  id: "1",
  title: "Decentralized AI Research: Challenges and Opportunities",
  content: "This paper explores the emerging field of decentralized AI...",
  paragraphs: [
    { id: 1, text: "Introduction to Decentralized AI" },
    { id: 2, text: "Current Challenges in Centralized AI" },
    { id: 3, text: "Blockchain Solutions for AI" },
    { id: 4, text: "Case Studies" },
    { id: 5, text: "Future Directions" },
  ],
};

const aiSummaries = [
  {
    paragraphId: 1,
    summary: "Introduces concept of decentralized AI",
    explanation: "This section defines what decentralized AI means and its core principles...",
  },
  {
    paragraphId: 2,
    summary: "Discusses limitations of current AI systems",
    explanation: "Centralized AI faces issues like data silos, single points of failure...",
  },
  {
    paragraphId: 3,
    summary: "Proposes blockchain integration",
    explanation: "Blockchain can provide trustless coordination, data provenance...",
  },
  {
    paragraphId: 4,
    summary: "Presents real-world implementations",
    explanation: "Examples include federated learning systems and decentralized data markets...",
  },
  {
    paragraphId: 5,
    summary: "Outlines research opportunities",
    explanation: "Areas like privacy-preserving ML and incentive mechanisms need further work...",
  },
];

const semanticGraph = {
  nodes: [
    { id: "decentralized", label: "Decentralized AI" },
    { id: "blockchain", label: "Blockchain" },
    { id: "privacy", label: "Privacy" },
    { id: "scalability", label: "Scalability" },
    { id: "governance", label: "Governance" },
  ],
  links: [
    { source: "decentralized", target: "blockchain" },
    { source: "decentralized", target: "privacy" },
    { source: "decentralized", target: "scalability" },
    { source: "blockchain", target: "governance" },
  ],
};

export default function Paper() {
  const { t } = useLanguage();
  const [activeParagraph, setActiveParagraph] = useState(1);
  const [viewMode, setViewMode] = useState<"summary" | "explanation">("summary");
  const [citationFormat, setCitationFormat] = useState<"bibtex" | "apa">("bibtex");
  const paragraphRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToParagraph = (id: number) => {
    setActiveParagraph(id);
    paragraphRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const generateCitation = () => {
    if (citationFormat === "bibtex") {
      return `@article{decentralizedAI2025,
  title = {${paperData.title}},
  author = {Author, A. and Coauthor, B.},
  journal = {Journal of Decentralized Science},
  year = {2025},
  url = {https://decentral.science/paper/1}
}`;
    } else {
      return `Author, A., & Coauthor, B. (2025). ${paperData.title}. Journal of Decentralized Science. https://decentral.science/paper/1`;
    }
  };

  const copyCitation = () => {
    navigator.clipboard.writeText(generateCitation());
    toast.success("Citation copied to clipboard!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A] text-white">
      <ParticlesBackground />

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row p-6 gap-6">
        {/* Left Panel - PDF Viewer */}
        <div className="flex-1 bg-[#0F172A]/50 backdrop-blur-md rounded-xl border border-[#00F0FF]/20 p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6 text-[#00F0FF]">{paperData.title}</h2>

          <div className="space-y-6">
            {paperData.paragraphs.map((para) => (
              <div key={para.id} ref={(el) => (paragraphRefs.current[para.id] = el)} className={`p-4 rounded-lg transition-all duration-300 ${activeParagraph === para.id ? "bg-[#00F0FF]/10 border-l-4 border-[#00F0FF]" : "bg-[#0F172A]/30 hover:bg-[#00F0FF]/5"}`}>
                <div className="flex items-start gap-3">
                  <button onClick={() => scrollToParagraph(para.id)} className={`w-8 h-8 flex items-center justify-center rounded-full ${activeParagraph === para.id ? "bg-[#00F0FF] text-[#0F172A]" : "bg-[#0F172A] border border-[#00F0FF]/50 text-[#00F0FF]"} font-bold`}>
                    {para.id}
                  </button>
                  <p className="flex-1">{para.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - AI Tools */}
        <div className="w-full lg:w-96 xl:w-[28rem] flex flex-col gap-6">
          {/* AI Summary Panel */}
          <div className="bg-[#0F172A]/50 backdrop-blur-md rounded-xl border border-[#00F0FF]/20 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#00F0FF]">AI Insights</h3>
              <div className="flex gap-2">
                <button onClick={() => setViewMode("summary")} className={`px-3 py-1 rounded-full text-sm ${viewMode === "summary" ? "bg-[#00F0FF] text-[#0F172A]" : "bg-[#0F172A] border border-[#00F0FF]/50 text-[#00F0FF]"}`}>
                  Summary
                </button>
                <button onClick={() => setViewMode("explanation")} className={`px-3 py-1 rounded-full text-sm ${viewMode === "explanation" ? "bg-[#00F0FF] text-[#0F172A]" : "bg-[#0F172A] border border-[#00F0FF]/50 text-[#00F0FF]"}`}>
                  Explanation
                </button>
              </div>
            </div>

            <div className="min-h-40 p-4 bg-[#0F172A]/30 rounded-lg">
              <AnimatePresence mode="wait">
                <motion.div key={viewMode} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                  {viewMode === "summary" ? <p>{aiSummaries.find((s) => s.paragraphId === activeParagraph)?.summary}</p> : <p>{aiSummaries.find((s) => s.paragraphId === activeParagraph)?.explanation}</p>}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Citation Generator */}
          <div className="bg-[#0F172A]/50 backdrop-blur-md rounded-xl border border-[#00F0FF]/20 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#00F0FF]">Citation</h3>
              <div className="flex gap-2">
                <button onClick={() => setCitationFormat("bibtex")} className={`px-3 py-1 rounded-full text-sm ${citationFormat === "bibtex" ? "bg-[#00F0FF] text-[#0F172A]" : "bg-[#0F172A] border border-[#00F0FF]/50 text-[#00F0FF]"}`}>
                  BibTeX
                </button>
                <button onClick={() => setCitationFormat("apa")} className={`px-3 py-1 rounded-full text-sm ${citationFormat === "apa" ? "bg-[#00F0FF] text-[#0F172A]" : "bg-[#0F172A] border border-[#00F0FF]/50 text-[#00F0FF]"}`}>
                  APA
                </button>
              </div>
            </div>

            <div className="p-4 bg-[#0F172A]/30 rounded-lg mb-4">
              <pre className="text-sm whitespace-pre-wrap">{generateCitation()}</pre>
            </div>

            <button onClick={copyCitation} className="w-full py-2 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#00F0FF]/70 text-[#0F172A] font-medium flex items-center justify-center gap-2">
              <i className="fa-solid fa-copy"></i>
              <span>Copy Citation</span>
            </button>
          </div>

          {/* Semantic Graph */}
          <div className="bg-[#0F172A]/50 backdrop-blur-md rounded-xl border border-[#00F0FF]/20 p-6">
            <h3 className="text-xl font-bold text-[#00F0FF] mb-4">Semantic Graph</h3>
            <div className="h-64 bg-[#0F172A]/30 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <i className="fa-solid fa-diagram-project text-4xl text-[#00F0FF]/50 mb-2"></i>
                <p className="text-[#00F0FF]/70">Visualization of key concepts and relationships</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
