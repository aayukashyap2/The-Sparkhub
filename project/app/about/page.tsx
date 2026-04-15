"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] text-white px-6 py-16">
      
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
        >
          About SparkHub 🚀
        </motion.h1>

        <p className="text-gray-300 text-lg leading-relaxed">
          SparkHub is a modern idea incubator platform designed to empower innovators, 
          creators, and dreamers. We help transform raw ideas into impactful startups 
          by connecting people, technology, and opportunities.
        </p>
      </div>

      {/* Cards */}
      <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        
        {[
          {
            title: "Our Mission",
            desc: "To empower students and innovators to build real-world startups from ideas.",
          },
          {
            title: "Our Vision",
            desc: "To create a global ecosystem where innovation thrives without barriers.",
          },
          {
            title: "Why SparkHub?",
            desc: "We provide tools, community, and exposure to turn ideas into reality.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-3 text-indigo-400">
              {item.title}
            </h3>
            <p className="text-gray-300 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}