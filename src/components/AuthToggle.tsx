"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AuthToggle: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("User");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize from localStorage on mount
    const storedAuthStatus = localStorage.getItem("isLoggedIn") === "true";
    const storedUserName = localStorage.getItem("userName") || "User";

    setIsLoggedIn(storedAuthStatus);
    setUserName(storedUserName);

    // Add click outside listener to close dropdown
    const handleClickOutside = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggleAuth = () => {
    const newAuthState = !isLoggedIn;
    setIsLoggedIn(newAuthState);
    localStorage.setItem("isLoggedIn", newAuthState.toString());

    // Reset intro state to see the intro again
    localStorage.removeItem("hasSeenIntro");

    // Reload the page to show the intro again
    window.location.reload();
  };

  const handleSetUserName = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    setShowInput(false);
  };

  // User menu options
  const menuOptions = [
    {
      id: "profile",
      label: "View Profile",
      icon: "👤",
      action: () => alert("Profile view would open here"),
    },
    {
      id: "settings",
      label: "Settings",
      icon: "⚙️",
      action: () => alert("Settings panel would open here"),
    },
    {
      id: "changeName",
      label: "Change Name",
      icon: "✏️",
      action: () => setShowInput(true),
    },
    {
      id: "toggle",
      label: isLoggedIn ? "Switch to Guest" : "Login",
      icon: isLoggedIn ? "🔄" : "🔑",
      action: handleToggleAuth,
    },
    {
      id: "logout",
      label: "Logout",
      icon: "🚪",
      action: isLoggedIn ? handleToggleAuth : () => {},
      hidden: !isLoggedIn,
    },
  ].filter((option) => !option.hidden);

  return (
    <div
      className="fixed top-4 right-4 flex gap-2 z-40"
      ref={userMenuRef}
      suppressHydrationWarning
    >
      {showInput ? (
        <form onSubmit={handleSetUserName} className="flex">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="px-2 py-1 text-sm bg-gray-800 border border-gray-700 rounded-l text-white"
            placeholder="Enter name"
            autoFocus
          />
          <button
            type="submit"
            className="px-2 py-1 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded-r"
          >
            Set
          </button>
        </form>
      ) : (
        <>
          <motion.button
            onClick={() => setShowUserMenu(!showUserMenu)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1 text-xs rounded-md flex items-center gap-2 ${
              isLoggedIn
                ? "bg-green-700 hover:bg-green-600 text-white"
                : "bg-gray-700 hover:bg-gray-600 text-white"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-teal-300 animate-pulse"></span>
            {userName} {isLoggedIn ? "(Online)" : "(Guest)"}
          </motion.button>

          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-8 mt-2 w-48 bg-gray-800 rounded-md shadow-lg border border-teal-900/50 overflow-hidden"
              >
                <div className="py-2 px-3 bg-gray-700/50 border-b border-gray-600/50 text-xs text-teal-300">
                  {isLoggedIn ? "User Console" : "Guest Access"}
                </div>
                {menuOptions.map((option) => (
                  <motion.button
                    key={option.id}
                    onClick={() => {
                      setShowUserMenu(false);
                      option.action();
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 flex items-center gap-2"
                    whileHover={{ x: 3 }}
                  >
                    <span>{option.icon}</span>
                    {option.label}
                  </motion.button>
                ))}

                <div className="p-2 border-t border-gray-600/50 text-center">
                  <span className="text-xs text-gray-400">
                    Session ID: {Math.random().toString(36).substring(2, 8)}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default AuthToggle;
