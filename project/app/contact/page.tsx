"use client";

import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] text-white px-6 py-16">

      <div className="max-w-3xl mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
        >
          Contact Us 📩
        </motion.h1>

        <p className="text-gray-300 mb-10">
          Have questions, ideas, or collaboration opportunities? Reach out to us!
        </p>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-lg">
        
        <form className="space-y-6">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none"
          />

          <textarea
            placeholder="Your Message"
            rows={5}
            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition-transform"
          >
            Send Message 🚀
          </button>
        </form>
      </div>
    </div>
  );
}