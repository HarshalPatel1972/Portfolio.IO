"use client";

import React, { useState, useEffect } from "react";
import GuestIntro from "./GuestIntro";
import LoggedInIntro from "./LoggedInIntro";

interface IntroControllerProps {
  children: React.ReactNode;
}

const IntroController: React.FC<IntroControllerProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [userName, setUserName] = useState<string | undefined>(undefined);

  // Simulate auth check
  useEffect(() => {
    // For demo purposes, we'll simulate checking auth state
    // In a real app, this would check cookies, localStorage, or an auth context
    const checkAuthStatus = () => {
      // For demo - randomly show logged in or guest state
      // In production, replace with actual auth check
      const mockLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const storedUserName = localStorage.getItem("userName");

      setIsLoggedIn(mockLoggedIn);
      if (storedUserName) {
        setUserName(storedUserName);
      }
    };

    // Slight delay to simulate async auth check
    setTimeout(checkAuthStatus, 100);
  }, []);

  // Handler for when intro animations finish
  const handleIntroComplete = () => {
    setShowIntro(false);
    // Optional: set a flag to remember that user has seen the intro
    localStorage.setItem("hasSeenIntro", "true");
  };

  // For development - provide a way to reset the intro state
  // Can be removed in production or put behind an admin flag
  const resetIntro = () => {
    localStorage.removeItem("hasSeenIntro");
    setShowIntro(true);
  };

  // Show loading state while checking auth
  if (isLoggedIn === null) {
    return <div className="h-screen w-screen bg-black" />; // Simple loading state
  }

  return (
    <>
      {showIntro ? (
        isLoggedIn ? (
          <LoggedInIntro onComplete={handleIntroComplete} userName={userName} />
        ) : (
          <GuestIntro onComplete={handleIntroComplete} />
        )
      ) : (
        <>
          {children}

          {/* Development tool - button to reset intro */}
          <button
            onClick={resetIntro}
            className="fixed bottom-4 right-4 bg-gray-800 text-xs text-gray-400 px-2 py-1 rounded opacity-50 hover:opacity-100"
          >
            Reset Intro
          </button>
        </>
      )}
    </>
  );
};

export default IntroController;
