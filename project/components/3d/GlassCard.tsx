"use client";

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover3d?: boolean;
}

export function GlassCard({ children, className = '', hover3d = true }: GlassCardProps) {
  return (
    <motion.div
      className={`relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl shadow-2xl overflow-hidden ${className}`}
      whileHover={hover3d ? { 
        scale: 1.02,
        rotateX: 2,
        rotateY: 2,
        transition: { duration: 0.3 }
      } : undefined}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500 -z-10" />
    </motion.div>
  );
}