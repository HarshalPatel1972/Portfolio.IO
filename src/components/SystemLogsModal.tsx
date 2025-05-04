"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Sample system logs data
const systemLogsData = [
  // {
  //   id: 1,
  //   timestamp: "2025-04-20T10:15:23Z",
  //   category: "system",
  //   level: "info",
  //   message: "Portfolio system initialization complete",
  // },
  {
    id: 2,
    timestamp: "2025-04-20T10:15:24Z",
    category: "security",
    level: "info",
    message: "Authentication service started",
  },
  {
    id: 3,
    timestamp: "2025-04-20T10:15:25Z",
    category: "network",
    level: "info",
    message: "API endpoints registered successfully",
  },
  // {
  //   id: 4,
  //   timestamp: "2025-04-20T10:16:02Z",
  //   category: "system",
  //   level: "info",
  //   message: "Theme engine initialized with default settings",
  // },
  {
    id: 5,
    timestamp: "2025-04-20T10:16:15Z",
    category: "perf",
    level: "warning",
    message: "Resource allocation approaching threshold (82%)",
  },
  {
    id: 6,
    timestamp: "2025-04-20T10:17:30Z",
    category: "network",
    level: "error",
    message: "Failed to connect to external data source: timeout",
  },
  {
    id: 7,
    timestamp: "2025-04-20T10:17:45Z",
    category: "network",
    level: "info",
    message: "Retrying connection to external data source",
  },
  {
    id: 8,
    timestamp: "2025-04-20T10:17:58Z",
    category: "network",
    level: "info",
    message: "Connection established to external data source",
  },
  // {
  //   id: 9,
  //   timestamp: "2025-04-20T10:18:10Z",
  //   category: "system",
  //   level: "info",
  //   message: "Content synchronization started",
  // },
  // {
  //   id: 10,
  //   timestamp: "2025-04-20T10:18:45Z",
  //   category: "system",
  //   level: "info",
  //   message: "Content synchronization completed",
  // },
  {
    id: 11,
    timestamp: "2025-04-20T10:19:15Z",
    category: "security",
    level: "warning",
    message: "Multiple failed login attempts detected from IP 192.168.1.155",
  },
  {
    id: 12,
    timestamp: "2025-04-20T10:19:30Z",
    category: "security",
    level: "info",
    message: "IP 192.168.1.155 temporarily blocked for 10 minutes",
  },
  {
    id: 13,
    timestamp: "2025-04-20T10:20:05Z",
    category: "perf",
    level: "info",
    message: "Memory optimization routine executed",
  },
  {
    id: 14,
    timestamp: "2025-04-20T10:20:15Z",
    category: "perf",
    level: "info",
    message: "System performance optimization complete",
  },
  // {
  //   id: 15,
  //   timestamp: "2025-04-20T10:21:00Z",
  //   category: "system",
  //   level: "info",
  //   message: "Analytics data processed and cached",
  // },
  {
    id: 16,
    timestamp: "2025-04-20T10:21:30Z",
    category: "user",
    level: "info",
    message: "New visitor session started from location: New York, US",
  },
  {
    id: 17,
    timestamp: "2025-04-20T10:22:15Z",
    category: "user",
    level: "info",
    message: "Project section viewed for 45 seconds",
  },
  {
    id: 18,
    timestamp: "2025-04-20T10:23:00Z",
    category: "user",
    level: "info",
    message: "Contact form interaction detected",
  },
  {
    id: 19,
    timestamp: "2025-04-20T10:23:30Z",
    category: "user",
    level: "info",
    message: "Message submitted via contact form",
  },
  // {
  //   id: 20,
  //   timestamp: "2025-04-20T10:23:45Z",
  //   category: "system",
  //   level: "info",
  //   message: "Notification dispatched to admin channel",
  // },
];

