"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Sample project data
const sampleProjects = [
  {
    id: 1,
    name: "Sitara",
    status: "deployed",
    lastUpdated: "2024-10-11T16:00:00Z",
    priority: "high",
  },
  {
    id: 2,
    name: "MedChain Authenticator",
    status: "in progress",
    lastUpdated: "2025-02-26T15:45:00Z",
    priority: "high",
  },
  {
    id: 3,
    name: "Attiro",
    status: "in progress",
    lastUpdated: "2025-04-09T18:30:00Z",
    priority: "high",
  },
  {
    id: 4,
    name: "Live Captions Research",
    status: "in progress",
    lastUpdated: "2025-01-18T09:15:00Z",
    priority: "medium",
  },
  {
    id: 5,
    name: "FraudFence (Voice Fraud Detection)",
    status: "planning",
    lastUpdated: "2025-04-17T11:00:00Z",
    priority: "medium",
  },
  {
    id: 6,
    name: "WiFi Merger",
    status: "planning",
    lastUpdated: "2025-04-20T10:00:00Z",
    priority: "medium",
  },
  {
    id: 7,
    name: "HealthView",
    status: "deployed",
    lastUpdated: "2025-04-20T10:30:00Z",
    priority: "high",
  },
  {
    id: 8,
    name: "Handwritten Digit Recognition",
    status: "deployed",
    lastUpdated: "2023-04-19T10:00:00Z",
    priority: "low",
  },
  {
    id: 9,
    name: "Music Plagiarism Detection",
    status: "deployed",
    lastUpdated: "2023-09-10T10:00:00Z",
    priority: "medium",
  },
  {
    id: 10,
    name: "TheVSGame",
    status: "deployed",
    lastUpdated: "2025-01-12T10:00:00Z",
    priority: "medium",
  },
];

// Get status color based on project status
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "deployed":
      return "bg-green-500";
    case "in progress":
      return "bg-blue-500";
    case "planning":
      return "bg-yellow-500";
    case "in testing":
      return "bg-purple-500";
    default:
      return "bg-gray-500";
  }
};

// Format date in a more readable way
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectsModal({ isOpen, onClose }: ProjectsModalProps) {
  const [filter, setFilter] = useState("all");

  // Filter projects based on current filter
  const filteredProjects =
    filter === "all"
      ? sampleProjects
      : sampleProjects.filter((project) => project.status === filter);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-gray-900/95 border border-teal-700/50 rounded-xl w-full max-w-4xl max-h-[80vh] overflow-hidden shadow-xl glow"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-teal-900/50">
              <h3 className="text-xl text-teal-400 font-mono flex items-center">
                <span className="mr-2">🚀</span> MISSION CONTROL
              </h3>

              <div className="flex gap-2">
                <select
                  className="bg-gray-800 text-teal-300 border border-teal-700/50 rounded px-2 py-1 text-sm"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Projects</option>
                  <option value="deployed">Deployed</option>
                  <option value="in progress">In Progress</option>
                  <option value="in testing">In Testing</option>
                  <option value="planning">Planning</option>
                </select>

                <button
                  className="bg-gray-800 hover:bg-gray-700 text-teal-300 rounded-full w-8 h-8 flex items-center justify-center"
                  onClick={onClose}
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-4 overflow-y-auto max-h-[calc(80vh-70px)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    className="bg-gray-800/70 rounded-lg p-4 border border-teal-900/30 hover:border-teal-700/50 transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="text-white font-bold">{project.name}</h4>
                      <div
                        className={`${getStatusColor(
                          project.status
                        )} rounded-full px-2 py-0.5 text-xs text-white`}
                      >
                        {project.status}
                      </div>
                    </div>

                    <div className="mt-2 text-gray-400 text-xs">
                      Priority:{" "}
                      <span
                        className={`font-bold ${
                          project.priority === "critical"
                            ? "text-red-400"
                            : project.priority === "high"
                            ? "text-orange-400"
                            : project.priority === "medium"
                            ? "text-yellow-400"
                            : "text-blue-400"
                        }`}
                      >
                        {project.priority}
                      </span>
                    </div>

                    <div className="mt-2 flex justify-between items-center">
                      <div className="text-xs text-gray-400">
                        Updated: {formatDate(project.lastUpdated)}
                      </div>

                      <button className="text-teal-400 hover:text-teal-300 text-xs">
                        Details →
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-teal-900/50 flex justify-between items-center">
              <div className="text-sm text-teal-400">
                Showing {filteredProjects.length} of {sampleProjects.length}{" "}
                projects
              </div>

              <button
                className="bg-teal-700 hover:bg-teal-600 text-white px-3 py-1 rounded text-sm"
                onClick={onClose}
              >
                Close Console
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
