"use client";

import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

export default function AvatarGreeting() {
  return (
    <div className="flex items-center space-x-4" suppressHydrationWarning>
      {/* Avatar placeholder - can be replaced with an actual image */}
      <motion.div
        className="w-16 h-16 rounded-full bg-teal-900/60 border-2 border-teal-500/50 flex items-center justify-center text-2xl shadow-lg relative overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        suppressHydrationWarning
      >
        <div className="z-10" suppressHydrationWarning>
          🧠
        </div>

        {/* Scanning effect */}
        <motion.div
          className="absolute top-0 left-0 h-full w-full bg-teal-400/20"
          animate={{
            y: ["0%", "100%", "0%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          suppressHydrationWarning
        />
      </motion.div>

      <div suppressHydrationWarning>
        <div className="text-xs text-teal-400 mb-1" suppressHydrationWarning>
          SYSTEM STATUS
        </div>
        <div className="text-2xl flex" suppressHydrationWarning>
          <span className="mr-2">▶</span>
          <Typewriter
            words={[
              "System Online.",
              "Mission Control Activated.",
              "Standing By.",
            ]}
            loop={1}
            cursor
            cursorStyle="_"
            typeSpeed={60}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </div>
      </div>
    </div>
  );
}
