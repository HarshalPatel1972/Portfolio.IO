"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TerminalText from "./TerminalText";
import ScanAnimation from "./ScanAnimation";

interface LoggedInIntroProps {
  onComplete: () => void;
  userName?: string;
}

const LoggedInIntro: React.FC<LoggedInIntroProps> = ({
  onComplete,
  userName = "User", // Default name if none provided
}) => {
  const [showScanner, setShowScanner] = useState(false);
  const [showTerminal, setShowTerminal] = useState(true);

  const handleTerminalFinish = () => {
    setShowScanner(true);
  };

  const handleScannerComplete = () => {
    setShowTerminal(false);
    onComplete();
  };

  const welcomeLines = [
    `> Welcome back, ${userName}.`,
    "> Initiating visual authentication...",
  ];

  return (
    <AnimatePresence>
      {(showTerminal || showScanner) && (
        <motion.div
          key="logged-in-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 bg-black flex items-center justify-center z-50 p-4"
        >
          {/* Terminal Text */}
          {showTerminal && !showScanner && (
            <motion.div
              className="w-full max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <TerminalText
                lines={welcomeLines}
                onFinish={handleTerminalFinish}
                speed={60}
                delaySpeed={1000}
              />

              {/* Skip Button */}
              <div className="text-center mt-4">
                <button
                  onClick={() => onComplete()}
                  className="text-gray-500 hover:text-white text-sm transition-colors"
                >
                  Skip Intro
                </button>
              </div>
            </motion.div>
          )}

          {/* Scanner Animation */}
          {showScanner && <ScanAnimation onComplete={handleScannerComplete} />}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoggedInIntro;
