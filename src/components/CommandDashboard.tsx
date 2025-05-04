"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import ConsoleNav from "./ConsoleNav";
import StatusFeed from "./StatusFeed";
import LiveStats from "./LiveStats";
import AvatarGreeting from "./AvatarGreeting";
import CommandInput from "./CommandInput";

export default function CommandDashboard() {
  // Apply a global class to body for the dashboard background styling
  useEffect(() => {
    document.body.classList.add("dashboard-active");
    return () => {
      document.body.classList.remove("dashboard-active");
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-black text-green-400 p-4 font-mono relative overflow-hidden"
      suppressHydrationWarning
    >
      {/* Background grid pattern - added via CSS */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-20 z-0"
        suppressHydrationWarning
      />

      {/* Command Room Content */}
      <div
        className="relative z-10 container mx-auto max-w-6xl space-y-8 py-4"
        suppressHydrationWarning
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          suppressHydrationWarning
        >
          <AvatarGreeting />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          suppressHydrationWarning
        >
          <LiveStats />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          suppressHydrationWarning
        >
          <ConsoleNav />
        </motion.div>

        {/*
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          suppressHydrationWarning
        >
          <StatusFeed />
        </motion.div>
        */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          suppressHydrationWarning
        >
          <CommandInput />
        </motion.div>
      </div>
    </div>
  );
}
