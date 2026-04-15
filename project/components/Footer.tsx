"use client";

import Link from 'next/link';
import { Lightbulb, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative backdrop-blur-xl bg-gray-900/50 border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* LOGO SECTION */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg group-hover:scale-110 transition-transform shadow-lg shadow-indigo-500/50">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                SparkHub
              </span>
            </Link>
            <p className="text-sm text-gray-400">
              Turn your startup ideas into reality. Join our community of innovators.
            </p>
          </div>

          {/* PLATFORM */}
          <div>
            <h3 className="font-semibold text-white mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/explore" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">
                  Explore Ideas
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">
                  Submit Idea
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* CONNECT */}
          <div>
            <h3 className="font-semibold text-white mb-4">Connect</h3>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-indigo-400 hover:bg-white/10 hover:border-indigo-500/50 transition-all">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-indigo-400 hover:bg-white/10 hover:border-indigo-500/50 transition-all">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-indigo-400 hover:bg-white/10 hover:border-indigo-500/50 transition-all">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-indigo-400 hover:bg-white/10 hover:border-indigo-500/50 transition-all">
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>

        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} SparkHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}