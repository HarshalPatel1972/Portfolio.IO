"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

interface ThemeOption {
  value: string;
  label: string;
  icon: string;
  description: string;
}

const ThemeSwitcher = () => {
  const { theme, setTheme, themes } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Define theme options with descriptions and icons
  const themeOptions: ThemeOption[] = [
    {
      value: "dark-org",
      label: "Dark (Default)",
      icon: "🌑",
      description: "Professional dark theme for coding",
    },
    {
      value: "light",
      label: "Light",
      icon: "☀️",
      description: "Classic light appearance",
    },
    {
      value: "gruvbox",
      label: "Gruvbox",
      icon: "🧡",
      description: "Retro medium-contrast theme",
    },
    {
      value: "monokai",
      label: "Monokai",
      icon: "💜",
      description: "Vibrant colorful theme",
    },
    {
      value: "system",
      label: "System Theme",
      icon: "🖥️",
      description: "Follow system appearance",
    },
  ];

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Wait for client-side rendering to avoid hydration errors
  useEffect(() => {
    setMounted(true);

    // Add keyboard shortcut (Ctrl+K, T) to open theme switcher
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+K
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();

        // Wait for the next key
        const handleNextKey = (nextEvent: KeyboardEvent) => {
          if (nextEvent.key === "t" || nextEvent.key === "T") {
            nextEvent.preventDefault();
            setIsOpen((prev) => !prev);
          }

          // Clean up the event listener after first key press
          document.removeEventListener("keydown", handleNextKey);
        };

        document.addEventListener("keydown", handleNextKey);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!mounted) return null;

  // Find current theme option
  const currentTheme =
    themeOptions.find((t) => t.value === theme) || themeOptions[0];

  return (
    <div className="relative" ref={menuRef}>
      {/* Theme Button Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Theme Switcher"
        className="flex items-center gap-1 px-2 py-1 text-xs rounded bg-[var(--terminal-bg)] text-[var(--foreground)] border border-[var(--border-color)] hover:border-[var(--accent)]"
        title="Change Theme (Ctrl+K, T)"
      >
        <span className="mr-1">{currentTheme.icon}</span>
        <span className="hidden sm:inline">Theme: </span>
        <span>{currentTheme.label}</span>
        <svg
          className="w-3 h-3 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Theme Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-60 rounded-md shadow-lg bg-[var(--terminal-bg)] border border-[var(--border-color)] z-50"
          >
            <div className="py-1 max-h-80 overflow-y-auto">
              <div className="px-3 py-2 text-xs font-semibold border-b border-[var(--border-color)]">
                Select Theme
              </div>
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setTheme(option.value);
                    setIsOpen(false);

                    // Add class for smooth transitions when changing theme
                    document.documentElement.classList.add("theme-transition");
                    setTimeout(() => {
                      document.documentElement.classList.remove(
                        "theme-transition"
                      );
                    }, 300);
                  }}
                  className={`w-full text-left px-3 py-2 flex items-start hover:bg-[var(--accent)] hover:bg-opacity-10 transition-colors ${
                    theme === option.value
                      ? "bg-[var(--accent)] bg-opacity-20"
                      : ""
                  }`}
                >
                  <div className="mr-2 text-lg">{option.icon}</div>
                  <div>
                    <div className="text-sm font-medium">{option.label}</div>
                    <div className="text-xs opacity-70">
                      {option.description}
                    </div>
                  </div>
                  {theme === option.value && (
                    <div className="ml-auto">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
              <div className="px-3 py-2 text-xs border-t border-[var(--border-color)]">
                <span className="opacity-70">Keyboard Shortcut: Ctrl+K, T</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
