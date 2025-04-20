"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface IdentityBadgeProps {
  name?: string;
  titles?: string[];
  mission?: string;
  position?: "top-left" | "top-center" | "top-right";
}

const IdentityBadge: React.FC<IdentityBadgeProps> = ({
  name = "HEATHER",
  titles = ["Software Engineer", "Web & AI Developer", "Blockchain Enthusiast"],
  mission = "Build & Innovate Beyond Earth",
  position = "top-left",
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Check screen size for responsive design
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Animate badge on mount with slight delay for dramatic effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Position classes based on prop
  const positionClasses = {
    "top-left": "top-4 left-4 sm:left-6",
    "top-center": "top-4 left-1/2 transform -translate-x-1/2",
    "top-right": "top-4 right-4 sm:right-6",
  };

  // Format titles based on screen size
  const formattedTitles = isMobile
    ? titles.map((title) => {
        // Shorten titles on mobile
        return title
          .replace("Software Engineer", "SW Engineer")
          .replace("Developer", "Dev")
          .replace("Enthusiast", "Specialist");
      })
    : titles;

  return (
    <motion.div
      className={`fixed z-50 ${positionClasses[position]}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <div className="bg-[#0f0f0f]/90 border border-green-400/70 text-green-300 px-4 py-2 rounded-xl shadow-lg shadow-green-500/20">
        <div className="flex items-center">
          {/* Blinking status indicator */}
          <div className="mr-2 relative">
            <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
            <div className="absolute inset-0 h-2.5 w-2.5 rounded-full bg-green-400 animate-ping opacity-75"></div>
          </div>

          {/* Name and titles */}
          <div>
            <div className="font-bold tracking-widest text-sm">
              {isMobile ? `👤 ${name.charAt(0)}` : `👤 ${name}`}
            </div>

            <div className="text-xs tracking-wide text-green-400/90 whitespace-nowrap">
              {isMobile ? (
                // Mobile version - more compact
                <>🎯 {formattedTitles.join(" · ")}</>
              ) : (
                // Desktop version - full titles
                <>🎯 {formattedTitles.join(" · ")}</>
              )}
            </div>

            {!isMobile && (
              <div className="text-xs tracking-wide text-green-400/70 mt-1">
                🎖️ Mission: {mission}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default IdentityBadge;
