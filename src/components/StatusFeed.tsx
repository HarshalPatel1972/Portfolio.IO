"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Improved timestamp formatting with date and timezone
const formatTimestamp = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");

  const day = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const year = now.getFullYear();

  // Get timezone abbreviation
  const timezone =
    new Intl.DateTimeFormat("en", { timeZoneName: "short" })
      .formatToParts(now)
      .find((part) => part.type === "timeZoneName")?.value || "UTC";

  return `[${hours}:${minutes} | ${year}-${month}-${day} | ${timezone}]`;
};

export default function StatusFeed() {
  // Log container ref for auto-scrolling
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Initial logs with improved timestamps
  const [logs, setLogs] = useState<string[]>([
    `${formatTimestamp()} Deployed Attiro module`,
    `${formatTimestamp()} GitHub push: 'finalize SmartStock'`,
    `${formatTimestamp()} Listening to: Ocean Eyes - Billie Eilish`,
    `${formatTimestamp()} System calibration complete`,
    `${formatTimestamp()} Security protocols updated`,
    `${formatTimestamp()} Initialized project diagnostics`,
  ]);

  // For animation effects
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);

  // Gradually reveal logs for a "booting up" effect
  useEffect(() => {
    const revealInterval = setInterval(() => {
      if (displayedLogs.length < logs.length) {
        setDisplayedLogs((prev) => [...prev, logs[displayedLogs.length]]);
      } else {
        clearInterval(revealInterval);
      }
    }, 300); // Add a new log every 300ms

    return () => clearInterval(revealInterval);
  }, [logs, displayedLogs]);

  // Add a new random log every 10 seconds
  useEffect(() => {
    const possibleNewLogs = [
      `System diagnostics: all clear`,
      `Memory optimization completed`,
      `Connected to satellite uplink`,
      `Analyzing code patterns`,
      `Neural patterns stabilized`,
      `Initiating security scan`,
      `Server status check: OK`,
      `System uptime: 342 hours`,
      `Backup process completed`,
      `Network traffic optimized`,
    ];

    const interval = setInterval(() => {
      const randomLog = `${formatTimestamp()} ${
        possibleNewLogs[Math.floor(Math.random() * possibleNewLogs.length)]
      }`;
      setLogs((prev) => [randomLog, ...prev.slice(0, 9)]); // Keep only the latest 10 logs
      setDisplayedLogs((prev) => [randomLog, ...prev.slice(0, 9)]);
    }, 10000); // Add new log every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to the latest log
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = 0; // Scroll to top since new logs are added at the top
    }
  }, [displayedLogs]);

  return (
    <div className="relative">
      <div
        className="bg-gray-900/80 p-4 rounded-xl h-48 overflow-y-auto font-mono text-sm shadow-inner border border-teal-900/50 glow-subtle"
        ref={logContainerRef}
      >
        <div className="text-xs uppercase mb-2 text-teal-500 flex justify-between">
          <span>System Activity</span>
          <span>Live Feed</span>
        </div>

        <AnimatePresence>
          {displayedLogs.map((log, index) => (
            <motion.div
              key={`${log}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-1 py-1 border-b border-gray-800/50"
            >
              {log}
              {index === 0 && (
                <span className="ml-1 text-green-500 animate-pulse">▋</span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Animated indicator that new logs are appearing */}
      <motion.div
        className="absolute bottom-2 right-2 w-6 h-6 bg-teal-900/60 rounded-full flex items-center justify-center"
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
      </motion.div>
    </div>
  );
}
