"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const resumeData = {
  education: [
    {
      id: 1,
      degree:
        "Bachelor of Engineering (B.E.) in Computer Science and Engineering (CSE) – Artificial Intelligence and Machine Learning",
      institution: "Chandigarh University",
      year: "2022–2026",
      details: "Currently pursuing, with a CGPA of 8.91 (as of latest update)",
    },
  ],
  experience: [
    {
      id: 1,
      role: "Blockchain Project Lead",
      company: "Independent / Hackathon Projects",
      period: "2024–Present",
      highlights: [
        "Leading development of MedChain Authenticator for counterfeit medicine detection using blockchain and computer vision",
        "Coordinated a multi-functional team and implemented secure verification systems",
        "Working with Polygon testnet, Streamlit, CNN, and OCR technologies",
      ],
    },
    {
      id: 2,
      role: "Intern – Full Stack Web Development",
      company: "Metacourse (Remote)",
      period: "2023",
      highlights: [
        "Built and deployed dynamic websites using React, Node.js, and Express.js",
        "Integrated third-party APIs and developed mobile-friendly interfaces",
        "Participated in agile sprints and team code reviews",
      ],
    },
    {
      id: 3,
      role: "Intern – Data Science",
      company: "Internshala (Remote)",
      period: "2023",
      highlights: [
        "Worked on data preprocessing, model training, and performance evaluation",
        "Applied Python, Pandas, and machine learning concepts to real-world datasets",
        "Completed certified training projects in ML pipelines",
      ],
    },
  ],
  certifications: [
    {
      id: 1,
      name: "Certified Entry-Level JavaScript Programmer",
      issuer: "Cisco",
      date: "2024",
      credentialId: "JSE-CERT-CISCO",
    },
    {
      id: 2,
      name: "Machine Learning for All",
      issuer: "University of London (via Coursera)",
      date: "2023",
      credentialId: "",
    },
    {
      id: 3,
      name: "Introduction to Big Data with Spark and Hadoop",
      issuer: "IBM",
      date: "2023",
      credentialId: "",
    },
    {
      id: 4,
      name: "What is Data Science?",
      issuer: "IBM",
      date: "2023",
      credentialId: "",
    },
    {
      id: 5,
      name: "Introduction to Big Data",
      issuer: "University of San Diego",
      date: "2023",
      credentialId: "",
    },
    {
      id: 6,
      name: "Python Data Structures",
      issuer: "University of Michigan (via Coursera)",
      date: "2023",
      credentialId: "",
    },
    {
      id: 7,
      name: "Applied Machine Learning in Python",
      issuer: "University of Michigan",
      date: "2023",
      credentialId: "",
    },
    {
      id: 8,
      name: "Data Science Certification",
      issuer: "Internshala",
      date: "2023",
      credentialId: "",
    },
  ],
  projects: [
    {
      id: 1,
      name: "Sitara",
      year: "2024",
      description:
        "Subscription-based content platform built using React, Tailwind, Stripe, and Email.js. Responsive for both mobile and web platforms.",
    },
    {
      id: 2,
      name: "MedChain Authenticator",
      year: "2024–2025",
      description:
        "Counterfeit Ayurvedic medicine detection using computer vision, blockchain (Polygon testnet), and OCR. Built with Streamlit, Flask, and CNNs.",
    },
    {
      id: 3,
      name: "Attiro",
      year: "2025",
      description:
        "AI-powered outfit matcher that suggests clothing combinations based on occasion and skin tone. Uses image uploads and prompt-based logic.",
    },
    {
      id: 4,
      name: "HealthView",
      year: "2025",
      description:
        "Decentralized blockchain-based EHR system using Streamlit frontend, synthetic Aadhaar auto-fill, and smart contracts on the Polygon Amoy testnet.",
    },
    {
      id: 5,
      name: "Live Captions Research",
      year: "2025",
      description:
        "Research project on multilingual live captions using real-time transcription and translation models.",
    },
    {
      id: 6,
      name: "FraudFence (Voice Fraud Detection)",
      year: "2025 (Planned)",
      description:
        "Voice fraud detection using Twilio, DeepSpeech, and TensorFlow. Mobile-first design built with Flutter and Dart.",
    },
    {
      id: 7,
      name: "WiFi Merger",
      year: "2025 (Planned)",
      description:
        "Tool to intelligently merge multiple WiFi network signals for stable connectivity and seamless transitions.",
    },
    {
      id: 8,
      name: "TheVSGame",
      year: "2024",
      description:
        "Interactive multiplayer guessing game comparing random topics. Built with React and Firebase.",
    },
    {
      id: 9,
      name: "Music Plagiarism Detection",
      year: "2024",
      description:
        "ML model to detect similarity between musical compositions. Focused on tempo, pitch, and frequency pattern analysis.",
    },
    {
      id: 10,
      name: "Handwritten Digit Recognition",
      year: "2024",
      description:
        "ML model using CNNs to classify MNIST handwritten digits. Trained and tested using TensorFlow.",
    },
  ],
  skills: [
    {
      category: "Languages",
      items: ["C++", "Python", "SQL", "C", "C#", "Bash", "JavaScript"],
    },
    {
      category: "Frontend",
      items: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express.js", "Flask"],
    },
    {
      category: "Database",
      items: ["MongoDB", "MySQL", "Firebase (basic)"],
    },
    {
      category: "DevOps & Tools",
      items: [
        "Git",
        "GitHub",
        "Streamlit",
        "Email.js",
        "Stripe",
        "MetaMask",
        "Hardhat",
        "IPFS",
        "Web3.py",
      ],
    },
    {
      category: "Machine Learning & AI",
      items: [
        "Python (scikit-learn, TensorFlow, CNNs)",
        "OCR",
        "Generative AI",
      ],
    },
    {
      category: "Blockchain",
      items: [
        "Solidity",
        "Polygon (Amoy testnet)",
        "Smart Contracts",
        "IPFS",
        "Pinata",
      ],
    },
  ],
};

