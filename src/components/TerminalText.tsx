"use client";

import React, { useEffect } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";

interface TerminalTextProps {
  lines: string[];
  onFinish?: () => void;
  speed?: number;
  delaySpeed?: number;
}

const TerminalText: React.FC<TerminalTextProps> = ({
  lines,
  onFinish,
  speed = 50,
  delaySpeed = 1500,
}) => {
  // Prepare the full combined text and feed to the typewriter
  const fullText = lines.join("\n");
  const [text] = useTypewriter({
    words: [fullText],
    loop: 1,
    typeSpeed: speed,
    deleteSpeed: 0, // Don't delete previous lines
    delaySpeed: delaySpeed,
  });

  // When typewriter has finished typing the full intro, call onFinish
  useEffect(() => {
    if (text === fullText && onFinish) {
      onFinish();
    }
  }, [text, fullText, onFinish]);

  return (
    <div className="font-mono text-green-400 bg-black p-4 rounded min-h-[100px] whitespace-pre-wrap">
      <span>{text}</span>
      <Cursor cursorStyle="_" />
    </div>
  );
};

export default TerminalText;
