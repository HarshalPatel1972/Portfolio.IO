"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ProjectsModal from "./ProjectsModal";
import CommLinkModal from "./CommLinkModal";
import ArchivesModal from "./ArchivesModal";
import SystemLogsModal from "./SystemLogsModal";

// Enhanced with descriptions and icons
const navItems = [
  {
    name: "Missions",
    href: "/projects",
    icon: "🚀",
    description: "View current and completed mission objectives",
    soundEffect: "/sounds/click1.mp3", // These would need to be added to the public folder
  },
  {
    name: "Comm Link",
    href: "/contact",
    icon: "📡",
    description: "Open communication channels",
    soundEffect: "/sounds/click2.mp3",
  },
  {
    name: "Archives",
    href: "/blogs",
    icon: "📂",
    description: "Access historical records and documentation",
    soundEffect: "/sounds/click3.mp3",
  },
  {
    name: "System Logs",
    href: "/resume",
    icon: "📊",
    description: "Review system performance and activity",
    soundEffect: "/sounds/click4.mp3",
  },
];

export default function ConsoleNav() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [tooltipIndex, setTooltipIndex] = useState<number | null>(null);
  const [activeSound, setActiveSound] = useState<string | null>(null);

  // Modal states
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Handle click on nav items - opens modal
  const handleNavClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default navigation

    // Play sound effect if supported
    if (navItems[index].soundEffect) {
      setActiveSound(navItems[index].soundEffect);
    }

    // Open the corresponding modal
    setActiveModal(navItems[index].name);
  };

  // Close all modals
  const closeModals = () => {
    setActiveModal(null);
  };

  return (
    <>
      <div
        suppressHydrationWarning
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative"
      >
        {navItems.map((item, index) => (
          <Link
            key={item.name}
            href={item.href}
            className="block relative group"
            onMouseEnter={() => {
              setHoverIndex(index);
              setTooltipIndex(index);
            }}
            onMouseLeave={() => {
              setHoverIndex(null);
              setTooltipIndex(null);
            }}
            onClick={(e) => handleNavClick(index, e)}
          >
            <motion.div
              className="bg-teal-900/40 hover:bg-teal-800/60 text-white text-center p-4 rounded-xl border border-teal-700/50 glow transition-all duration-300 h-full flex flex-col items-center justify-center cursor-pointer"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(0, 255, 255, 0.8)",
              }}
              whileTap={{ scale: 0.98 }}
              animate={{
                boxShadow:
                  hoverIndex === index
                    ? "0 0 25px rgba(0, 255, 255, 0.7)"
                    : "0 0 10px rgba(0, 255, 255, 0.3)",
              }}
            >
              <div suppressHydrationWarning className="text-2xl mb-2">
                {item.icon}
              </div>
              <div suppressHydrationWarning className="font-bold">
                {item.name}
              </div>

              {/* Tech-looking decorative elements */}
              <div className="absolute bottom-2 left-2 w-2 h-2 bg-teal-400 rounded-full opacity-60"></div>
              <div className="absolute top-2 right-2 w-2 h-2 bg-teal-400 rounded-full opacity-60"></div>

              {/* Show "connecting" on hover */}
              {hoverIndex === index && (
                <motion.div
                  className="absolute bottom-2 right-2 text-xs text-teal-300 opacity-80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  connecting...
                </motion.div>
              )}

              {/* Tooltip */}
              {tooltipIndex === index && (
                <motion.div
                  className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/90 text-teal-300 text-xs px-3 py-2 rounded-md border border-teal-700/50 whitespace-nowrap z-10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {item.description}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-gray-900/90 border-b border-r border-teal-700/50 rotate-45"></div>
                </motion.div>
              )}
            </motion.div>
          </Link>
        ))}

        {/* Sound effect player (hidden) */}
        {activeSound && (
          <audio
            src={activeSound}
            autoPlay
            onEnded={() => setActiveSound(null)}
            style={{ display: "none" }}
          />
        )}
      </div>

      {/* Modal Components */}
      <ProjectsModal
        isOpen={activeModal === "Missions"}
        onClose={closeModals}
      />
      <CommLinkModal
        isOpen={activeModal === "Comm Link"}
        onClose={closeModals}
      />
      <ArchivesModal
        isOpen={activeModal === "Archives"}
        onClose={closeModals}
      />
      <SystemLogsModal
        isOpen={activeModal === "System Logs"}
        onClose={closeModals}
      />
    </>
  );
}
