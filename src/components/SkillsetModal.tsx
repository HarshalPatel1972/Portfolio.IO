"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SkillsetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SkillCategory {
  name: string;
  description: string;
  skills: Skill[];
}

interface Skill {
  name: string;
  level: number; // 1-5
  years: number;
  description?: string;
}

export default function SkillsetModal({ isOpen, onClose }: SkillsetModalProps) {
  const [activeCategory, setActiveCategory] = useState<string>("frontend");

  const skillCategories: Record<string, SkillCategory> = {
    frontend: {
      name: "Frontend Development",
      description:
        "Creating responsive, interactive user interfaces with modern web technologies.",
      skills: [
        {
          name: "React",
          level: 5,
          years: 4,
          description: "Library of choice for building dynamic user interfaces",
        },
        {
          name: "JavaScript",
          level: 5,
          years: 6,
          description: "Core language for web development",
        },
        {
          name: "TypeScript",
          level: 4,
          years: 3,
          description: "Static typing for scalable applications",
        },
        {
          name: "NextJS",
          level: 4,
          years: 2,
          description: "React framework for production",
        },
        {
          name: "HTML5/CSS3",
          level: 5,
          years: 6,
          description: "Fundamentals of web development",
        },
        {
          name: "Tailwind CSS",
          level: 4,
          years: 2,
          description: "Utility-first CSS framework",
        },
      ],
    },
    backend: {
      name: "Backend Development",
      description: "Building robust server-side applications and APIs.",
      skills: [
        {
          name: "Node.js",
          level: 4,
          years: 4,
          description: "JavaScript runtime for server-side applications",
        },
        {
          name: "Express",
          level: 4,
          years: 3,
          description: "Web framework for Node.js",
        },
        {
          name: "Python",
          level: 3,
          years: 2,
          description: "General-purpose programming language",
        },
        {
          name: "SQL",
          level: 4,
          years: 4,
          description: "Relational database query language",
        },
        {
          name: "MongoDB",
          level: 3,
          years: 2,
          description: "NoSQL document database",
        },
        {
          name: "GraphQL",
          level: 3,
          years: 1,
          description: "API query language and runtime",
        },
      ],
    },
    devops: {
      name: "DevOps & Cloud",
      description: "Deploying and managing applications in the cloud.",
      skills: [
        {
          name: "Docker",
          level: 3,
          years: 2,
          description: "Containerization platform",
        },
        {
          name: "AWS",
          level: 3,
          years: 2,
          description: "Cloud computing services",
        },
        {
          name: "CI/CD",
          level: 3,
          years: 2,
          description: "Continuous integration and deployment",
        },
        {
          name: "GitHub Actions",
          level: 4,
          years: 2,
          description: "Automation and CI/CD tool",
        },
        {
          name: "Vercel",
          level: 4,
          years: 2,
          description: "Platform for frontend frameworks and static sites",
        },
        {
          name: "Netlify",
          level: 3,
          years: 2,
          description: "Web development platform",
        },
      ],
    },
    tools: {
      name: "Tools & Methods",
      description:
        "Supporting tools and methodologies for effective development.",
      skills: [
        {
          name: "Git",
          level: 5,
          years: 5,
          description: "Version control system",
        },
        {
          name: "Jest",
          level: 4,
          years: 3,
          description: "JavaScript testing framework",
        },
        {
          name: "Agile/Scrum",
          level: 4,
          years: 3,
          description: "Development methodology",
        },
        {
          name: "RESTful APIs",
          level: 4,
          years: 4,
          description: "API architectural style",
        },
        {
          name: "UI/UX Design",
          level: 3,
          years: 2,
          description: "User interface and experience design",
        },
        {
          name: "Figma",
          level: 3,
          years: 2,
          description: "Design and prototyping tool",
        },
      ],
    },
  };

  const renderSkillBar = (level: number) => {
    return (
      <div className="w-full bg-gray-800 rounded-full h-2 mt-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`inline-block h-2 rounded-full ${
              i < level ? "bg-teal-500" : "bg-gray-700"
            }`}
            style={{ width: "20%" }}
          />
        ))}
      </div>
    );
  };

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
                <span className="mr-2">🧠</span> SKILLSET DATABASE
              </h3>

              <button
                className="bg-gray-800 hover:bg-gray-700 text-teal-300 rounded-full w-8 h-8 flex items-center justify-center"
                onClick={onClose}
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4">
              <div className="border-r border-teal-900/30">
                <nav className="p-4 space-y-2 sticky top-0">
                  {Object.entries(skillCategories).map(([key, category]) => (
                    <button
                      key={key}
                      onClick={() => setActiveCategory(key)}
                      className={`w-full text-left p-2 rounded transition-colors font-mono text-sm
                        ${
                          activeCategory === key
                            ? "bg-teal-700/30 text-teal-300 border-l-2 border-teal-500 pl-3"
                            : "hover:bg-gray-800 text-gray-300"
                        }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="col-span-3 p-6 overflow-y-auto max-h-[calc(80vh-130px)]">
                {skillCategories[activeCategory] && (
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-lg text-teal-400 font-mono mb-1">
                      {skillCategories[activeCategory].name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-6">
                      {skillCategories[activeCategory].description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {skillCategories[activeCategory].skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="bg-gray-800/40 border border-teal-800/30 rounded-lg p-4 hover:border-teal-700/50 transition-colors"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="text-teal-300 font-mono">
                              {skill.name}
                            </h4>
                            <span className="text-xs text-teal-400 bg-teal-900/30 px-2 py-1 rounded">
                              {skill.years}{" "}
                              {skill.years === 1 ? "year" : "years"}
                            </span>
                          </div>

                          {renderSkillBar(skill.level)}

                          {skill.description && (
                            <p className="text-gray-400 text-xs mt-3">
                              {skill.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-teal-900/50 flex justify-between items-center">
              <div className="text-xs text-teal-500 font-mono">
                PROFICIENCY LEVEL:{" "}
                <span className="text-teal-300">1-5 SCALE</span>
              </div>

              <button
                className="bg-teal-700 hover:bg-teal-600 text-white px-3 py-1 rounded text-sm"
                onClick={onClose}
              >
                Close Database
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