interface SystemLogsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SystemLogsModal({
  isOpen,
  onClose,
}: SystemLogsModalProps) {
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [autoScroll, setAutoScroll] = useState<boolean>(true);

  // Simulated live logs by adding new logs periodically
  const [logs, setLogs] = useState(systemLogsData);

  useEffect(() => {
    if (!isOpen) return;

    // Simulate new log entries when modal is open
    const interval = setInterval(() => {
      const categories = ["system", "security", "network", "perf", "user"];
      const levels = ["info", "warning", "error"];
      const messages = [
        "Configuration updated",
        "Cache refreshed",
        "Network latency check completed",
        "User session extended",
        "Resource allocation optimized",
        "Scheduled maintenance notification sent",
      ];

      const newLog = {
        id: logs.length + 1,
        timestamp: new Date().toISOString(),
        category: categories[Math.floor(Math.random() * categories.length)],
        level: levels[Math.floor(Math.random() * levels.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
      };

      setLogs((prevLogs) => [...prevLogs, newLog]);
    }, 5000);

    return () => clearInterval(interval);
  }, [isOpen, logs.length]);

  useEffect(() => {
    // Auto-scroll to bottom when new logs are added
    if (autoScroll && isOpen) {
      const logContainer = document.getElementById("log-container");
      if (logContainer) {
        logContainer.scrollTop = logContainer.scrollHeight;
      }
    }
  }, [logs, autoScroll, isOpen]);

  const filteredLogs = logs
    .filter((log) => filter === "all" || log.category === filter)
    .filter(
      (log) =>
        searchTerm === "" ||
        log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                <span className="mr-2">📊</span> SYSTEM LOGS
              </h3>

              <div className="flex gap-2">
                <button
                  className="bg-gray-800 hover:bg-gray-700 text-teal-300 rounded-full w-8 h-8 flex items-center justify-center"
                  onClick={onClose}
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-4 border-b border-teal-900/30 flex justify-between">
              <div className="flex space-x-3">
                <button
                  className={`px-3 py-1 rounded text-sm ${
                    filter === "all"
                      ? "bg-teal-700/50 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                  onClick={() => setFilter("all")}
                >
                  All
                </button>
                {["system", "security", "network", "perf", "user"].map(
                  (category) => (
                    <button
                      key={category}
                      className={`px-3 py-1 rounded text-sm ${
                        filter === category
                          ? "bg-teal-700/50 text-white"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                      onClick={() => setFilter(category)}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  )
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={autoScroll}
                  onChange={() => setAutoScroll(!autoScroll)}
                  id="auto-scroll"
                  className="mr-2"
                />
                <label htmlFor="auto-scroll" className="text-gray-300 text-sm">
                  Auto-scroll
                </label>
              </div>
            </div>

            <div className="p-4 border-b border-teal-900/30">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-800 border border-teal-900/50 rounded-md px-4 py-2 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                />
                <span className="absolute left-3 top-2.5 text-gray-400">
                  🔍
                </span>
              </div>
            </div>

            <div
              id="log-container"
              className="h-[calc(80vh-220px)] overflow-y-auto font-mono text-sm"
            >
              <table className="w-full">
                <thead className="bg-gray-800 sticky top-0">
                  <tr className="text-left">
                    <th className="p-3 text-teal-400">Time</th>
                    <th className="p-3 text-teal-400">Category</th>
                    <th className="p-3 text-teal-400">Level</th>
                    <th className="p-3 text-teal-400">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log) => {
                    // Format timestamp
                    const date = new Date(log.timestamp);
                    const formattedTime = `${date
                      .getHours()
                      .toString()
                      .padStart(2, "0")}:${date
                      .getMinutes()
                      .toString()
                      .padStart(2, "0")}:${date
                      .getSeconds()
                      .toString()
                      .padStart(2, "0")}`;

                    // Determine row styling by log level
                    let rowClass =
                      "border-b border-gray-800/50 hover:bg-gray-800/50";
                    let levelClass = "text-green-400"; // Default for info

                    if (log.level === "warning") {
                      levelClass = "text-yellow-400";
                    } else if (log.level === "error") {
                      levelClass = "text-red-400";
                      rowClass += " bg-red-900/10";
                    }

                    return (
                      <motion.tr
                        key={log.id}
                        className={rowClass}
                        initial={{
                          opacity: 0,
                          backgroundColor: "rgba(20, 184, 166, 0.2)",
                        }}
                        animate={{
                          opacity: 1,
                          backgroundColor: "rgba(0, 0, 0, 0)",
                        }}
                        transition={{ duration: 2 }}
                      >
                        <td className="p-2 pl-3 text-gray-400">
                          {formattedTime}
                        </td>
                        <td className="p-2">
                          <span className="px-2 py-1 rounded-md bg-gray-800 text-gray-300 text-xs">
                            {log.category}
                          </span>
                        </td>
                        <td className={`p-2 ${levelClass}`}>{log.level}</td>
                        <td className="p-2 text-gray-300">{log.message}</td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-3 border-t border-teal-900/50 flex justify-between items-center">
              <div className="text-sm text-gray-400">
                <span className="text-teal-400">{filteredLogs.length}</span>{" "}
                logs displayed •
                <span className="text-teal-400 ml-2">{logs.length}</span> total
                entries
              </div>

              <div>
                <button
                  className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm mr-2"
                  onClick={() => setLogs(systemLogsData)}
                >
                  Reset Logs
                </button>
                <button
                  className="bg-teal-700 hover:bg-teal-600 text-white px-3 py-1 rounded text-sm"
                  onClick={onClose}
                >
                  Close Terminal
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
