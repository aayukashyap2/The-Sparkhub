"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { supabase, Idea } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { SpaceBackground } from '@/components/3d/SpaceBackground';
import { TiltCard } from '@/components/3d/TiltCard';
import { GlassCard } from '@/components/3d/GlassCard';

const categories = [
  'All',
  'SaaS',
  'E-commerce',
  'FinTech',
  'HealthTech',
  'EdTech',
  'Social Media',
  'AI/ML',
  'Blockchain',
  'IoT',
  'Gaming',
  'Marketplace',
  'Other',
];

export default function ExplorePage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [filteredIdeas, setFilteredIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchIdeas();
  }, []);

  useEffect(() => {
    filterIdeas();
  }, [searchQuery, selectedCategory, ideas]);

  async function fetchIdeas() {
    const { data } = await supabase
      .from('ideas')
      .select('*, profiles(*)')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (data) {
      setIdeas(data);
      setFilteredIdeas(data);
    }
    setLoading(false);
  }

  function filterIdeas() {
    let filtered = ideas;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((idea) => idea.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (idea) =>
          idea.title.toLowerCase().includes(query) ||
          idea.description.toLowerCase().includes(query) ||
          idea.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    setFilteredIdeas(filtered);
  }

  return (
    <div className="min-h-screen relative">
      <SpaceBackground />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-40 left-20 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-3xl animate-pulse" />
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="relative z-10">
        <Navbar />

        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="inline-block mb-4"
              >
                <Badge className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/30 px-4 py-1 text-sm backdrop-blur-xl">
                  <Sparkles className="w-3 h-3 mr-1 inline" />
                  Discover Innovation
                </Badge>
              </motion.div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                Explore Ideas
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Discover innovative startup ideas from our community of entrepreneurs
              </p>
            </motion.div>

            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8"
            >
              <GlassCard className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Search ideas by title, description, or tags..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div className="md:w-64">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="h-12 bg-white/5 border-white/10 text-white">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-white/10">
                        {categories.map((category) => (
                          <SelectItem 
                            key={category} 
                            value={category}
                            className="text-white hover:bg-white/10"
                          >
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
                  <span className="font-medium text-indigo-400">{filteredIdeas.length}</span>
                  {filteredIdeas.length === 1 ? 'idea' : 'ideas'} found
                </div>
              </GlassCard>
            </motion.div>

            {/* Ideas Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <GlassCard key={i} className="h-80 animate-pulse">
                    <div className="aspect-video w-full bg-white/5 rounded-t-xl" />
                    <CardHeader>
                      <div className="h-4 bg-white/10 rounded w-1/4 mb-2" />
                      <div className="h-6 bg-white/10 rounded w-3/4 mb-2" />
                      <div className="h-4 bg-white/10 rounded w-full" />
                    </CardHeader>
                  </GlassCard>
                ))}
              </div>
            ) : filteredIdeas.length === 0 ? (
              <GlassCard>
                <CardContent className="py-12 text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    No ideas found
                  </h3>
                  <p className="text-gray-400">
                    Try adjusting your search or filters
                  </p>
                </CardContent>
              </GlassCard>
            ) : (
              <motion.div
                initial="initial"
                animate="animate"
                variants={{
                  animate: {
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredIdeas.map((idea, index) => (
                  <motion.div
                    key={idea.id}
                    variants={{
                      initial: { opacity: 0, y: 20 },
                      animate: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Link href={`/ideas/${idea.id}`}>
                      <TiltCard className="h-full">
                        <GlassCard className="h-full cursor-pointer group" hover3d={false}>
                          {idea.image_url ? (
                            <div className="aspect-video w-full bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-t-xl overflow-hidden">
                              <img
                                src={idea.image_url}
                                alt={idea.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                          ) : (
                            <div className="aspect-video w-full bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-t-xl flex items-center justify-center">
                              <div className="text-6xl">💡</div>
                            </div>
                          )}
                          <CardHeader>
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <Badge className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                                {idea.category}
                              </Badge>
                              {idea.tags.slice(0, 2).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs border-white/20 text-gray-400">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <CardTitle className="text-xl text-white line-clamp-2 group-hover:text-indigo-300 transition-colors">
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
                      </TiltCard>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}