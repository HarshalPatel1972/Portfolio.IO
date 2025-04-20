"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Custom hook for typewriter effect
const useTypewriter = (text: string, speed = 50) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!text) return;

    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText;
};

// Type definitions
type OutputLineType = "input" | "response" | "error" | "launch";

interface OutputLine {
  key: string; // Use string keys for more uniqueness
  type: OutputLineType;
  text: string;
}

const CommandInput = () => {
  const [command, setCommand] = useState("");
  const [outputLines, setOutputLines] = useState<OutputLine[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyCursor, setHistoryCursor] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchText, setLaunchText] = useState("");

  // Refs
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sound support flag to prevent errors
  const [soundsLoaded, setSoundsLoaded] = useState(false);

  // Valid commands list
  const validCommands = [
    "help",
    "clear",
    "status",
    "version",
    "about",
    "launch",
    "launch attiro",
    "launch neural",
    "launch clove",
    "launch quantum",
    "whoami",
    "connect",
    "connect github",
    "connect linkedin",
    "connect leetcode",
    "connect email",
    "connect resume",
    "profile.view",
  ];

  // Animated typed launch text
  const typedLaunchText = useTypewriter(launchText, 40);

  // Create a unique key for output lines
  const generateUniqueKey = useCallback(() => {
    return `line_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Initialize audio elements with sound support check
  useEffect(() => {
    let keySoundElem: HTMLAudioElement | null = null;
    let enterSoundElem: HTMLAudioElement | null = null;
    let errorSoundElem: HTMLAudioElement | null = null;

    try {
      keySoundElem = new Audio("/sounds/keypress.mp3");
      keySoundElem.volume = 0.2;

      enterSoundElem = new Audio("/sounds/enter.mp3");
      enterSoundElem.volume = 0.3;

      errorSoundElem = new Audio("/sounds/error.mp3");
      errorSoundElem.volume = 0.4;

      // Preload sounds silently
      keySoundElem.preload = "auto";
      enterSoundElem.preload = "auto";
      errorSoundElem.preload = "auto";

      // Set the sound loaded flag to true only if successful
      setSoundsLoaded(true);
    } catch (error) {
      console.error("Sound initialization error:", error);
      setSoundsLoaded(false);
    }

    // Add introductory message
    setOutputLines([
      {
        key: generateUniqueKey(),
        type: "response",
        text: 'Terminal ready. Type "help" for available commands.',
      },
    ]);

    // Clean up function
    return () => {
      if (keySoundElem) keySoundElem = null;
      if (enterSoundElem) enterSoundElem = null;
      if (errorSoundElem) errorSoundElem = null;
    };
  }, [generateUniqueKey]);

  // Scroll to bottom when output changes
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [outputLines]);

  // Filter command suggestions as user types
  useEffect(() => {
    if (command.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = validCommands.filter((cmd) =>
      cmd.toLowerCase().startsWith(command.toLowerCase())
    );

    setSuggestions(filtered);
    setSelectedSuggestion(0);
    setShowSuggestions(filtered.length > 0);
  }, [command]);

  // Play key sound effect - safely
  const playKeySound = useCallback(() => {
    if (!soundsLoaded) return;

    try {
      const sound = new Audio("/sounds/keypress.mp3");
      sound.volume = 0.2;
      sound.play().catch((e) => {
        console.warn("Error playing key sound:", e);
      });
    } catch (error) {
      console.warn("Could not play key sound", error);
    }
  }, [soundsLoaded]);

  // Play enter sound effect - safely
  const playEnterSound = useCallback(() => {
    if (!soundsLoaded) return;

    try {
      const sound = new Audio("/sounds/enter.mp3");
      sound.volume = 0.3;
      sound.play().catch((e) => {
        console.warn("Error playing enter sound:", e);
      });
    } catch (error) {
      console.warn("Could not play enter sound", error);
    }
  }, [soundsLoaded]);

  // Play error sound effect - safely
  const playErrorSound = useCallback(() => {
    if (!soundsLoaded) return;

    try {
      const sound = new Audio("/sounds/error.mp3");
      sound.volume = 0.4;
      sound.play().catch((e) => {
        console.warn("Error playing error sound:", e);
      });
    } catch (error) {
      console.warn("Could not play error sound", error);
    }
  }, [soundsLoaded]);

  // Handle command submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedCommand = command.trim();

    if (!trimmedCommand) return;

    playEnterSound();

    // Add command to output with unique key
    setOutputLines((prev) => [
      ...prev,
      { key: generateUniqueKey(), type: "input", text: trimmedCommand },
    ]);

    // Add to command history if not duplicate of last command
    if (commandHistory.length === 0 || commandHistory[0] !== trimmedCommand) {
      setCommandHistory((prev) => [trimmedCommand, ...prev]);
    }

    // Process command after slight delay for realism
    setTimeout(() => processCommand(trimmedCommand), 300);

    // Clear input and reset history cursor
    setCommand("");
    setHistoryCursor(-1);
    setShowSuggestions(false);
  };

  // Process different commands
  const processCommand = (cmd: string) => {
    const lowerCmd = cmd.toLowerCase().trim();

    // Check if it's a valid command or command prefix
    const isValid = validCommands.some(
      (valid) =>
        lowerCmd === valid ||
        (valid.includes(" ") && valid.split(" ")[0] === lowerCmd.split(" ")[0])
    );

    if (!isValid) {
      playErrorSound();
      setOutputLines((prev) => [
        ...prev,
        {
          key: generateUniqueKey(),
          type: "error",
          text: `ERROR: Unknown command "${cmd}"`,
        },
      ]);
      return;
    }

    // Process specific commands
    if (lowerCmd === "help") {
      setOutputLines((prev) => [
        ...prev,
        {
          key: generateUniqueKey(),
          type: "response",
          text: "Available commands:\n⦿ help - Show this help message\n⦿ clear - Clear terminal\n⦿ status - Check system status\n⦿ launch [mission] - Launch specified mission\n⦿ version - Show system version\n⦿ about - About this system\n⦿ whoami - Display user information\n⦿ connect [platform] - Connect to external platform\n⦿ profile.view - View user profile",
        },
      ]);
    } else if (lowerCmd === "clear") {
      setOutputLines([]);
    } else if (lowerCmd === "status") {
      setOutputLines((prev) => [
        ...prev,
        {
          key: generateUniqueKey(),
          type: "response",
          text: "All systems operational.\nCPU: 24% | Memory: 41% | Network: Stable\nLast backup: April 19, 2025 @ 08:42 UTC",
        },
      ]);
    } else if (lowerCmd === "version") {
      setOutputLines((prev) => [
        ...prev,
        {
          key: generateUniqueKey(),
          type: "response",
          text: "Portfolio OS v2.5.3 (Build 2025.04.19)",
        },
      ]);
    } else if (lowerCmd === "about") {
      setOutputLines((prev) => [
        ...prev,
        {
          key: generateUniqueKey(),
          type: "response",
          text: "Command Center - Interactive portfolio dashboard.\nBuild Date: April 19, 2025\nMaintainer: Portfolio Admin\nFramework: Next.js 15.3.1",
        },
      ]);
    } else if (lowerCmd === "whoami") {
      // Enhanced whoami with styled output
      setLaunchText("[System Access Granted]\n[Profile Loading...]");
      setIsLaunching(true);

      setTimeout(() => {
        setIsLaunching(false);
        setLaunchText("");

        setOutputLines((prev) => [
          ...prev,
          {
            key: generateUniqueKey(),
            type: "response",
            text: `[System Access Granted]
[Profile Loaded: Heather]
Title: Software Engineer | Web & AI Developer | Blockchain Innovator
Affiliations: Chandigarh University | Sitara | MedChain | Attiro
Mission Objective: To build, lead, and innovate in space-grade tech.
Access Level: 🔐 Top 1% Operator`,
          },
        ]);
      }, 2000);
    } else if (lowerCmd.startsWith("connect")) {
      const parts = lowerCmd.split(" ");

      if (parts.length === 1) {
        // Show available platforms to connect to
        setOutputLines((prev) => [
          ...prev,
          {
            key: generateUniqueKey(),
            type: "response",
            text: `Available platforms to connect to:
⦿ connect github - GitHub profile
⦿ connect linkedin - LinkedIn profile
⦿ connect leetcode - LeetCode profile
⦿ connect email - Contact via email
⦿ connect resume - View resume`,
          },
        ]);
      } else {
        const platform = parts[1].toLowerCase();
        let url = "";

        switch (platform) {
          case "github":
            url = "https://github.com/heatherdev";
            break;
          case "linkedin":
            url = "https://linkedin.com/in/heatherdev";
            break;
          case "leetcode":
            url = "https://leetcode.com/heatherdev";
            break;
          case "email":
            url = "mailto:contact@heatherdev.com";
            break;
          case "resume":
            url = "/resume.pdf";
            break;
          default:
            setOutputLines((prev) => [
              ...prev,
              {
                key: generateUniqueKey(),
                type: "error",
                text: `ERROR: Unknown platform "${parts[1]}"`,
              },
            ]);
            playErrorSound();
            return;
        }

        setOutputLines((prev) => [
          ...prev,
          {
            key: generateUniqueKey(),
            type: "response",
            text: `🔗 Opening: ${url}`,
          },
        ]);

        // Actually open the link in a new tab (if in a browser environment)
        if (typeof window !== "undefined") {
          setTimeout(() => {
            window.open(url, "_blank");
          }, 500);
        }
      }
    } else if (lowerCmd === "profile.view") {
      setOutputLines((prev) => [
        ...prev,
        {
          key: generateUniqueKey(),
          type: "response",
          text: `╭──────────────────────────────╮
│   HEATHER                    │
│   Software Engineer          │
│   CSE (AIML) – 8.91 CGPA     │
│   Blockchain • Web • AI      │
╰──────────────────────────────╯
[Mission: Reach NASA. Path: Through Code.]`,
        },
      ]);
    } else if (lowerCmd.startsWith("launch")) {
      const parts = lowerCmd.split(" ");

      if (parts.length === 1) {
        setOutputLines((prev) => [
          ...prev,
          {
            key: generateUniqueKey(),
            type: "error",
            text: "ERROR: Mission name required. Usage: launch [mission]",
          },
        ]);
        playErrorSound();
      } else {
        const mission = parts.slice(1).join(" ");
        setLaunchText(`Initiating launch sequence for mission: ${mission}...`);
        setIsLaunching(true);

        // Add to output after animation completes
        setTimeout(() => {
          setOutputLines((prev) => [
            ...prev,
            {
              key: generateUniqueKey(),
              type: "launch",
              text: `Launch sequence for ${mission} successful. Mission is now active.`,
            },
          ]);
          setIsLaunching(false);
          setLaunchText("");
        }, 3000); // Animation time + extra
      }
    }
  };

  // Handle key press for navigation and autocomplete
  const handleKeyDown = (e: React.KeyboardEvent) => {
    playKeySound();

    // Navigate command history
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newCursor = Math.min(
          historyCursor + 1,
          commandHistory.length - 1
        );
        setHistoryCursor(newCursor);
        setCommand(commandHistory[newCursor]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyCursor > 0) {
        const newCursor = historyCursor - 1;
        setHistoryCursor(newCursor);
        setCommand(commandHistory[newCursor]);
      } else if (historyCursor === 0) {
        setHistoryCursor(-1);
        setCommand("");
      }
    }

    // Navigate suggestions
    else if (e.key === "Tab" && suggestions.length > 0) {
      e.preventDefault();
      setCommand(suggestions[selectedSuggestion]);
    } else if (
      e.key === "ArrowRight" &&
      suggestions.length > 0 &&
      showSuggestions
    ) {
      e.preventDefault();
      setCommand(suggestions[selectedSuggestion]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setCommand(suggestion);
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle history command click
  const handleHistoryClick = (cmd: string) => {
    setCommand(cmd);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="bg-gray-900/80 border border-teal-900/50 rounded-xl p-3 glow-subtle">
      <div className="flex items-center mb-2 justify-between">
        <div className="flex items-center">
          <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
          <div className="text-xs text-teal-500">COMMAND TERMINAL</div>
        </div>
        <div className="flex space-x-1">
          <div className="h-2.5 w-2.5 bg-yellow-500 rounded-full"></div>
          <div className="h-2.5 w-2.5 bg-red-500 rounded-full"></div>
        </div>
      </div>

      {/* Terminal output */}
      <div
        ref={outputRef}
        className="bg-gray-900 border border-gray-800 rounded p-2 mb-2 h-40 overflow-y-auto text-xs text-green-400 font-mono"
      >
        {outputLines.map((line) => (
          <div key={line.key} className="mb-1">
            {line.type === "input" && (
              <div>
                <span className="text-teal-500">{">"}</span> {line.text}
              </div>
            )}
            {line.type === "response" && (
              <div className="text-green-300 whitespace-pre-line">
                {line.text}
              </div>
            )}
            {line.type === "error" && (
              <div className="glitch-text font-bold my-1">{line.text}</div>
            )}
            {line.type === "launch" && (
              <div className="text-yellow-300">{line.text}</div>
            )}
          </div>
        ))}
        {isLaunching && (
          <div className="text-yellow-400">
            {typedLaunchText}
            <span className="animate-pulse">_</span>
          </div>
        )}
      </div>

      {/* Command input */}
      <form onSubmit={handleSubmit} className="flex relative">
        <div className="text-teal-500 mr-1">{">"}</div>
        <input
          ref={inputRef}
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none outline-none flex-1 text-white text-sm font-mono focus:outline-none"
          placeholder="Type a command... (try 'help')"
          spellCheck="false"
          autoComplete="off"
          autoFocus
        />
        <button
          type="submit"
          className="bg-teal-900/60 px-3 text-xs rounded text-teal-300 hover:bg-teal-800/60"
        >
          Execute
        </button>

        {/* Command suggestions */}
        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="absolute bottom-full left-6 mb-1 bg-gray-800 border border-teal-900/50 rounded overflow-hidden shadow-lg"
            >
              <div className="max-h-32 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={suggestion}
                    className={`px-3 py-1 text-xs cursor-pointer ${
                      index === selectedSuggestion
                        ? "bg-teal-900/70 text-white"
                        : "text-teal-300 hover:bg-gray-700"
                    }`}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* Command history (clickable) */}
      {commandHistory.length > 0 && (
        <div className="mt-2 border-t border-gray-800 pt-1">
          <div className="text-xs text-gray-500 mb-1">Command History:</div>
          <div className="flex flex-wrap gap-1">
            {commandHistory.slice(0, 5).map((cmd, i) => (
              <div
                key={`history-${i}`}
                className="cursor-pointer text-xs px-2 py-0.5 rounded bg-gray-800 hover:bg-gray-700 text-teal-400"
                onClick={() => handleHistoryClick(cmd)}
              >
                {cmd}
              </div>
            ))}
            {commandHistory.length > 5 && (
              <div className="text-xs text-gray-500">
                +{commandHistory.length - 5} more
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommandInput;
