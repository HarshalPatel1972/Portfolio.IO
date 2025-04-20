"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Sample resume data
const resumeData = {
  education: [
    {
      id: 1,
      degree: "Master of Computer Science",
      institution: "Tech University",
      year: "2023-2024",
      details: "Specialized in Artificial Intelligence and Machine Learning",
    },
    {
      id: 2,
      degree: "Bachelor of Engineering",
      institution: "Engineering College",
      year: "2019-2023",
      details: "Computer Science with honors",
    },
  ],
  experience: [
    {
      id: 1,
      role: "Senior Developer",
      company: "TechCorp",
      period: "2024-Present",
      highlights: [
        "Led development of cloud-native applications",
        "Implemented CI/CD pipelines",
        "Mentored junior developers",
      ],
    },
    {
      id: 2,
      role: "Full Stack Developer",
      company: "WebSolutions",
      period: "2022-2024",
      highlights: [
        "Developed responsive web applications",
        "Optimized database performance",
        "Implemented authentication systems",
      ],
    },
    {
      id: 3,
      role: "Intern",
      company: "StartupX",
      period: "2021-2022",
      highlights: [
        "Created interactive data visualizations",
        "Assisted in UI/UX redesign",
        "Contributed to open-source projects",
      ],
    },
  ],
  certifications: [
    {
      id: 1,
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2024",
      credentialId: "AWS-123456",
    },
    {
      id: 2,
      name: "Professional Scrum Master",
      issuer: "Scrum.org",
      date: "2023",
      credentialId: "PSM-789012",
    },
    {
      id: 3,
      name: "TensorFlow Developer Certificate",
      issuer: "Google",
      date: "2023",
      credentialId: "TF-345678",
    },
    {
      id: 4,
      name: "React Certification",
      issuer: "Meta",
      date: "2022",
      credentialId: "REACT-901234",
    },
  ],
  projects: [
    {
      id: 1,
      name: "Neural Network Visualizer",
      year: "2024",
      description:
        "Interactive visualization tool for neural network architectures",
    },
    {
      id: 2,
      name: "Task Management Platform",
      year: "2023",
      description:
        "Collaborative task management system with real-time updates",
    },
    {
      id: 3,
      name: "Crypto Analytics Dashboard",
      year: "2022",
      description: "Data analytics platform for cryptocurrency market analysis",
    },
  ],
  skills: [
    {
      category: "Languages",
      items: ["JavaScript", "TypeScript", "Python", "Java", "C#"],
    },
    {
      category: "Frontend",
      items: ["React", "Next.js", "Vue", "Angular", "Tailwind CSS"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "Django", "ASP.NET", "Spring Boot"],
    },
    {
      category: "Database",
      items: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Firebase"],
    },
    {
      category: "DevOps",
      items: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"],
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
            className="bg-gray-900/95 border border-teal-700/50 rounded-xl w-full max-w-4xl max-h-[80vh] overflow-hidden shadow-xl glow"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
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

            <div className="grid grid-cols-12 h-[calc(80vh-70px)]">
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
