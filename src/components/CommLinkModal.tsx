"use client";

import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CommLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommLinkModal({ isOpen, onClose }: CommLinkModalProps) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    subject: "General Inquiry",
  });
  const [sending, setSending] = useState(false);
  const [formSuccess, setFormSuccess] = useState<boolean | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);

    // Simulate sending message with delay
    setTimeout(() => {
      setSending(false);
      setFormSuccess(true);

      // Reset form after success
      setFormState({
        name: "",
        email: "",
        message: "",
        subject: "General Inquiry",
      });

      // Reset success message after 3 seconds
      setTimeout(() => {
        setFormSuccess(null);
      }, 3000);
    }, 1500);
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
            className="bg-gray-900/95 border border-teal-700/50 rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-xl glow"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-teal-900/50">
              <h3 className="text-xl text-teal-400 font-mono flex items-center">
                <span className="mr-2">📡</span> COMM LINK
              </h3>

              <button
                className="bg-gray-800 hover:bg-gray-700 text-teal-300 rounded-full w-8 h-8 flex items-center justify-center"
                onClick={onClose}
              >
                ×
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(80vh-70px)]">
              <div className="mb-6 text-teal-300 text-sm">
                <div className="mb-2 font-mono text-base">
                  {/* TRANSMISSION READY */}
                </div>
                <p>
                  Establish direct communication link. All channels secured and
                  encrypted.
                </p>
              </div>

              {formSuccess === true ? (
                <motion.div
                  className="bg-teal-900/30 border border-teal-500/50 rounded-lg p-4 text-teal-400"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="font-bold mb-2">Transmission Successful</div>
                  <p className="text-sm">
                    Message received. Expect a response within 24-48 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-teal-400 text-sm mb-2"
                        htmlFor="name"
                      >
                        Identifier
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        className="bg-gray-800/70 border border-teal-700/30 focus:border-teal-500/50 text-white rounded-md w-full p-2 focus:outline-none"
                        required
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        className="block text-teal-400 text-sm mb-2"
                        htmlFor="email"
                      >
                        Comm Channel
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        className="bg-gray-800/70 border border-teal-700/30 focus:border-teal-500/50 text-white rounded-md w-full p-2 focus:outline-none"
                        required
                        placeholder="Your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-teal-400 text-sm mb-2"
                      htmlFor="subject"
                    >
                      Transmission Type
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      className="bg-gray-800/70 border border-teal-700/30 focus:border-teal-500/50 text-white rounded-md w-full p-2 focus:outline-none"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Project Collaboration">
                        Project Collaboration
                      </option>
                      <option value="Job Opportunity">Job Opportunity</option>
                      <option value="Technical Support">
                        Technical Support
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      className="block text-teal-400 text-sm mb-2"
                      htmlFor="message"
                    >
                      Message Payload
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={5}
                      className="bg-gray-800/70 border border-teal-700/30 focus:border-teal-500/50 text-white rounded-md w-full p-2 focus:outline-none resize-none"
                      required
                      placeholder="Enter your message here..."
                    ></textarea>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={sending}
                      className={`bg-teal-700 hover:bg-teal-600 text-white px-4 py-2 rounded flex items-center ${
                        sending ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {sending ? (
                        <>
                          <span className="mr-2">
                            <svg
                              className="animate-spin h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          </span>
                          Transmitting...
                        </>
                      ) : (
                        "Send Transmission"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="p-4 border-t border-teal-900/50 flex justify-between items-center">
              <div className="text-xs text-teal-400 font-mono">
                ENCRYPTION: <span className="text-teal-300">ENABLED</span> •
                CHANNEL: <span className="text-teal-300">SECURE</span>
              </div>

              <button
                className="bg-teal-700 hover:bg-teal-600 text-white px-3 py-1 rounded text-sm"
                onClick={onClose}
              >
                Close Console
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
