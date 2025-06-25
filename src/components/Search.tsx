import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Suggestion = {
  id: number;
  title: string;
};

export function Search() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const mockSuggestions: Suggestion[] = [
    { id: 1, title: "Decentralized AI Research" },
    { id: 2, title: "Web3 Storage Solutions" },
    { id: 3, title: "Tokenomics in Academia" },
    { id: 4, title: "Blockchain for Science" },
  ];

  useEffect(() => {
    if (query.length > 0) {
      const filtered = mockSuggestions.filter((s) =>
        s.title.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [query]);

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search knowledge..."
            className="w-full px-6 py-4 rounded-full bg-white/10 backdrop-blur-md border border-[#00F0FF]/30 text-white placeholder-[#00F0FF]/70 focus:outline-none focus:ring-2 focus:ring-[#00F0FF] hover:shadow-lg hover:shadow-[#00F0FF]/20 transition-all"
          />
          <i className="fa-solid fa-magnifying-glass absolute right-6 top-1/2 -translate-y-1/2 text-[#00F0FF] animate-pulse"></i>
        </motion.div>
      </div>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-[#0F172A] rounded-xl shadow-lg overflow-hidden border border-[#00F0FF]/20"
          >
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="px-6 py-3 hover:bg-[#00F0FF]/10 cursor-pointer transition-colors"
                onClick={() => {
                  setQuery(suggestion.title);
                  setShowSuggestions(false);
                }}
              >
                {suggestion.title}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}