interface ArchivesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ArchivesModal({ isOpen, onClose }: ArchivesModalProps) {
  const [activeSection, setActiveSection] = useState<string>("education");

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
            className="bg-gray-900/95 border border-teal-700/50 rounded-xl w-full max-w-4xl h-[80vh] overflow-hidden flex flex-col shadow-xl glow"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-teal-900/50">
              <h3 className="text-xl text-teal-400 font-mono flex items-center">
                <span className="mr-2">📂</span> ARCHIVE ACCESS TERMINAL
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

            {/* Status row */}
            {/* <div className="flex justify-around items-center p-2 border-b border-teal-900/30 bg-gray-800/50 text-sm text-teal-300">
              <div className="flex items-center gap-1">
                <span>🛠️</span>
                <span>PROJECTS:</span>
                <span className="font-bold text-white">10</span>
              </div>
              <div className="flex items-center gap-1">
                <span>🚀</span>
                <span>MISSION:</span>
                <span className="font-bold text-white">Attiro</span>
              </div>
              <div className="flex items-center gap-1">
                <span>🎮</span>
                <span>SYSTEM:</span>
                <span className="font-bold text-white">Clove Main</span>
              </div>
              <div className="flex items-center gap-1">
                <span>📡</span>
                <span>STATUS:</span>
                <span className="font-bold text-white">Online</span>
              </div>
            </div> */}

            <div className="grid grid-cols-12 flex-1 overflow-hidden">
              {/* Navigation sidebar */}
              <div className="col-span-3 bg-gray-900 border-r border-teal-900/30 p-2">
                {[
                  "education",
                  "experience",
                  "certifications",
                  "projects",
                  "skills",
                ].map((section) => (
                  <button
                    key={section}
                    className={`w-full text-left px-4 py-2 mb-1 rounded flex items-center transition-all ${
                      activeSection === section
                        ? "bg-teal-700/30 text-white"
                        : "hover:bg-gray-800/50 text-gray-300"
                    }`}
                    onClick={() => setActiveSection(section)}
                  >
                    <span className="mr-2">
                      {section === "education" && "🎓"}
                      {section === "experience" && "💼"}
                      {section === "certifications" && "🏆"}
                      {section === "projects" && "🔬"}
                      {section === "skills" && "⚙️"}
                    </span>
                    <span className="capitalize">{section}</span>
                  </button>
                ))}

