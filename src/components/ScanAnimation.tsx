"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import Lottie from 'lottie-react'; // Uncomment if using Lottie
// import scannerAnimation from '../public/animations/scanner.json'; // Path to your Lottie JSON

interface ScanAnimationProps {
  onComplete: () => void;
}

const ScanAnimation: React.FC<ScanAnimationProps> = ({ onComplete }) => {
  const [status, setStatus] = useState("Scanning...");
  const [showScan, setShowScan] = useState(true);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStatus("Identity Verified.");
    }, 2000); // Simulate scanning time

    const timer2 = setTimeout(() => {
      setStatus("Access Granted.");
    }, 3500); // Time before showing granted

    const timer3 = setTimeout(() => {
      setShowScan(false);
      onComplete(); // Trigger completion callback
    }, 5000); // Total animation time before calling onComplete

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {showScan && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50"
        >
          {/* Placeholder for Lottie/SVG Scanner Animation */}
          <motion.div
            className="w-40 h-40 border-4 border-cyan-400 rounded-full relative mb-8 overflow-hidden"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            {/* Scan line */}
            <motion.div
              className="absolute top-0 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_10px_#0ff]"
              initial={{ y: 0 }}
              animate={{ y: "100%" }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Status Text */}
          <motion.p
            key={status} // Re-animate when status changes
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-cyan-400 text-xl"
          >
            {status}
          </motion.p>

          {/* Optional Beep Sound - requires sound file in /public/sounds/ */}
          {/* {status === 'Access Granted.' && (
            <audio src="/sounds/scan-beep.mp3" autoPlay />
          )} */}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScanAnimation;
