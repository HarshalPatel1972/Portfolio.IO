// New VisorModal component implementing the interactive VISOR panel
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Sample project data with categories
const sampleProjects = [
  {
    id: 1,
    name: "Sitara",
    status: "deployed",
    priority: "high",
    category: "Web Dev",
  },
  {
    id: 2,
    name: "MedChain Authenticator",
    status: "in progress",
    priority: "high",
    category: "Blockchain",
  },
  {
    id: 3,
    name: "Attiro",
    status: "in progress",
    priority: "high",
    category: "Design",
  },
  {
    id: 4,
    name: "Live Captions Research",
    status: "in progress",
    priority: "medium",
    category: "AI",
  },
  {
    id: 5,
    name: "FraudFence",
    status: "planning",
    priority: "medium",
    category: "AI",
  },
  {
    id: 6,
    name: "WiFi Merger",
    status: "planning",
    priority: "medium",
    category: "Web Dev",
  },
  {
    id: 7,
    name: "HealthView",
    status: "deployed",
    priority: "high",
    category: "AI",
  },
];
const categories = ["AI", "Web Dev", "Blockchain", "Design"];
const statuses = ["deployed", "in progress", "planning"];

interface VisorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VisorModal({ isOpen, onClose }: VisorModalProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(true);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setIsScanning(true);
      const timer = setTimeout(() => setIsScanning(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };
  const toggleStatus = (st: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(st) ? prev.filter((s) => s !== st) : [...prev, st]
    );
  };

  const filteredProjects = sampleProjects.filter((proj) => {
    const byCat = selectedCategories.length
      ? selectedCategories.includes(proj.category)
      : true;
    const byStatus = selectedStatuses.length
      ? selectedStatuses.includes(proj.status)
      : true;
    return byCat && byStatus;
  });
  const highlights = sampleProjects
    .filter((proj) => proj.priority === "high")
    .slice(0, 3);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="fixed right-0 top-0 h-full w-80 bg-gray-900/95 border-l border-teal-700/50 shadow-xl z-[10000] flex flex-col overflow-hidden"
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-teal-900/50">
              <h3 className="text-lg font-mono text-teal-400 flex items-center">
                <span className="mr-2 animate-pulse">🧿</span> VISOR
              </h3>
              <button
                aria-label="Close VISOR"
                onClick={onClose}
                className="text-teal-300 hover:text-teal-100"
              >
                ✕
              </button>
            </div>
            {isScanning ? (
              <div className="flex-1 flex items-center justify-center p-6 text-teal-300 font-mono animate-pulse">
                Scanning active modules…
              </div>
            ) : (
              <div className="p-4 overflow-y-auto">
                <div className="mb-4">
                  <h4 className="text-sm text-teal-300 mb-2 uppercase">
                    Categories
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => toggleCategory(cat)}
                        className={`px-2 py-1 text-xs rounded-full border transition-colors duration-200 ${
                          selectedCategories.includes(cat)
                            ? "bg-teal-500 text-gray-900"
                            : "border-teal-500 text-teal-300"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm text-teal-300 mb-2 uppercase">
                    Status
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {statuses.map((st) => (
                      <button
                        key={st}
                        onClick={() => toggleStatus(st)}
                        className={`px-2 py-1 text-xs rounded-full border transition-colors duration-200 ${
                          selectedStatuses.includes(st)
                            ? "bg-teal-500 text-gray-900"
                            : "border-teal-500 text-teal-300"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm text-teal-300 mb-2 uppercase">
                    AI Highlights
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {(filteredProjects.length
                      ? filteredProjects
                      : highlights
                    ).map((proj) => (
                      <div
                        key={proj.id}
                        className="bg-gray-800 p-3 rounded-md border border-teal-700/50 flex flex-col gap-1"
                      >
                        <span className="text-sm text-teal-300 uppercase">
                          {proj.category}
                        </span>
                        <span className="font-mono text-base text-white">
                          {proj.name}
                        </span>
                        <span className="text-xs text-teal-200">
                          {proj.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
