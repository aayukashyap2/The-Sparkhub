"use client";

import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, Lightbulb, Users, TrendingUp, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase, Idea } from '@/lib/supabase';
import { SpaceBackground } from '@/components/3d/SpaceBackground';
import { GlassCard } from '@/components/3d/GlassCard';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const [featuredIdeas, setFeaturedIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedIdeas() {
      const { data } = await supabase
        .from('ideas')
        .select('*, profiles(*)')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(3);

      if (data) {
        setFeaturedIdeas(data);
      }
      setLoading(false);
    }

    fetchFeaturedIdeas();
  }, []);

  return (
    <div className="min-h-screen relative">
      <SpaceBackground />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-40 left-20 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-3xl animate-pulse" />
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="relative z-10">
        <Navbar />

        <main className="pt-24 pb-16">
          {/* Hero Section */}
          <motion.section
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <Badge className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/30 px-4 py-1 text-sm backdrop-blur-xl">
                <Sparkles className="w-3 h-3 mr-1 inline" />
                Welcome to SparkHub
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent leading-tight"
            >
              Turn Your Startup Ideas
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                into Reality
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Join a community of innovators, share your ideas, and get mentorship or funding.
              Connect with founders, investors, and mentors who believe in your vision.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/explore">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-6 text-lg group shadow-lg shadow-indigo-500/50"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/explore">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 py-6 text-lg border-2 border-indigo-500/50 hover:border-indigo-400 text-indigo-300 hover:text-indigo-200 hover:bg-indigo-500/10 backdrop-blur-xl"
                >
                  Explore Ideas
                </Button>
              </Link>
            </motion.div>

            {/* Feature Cards */}
            <motion.div
              variants={fadeInUp}
              className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <GlassCard className="group">
                <CardHeader className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/50 group-hover:scale-110 transition-transform">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white text-xl">Share Ideas</CardTitle>
                  <CardDescription className="text-gray-300">
                    Submit your startup concepts and get feedback from the community
                  </CardDescription>
                </CardHeader>
              </GlassCard>

              <GlassCard className="group">
                <CardHeader className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-blue-500/50 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white text-xl">Find Collaborators</CardTitle>
                  <CardDescription className="text-gray-300">
                    Connect with co-founders, developers, and designers
                  </CardDescription>
                </CardHeader>
              </GlassCard>

              <GlassCard className="group">
                <CardHeader className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-purple-500/50 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white text-xl">Get Funded</CardTitle>
                  <CardDescription className="text-gray-300">
                    Pitch to investors and secure funding for your venture
                  </CardDescription>
                </CardHeader>
              </GlassCard>
            </motion.div>
          </motion.section>

          {/* Featured Ideas Section - keeping original for now */}
          {featuredIdeas.length > 0 && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">Featured Ideas</h2>
                <p className="text-gray-300">Discover the latest innovations from our community</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredIdeas.map((idea, index) => (
                  <motion.div
                    key={idea.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={`/ideas/${idea.id}`}>
                      <GlassCard className="h-full group cursor-pointer" hover3d={true}>
                        {idea.image_url ? (
                          <div className="aspect-video w-full bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-t-xl overflow-hidden">
                            <img
                              src={idea.image_url}
                              alt={idea.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        ) : (
                          <div className="aspect-video w-full bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-t-xl flex items-center justify-center">
                            <div className="text-6xl">💡</div>
                          </div>
                        )}
                        <CardHeader>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                              {idea.category}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl text-white line-clamp-2">
                            {idea.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-3 text-gray-300">
                            {idea.description}
                          </CardDescription>
                        </CardHeader>
                        {idea.profiles && (
                          <CardContent>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold">
                                {idea.profiles.full_name?.[0] || idea.profiles.email[0].toUpperCase()}
                              </div>
                              <span>{idea.profiles.full_name || idea.profiles.email}</span>
                            </div>
                          </CardContent>
                        )}
                      </GlassCard>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
          >
            <GlassCard className="group">
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20" />
                <CardHeader className="text-center p-12 relative z-10">
                  <CardTitle className="text-3xl md:text-4xl mb-4 text-white">
                    Ready to Launch Your Idea?
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-lg mb-8">
                    Join thousands of innovators who are already building the future
                  </CardDescription>
                  <Link href="/login">
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-6 text-lg shadow-lg shadow-indigo-500/50"
                    >
                      Get Started Today
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </CardHeader>
              </div>
            </GlassCard>
          </motion.section>
        </main>

        <Footer />
      </div>
    </div>
  );
}