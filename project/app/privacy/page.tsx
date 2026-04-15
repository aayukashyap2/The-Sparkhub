"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] text-white px-6 py-16">

      <div className="max-w-4xl mx-auto">
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
        >
          Privacy Policy 🔒
        </motion.h1>

        <div className="space-y-6 text-gray-300 leading-relaxed">
          
          <p>
            At SparkHub, we respect your privacy and are committed to protecting your personal data.
            This policy explains how we collect, use, and safeguard your information.
          </p>

          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-6">
            <h3 className="text-indigo-400 font-semibold mb-2">Information We Collect</h3>
            <p>We may collect your name, email, and submitted ideas to improve our platform.</p>
          </div>

          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-6">
            <h3 className="text-indigo-400 font-semibold mb-2">How We Use Data</h3>
            <p>Your data helps us enhance user experience and connect innovators.</p>
          </div>

          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-6">
            <h3 className="text-indigo-400 font-semibold mb-2">Security</h3>
            <p>We use modern security practices to protect your data from unauthorized access.</p>
          </div>

        </div>
      </div>
    </div>
  );
}