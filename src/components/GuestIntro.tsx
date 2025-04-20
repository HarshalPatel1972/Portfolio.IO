"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TerminalText from "./TerminalText";

interface GuestIntroProps {
  onComplete: () => void; // Callback when intro finishes
}

const GuestIntro: React.FC<GuestIntroProps> = ({ onComplete }) => {
  const [showTerminal, setShowTerminal] = useState(true);

  const handleTerminalFinish = () => {
    // Optional: Add a small delay or glitch effect here before hiding
    setTimeout(() => {
      setShowTerminal(false);
      onComplete(); // Signal that the intro is done
    }, 500); // Short delay before fading out
  };

  const guestLines = [
    "> Initializing Portfolio...",
    "> Accessing guest interface...",
    "> Welcome, Guest.",
  ];

  return (
    <AnimatePresence>
      {showTerminal && (
        <motion.div
          key="guest-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 bg-black flex items-center justify-center z-50 p-4"
        >
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TerminalText
              lines={guestLines}
              onFinish={handleTerminalFinish}
              speed={60}
              delaySpeed={1000}
            />

            {/* Optional Skip Button */}
            <div className="text-center mt-4">
              <button
                onClick={handleTerminalFinish}
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                Skip Intro
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GuestIntro;
