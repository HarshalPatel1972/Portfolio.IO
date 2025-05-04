"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectsModal from "./ProjectsModal";
import VisorModal from "./VisorModal";

export default function LiveStats() {
  // In a real app, these values could be fetched from an API
  const stats = {
    projects: 10,
    mission: "Attiro",
  };

  // Modal state
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);
  const [isVisorModalOpen, setIsVisorModalOpen] = useState(false);
  const [hoveredTile, setHoveredTile] = useState<string | null>(null);

  return (
    <>
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
        suppressHydrationWarning
      >
        <motion.div
          className="bg-gray-900 bg-opacity-70 p-4 rounded-xl shadow-lg border border-teal-900/50 cursor-pointer relative"
          whileHover={{
            scale: 1.03,
            boxShadow: "0 0 25px rgba(0, 255, 255, 0.7)",
          }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsProjectsModalOpen(true)}
          onMouseEnter={() => setHoveredTile("projects")}
          onMouseLeave={() => setHoveredTile(null)}
          suppressHydrationWarning
        >
          <div className="text-xs mb-1 text-teal-500" suppressHydrationWarning>
            PROJECTS
          </div>
          <div
            className="text-xl flex items-center justify-center"
            suppressHydrationWarning
          >
            <span className="mr-2">🛠️</span> {stats.projects}
          </div>

          {/* Info tooltip */}
          {hoveredTile === "projects" && (
            <motion.div
              className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-teal-300 text-xs px-3 py-1 rounded-md border border-teal-700/50 whitespace-nowrap z-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              suppressHydrationWarning
            >
              Click to view all projects
              <div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-gray-900 border-b border-r border-teal-700/50 rotate-45"
                suppressHydrationWarning
              ></div>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="bg-gray-900 bg-opacity-70 p-4 rounded-xl shadow-lg border border-teal-900/50 cursor-pointer"
          whileHover={{
            scale: 1.03,
            boxShadow: "0 0 25px rgba(0, 255, 255, 0.7)",
          }}
          onMouseEnter={() => setHoveredTile("mission")}
          onMouseLeave={() => setHoveredTile(null)}
          whileTap={{ scale: 0.98 }}
          suppressHydrationWarning
        >
          <div className="text-xs mb-1 text-teal-500" suppressHydrationWarning>
            MISSION
          </div>
          <div
            className="text-xl flex items-center justify-center"
            suppressHydrationWarning
          >
            <span className="mr-2" suppressHydrationWarning>
              🚀
            </span>{" "}
            {stats.mission}
          </div>

          {hoveredTile === "mission" && (
            <motion.div
              className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-teal-300 text-xs px-3 py-1 rounded-md border border-teal-700/50 whitespace-nowrap z-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              suppressHydrationWarning
            >
              Current active mission
              <div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-gray-900 border-b border-r border-teal-700/50 rotate-45"
                suppressHydrationWarning
              ></div>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="bg-gray-900 bg-opacity-70 p-4 rounded-xl shadow-lg border border-teal-900/50 cursor-pointer relative"
          whileHover={{
            scale: 1.03,
            boxShadow: "0 0 25px rgba(0, 255, 255, 0.7)",
          }}
          whileTap={{ scale: 0.98 }}
          onMouseEnter={() => setHoveredTile("visor")}
          onMouseLeave={() => setHoveredTile(null)}
          onClick={() => setIsVisorModalOpen(true)}
        >
          <div className="text-xs mb-1 text-teal-500">VISOR</div>
          <div className="text-xl flex items-center justify-center">
            <span className="mr-2">🧿</span> Intel On
          </div>

          {hoveredTile === "visor" && (
            <motion.div
              className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-teal-300 text-xs px-3 py-1 rounded-md border border-teal-700/50 whitespace-nowrap z-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Core Visual Scanner System
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-gray-900 border-b border-r border-teal-700/50 rotate-45"></div>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="bg-gray-900 bg-opacity-70 p-4 rounded-xl shadow-lg border border-teal-900/50 cursor-pointer relative"
          whileHover={{
            scale: 1.03,
            boxShadow: "0 0 25px rgba(0, 255, 255, 0.7)",
          }}
          whileTap={{ scale: 0.98 }}
          onMouseEnter={() => setHoveredTile("candy")}
          onMouseLeave={() => setHoveredTile(null)}
          onClick={() => {
            /* TODO: open chatbot interface */
          }}
        >
          <div className="text-xs mb-1 text-teal-500">CANDY</div>
          <div className="text-xl flex items-center justify-center">
            <span className="mr-2">🤖</span> Say Hello
          </div>

          {hoveredTile === "candy" && (
            <motion.div
              className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-teal-300 text-xs px-3 py-1 rounded-md border border-teal-700/50 whitespace-nowrap z-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Conversational AI for Navigation and Data Yield
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-gray-900 border-b border-r border-teal-700/50 rotate-45"></div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Projects Modal */}
      <ProjectsModal
        isOpen={isProjectsModalOpen}
        onClose={() => setIsProjectsModalOpen(false)}
      />
      {/* Visor Modal */}
      <VisorModal
        isOpen={isVisorModalOpen}
        onClose={() => setIsVisorModalOpen(false)}
      />
    </>
  );
}