                <div className="mt-8 p-3 border border-teal-900/30 rounded bg-gray-800/50">
                  <div className="text-xs text-gray-400">System Info</div>
                  <div className="mt-2 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Records:</span>
                      <span className="text-teal-400">42</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Updated:</span>
                      <span className="text-teal-400">2025-04-18</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Clearance:</span>
                      <span className="text-green-400">Granted</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main content area */}
              <div className="col-span-9 overflow-y-auto p-4">
                {/* Education Section */}
                {activeSection === "education" && (
                  <div>
                    <h4 className="text-lg text-teal-400 mb-4 pb-2 border-b border-teal-900/30">
                      Educational Records
                    </h4>
                    <div className="space-y-6">
                      {resumeData.education.map((item) => (
                        <motion.div
                          key={item.id}
                          className="bg-gray-800/50 p-4 rounded-lg border border-teal-900/30"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex justify-between">
                            <h5 className="text-white font-bold">
                              {item.degree}
                            </h5>
                            <span className="text-teal-400 text-sm">
                              {item.year}
                            </span>
                          </div>
                          <div className="text-gray-300 mt-1">
                            {item.institution}
                          </div>
                          <div className="text-gray-400 text-sm mt-2">
                            {item.details}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Experience Section */}
                {activeSection === "experience" && (
                  <div>
                    <h4 className="text-lg text-teal-400 mb-4 pb-2 border-b border-teal-900/30">
                      Work Experience
                    </h4>
                    <div className="space-y-6">
                      {resumeData.experience.map((item) => (
                        <motion.div
                          key={item.id}
                          className="bg-gray-800/50 p-4 rounded-lg border border-teal-900/30"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex justify-between">
                            <h5 className="text-white font-bold">
                              {item.role}
                            </h5>
                            <span className="text-teal-400 text-sm">
                              {item.period}
                            </span>
                          </div>
                          <div className="text-gray-300 mt-1">
                            {item.company}
                          </div>
                          <ul className="list-disc text-gray-400 text-sm mt-2 pl-5 space-y-1">
                            {item.highlights.map((highlight, idx) => (
                              <li key={idx}>{highlight}</li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certifications Section */}
                {activeSection === "certifications" && (
                  <div>
                    <h4 className="text-lg text-teal-400 mb-4 pb-2 border-b border-teal-900/30">
                      Credentials & Certifications
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {resumeData.certifications.map((item) => (
                        <motion.div
                          key={item.id}
                          className="bg-gray-800/50 p-4 rounded-lg border border-teal-900/30"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="text-white font-bold">
                            {item.name}
                          </div>
                          <div className="text-gray-300 text-sm mt-1">
                            {item.issuer}
                          </div>
                          <div className="flex justify-between text-xs mt-2">
                            <span className="text-teal-400">
                              Issued: {item.date}
                            </span>
                            <span className="text-gray-400">
                              ID: {item.credentialId}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects Section */}
                {activeSection === "projects" && (
                  <div>
                    <h4 className="text-lg text-teal-400 mb-4 pb-2 border-b border-teal-900/30">
                      Project Timeline
                    </h4>
                    <div className="relative pl-8 border-l border-teal-700/50 ml-4 space-y-10">
                      {resumeData.projects.map((item) => (
                        <motion.div
                          key={item.id}
                          className="relative"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <div className="absolute -left-12 bg-gray-800 border border-teal-700/70 rounded-full w-6 h-6 flex items-center justify-center text-xs text-teal-400">
                            {item.id}
                          </div>
                          <div className="bg-gray-800/50 p-4 rounded-lg border border-teal-900/30">
                            <div className="flex justify-between">
                              <h5 className="text-white font-bold">
                                {item.name}
                              </h5>
                              <span className="text-teal-400 text-sm">
                                {item.year}
                              </span>
                            </div>
                            <div className="text-gray-400 text-sm mt-2">
                              {item.description}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills Section */}
                {activeSection === "skills" && (
                  <div>
                    <h4 className="text-lg text-teal-400 mb-4 pb-2 border-b border-teal-900/30">
                      Technical Proficiencies
                    </h4>
                    <div className="space-y-6">
                      {resumeData.skills.map((category) => (
                        <div key={category.category}>
                          <h5 className="text-gray-300 font-bold mb-2">
                            {category.category}
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {category.items.map((skill, idx) => (
                              <motion.div
                                key={idx}
                                className="bg-gray-800 border border-teal-900/50 rounded-full px-3 py-1 text-sm text-teal-300"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  duration: 0.3,
                                  delay: idx * 0.05,
                                }}
                              >
                                {skill}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-3 border-t border-teal-900/50 flex justify-between items-center">
              <div className="text-sm text-teal-400">
                <span className="animate-pulse">■</span> Archive system online
              </div>

              <button
                className="bg-teal-700 hover:bg-teal-600 text-white px-3 py-1 rounded text-sm"
                onClick={onClose}
              >
                Close Archives
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
