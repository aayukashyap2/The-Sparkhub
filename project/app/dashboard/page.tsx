"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, Idea } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Lightbulb, TrendingUp, Eye, Trash2, Sparkles, Zap, Target } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { SpaceBackground } from '@/components/3d/SpaceBackground';
import { GlassCard } from '@/components/3d/GlassCard';
import { TiltCard } from '@/components/3d/TiltCard';

export default function DashboardPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [stats, setStats] = useState({ total: 0, views: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserIdeas();
    }
  }, [user]);

  async function fetchUserIdeas() {
    const { data } = await supabase
      .from('ideas')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });

    if (data) {
      setIdeas(data);
      setStats({
        total: data.length,
        views: data.reduce((acc, idea) => acc + idea.views, 0),
      });
    }
    setLoading(false);
  }

  async function handleDelete(ideaId: string) {
    const confirmed = confirm('Are you sure you want to delete this idea?');
    if (!confirmed) return;

    const { error } = await supabase.from('ideas').delete().eq('id', ideaId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete idea',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Idea deleted successfully',
      });
      fetchUserIdeas();
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen relative">
        <SpaceBackground />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-40 left-20 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="relative z-10">
          <Navbar />

          <main className="pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      className="inline-block mb-3"
                    >
                      <Badge className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/30 px-3 py-1 backdrop-blur-xl">
                        <Zap className="w-3 h-3 mr-1 inline" />
                        Your Command Center
                      </Badge>
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                      My Dashboard
                    </h1>
                    <p className="text-gray-300 text-lg">
                      Manage your ideas and track their performance
                    </p>
                  </div>
                  <Link href="/submit">
                    <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/50 h-12 px-6">
                      <Plus className="w-5 h-5 mr-2" />
                      Submit New Idea
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Stats Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
              >
                {/* Total Ideas */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <GlassCard className="group cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-300">Total Ideas</CardTitle>
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/50 group-hover:scale-110 transition-transform">
                        <Lightbulb className="h-5 w-5 text-white" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-300 bg-clip-text text-transparent">
                        {stats.total}
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        Ideas you've submitted
                      </p>
                    </CardContent>
                  </GlassCard>
                </motion.div>

                {/* Total Views */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <GlassCard className="group cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-300">Total Views</CardTitle>
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/50 group-hover:scale-110 transition-transform">
                        <Eye className="h-5 w-5 text-white" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                        {stats.views}
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        Across all your ideas
                      </p>
                    </CardContent>
                  </GlassCard>
                </motion.div>

                {/* Engagement */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <GlassCard className="group cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-300">Engagement</CardTitle>
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/50 group-hover:scale-110 transition-transform">
                        <TrendingUp className="h-5 w-5 text-white" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
                        {stats.total > 0 ? Math.round(stats.views / stats.total) : 0}
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        Avg views per idea
                      </p>
                    </CardContent>
                  </GlassCard>
                </motion.div>
              </motion.div>

              {/* Ideas Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-3xl font-bold text-white">Your Ideas</h2>
                  <Sparkles className="w-6 h-6 text-indigo-400" />
                </div>

                {loading ? (
                  <GlassCard>
                    <CardContent className="py-12 text-center">
                      <div className="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4" />
                      <p className="text-gray-400">Loading your ideas...</p>
                    </CardContent>
                  </GlassCard>
                ) : ideas.length === 0 ? (
                  <GlassCard>
                    <CardContent className="py-16 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                      >
                        <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/50">
                          <Lightbulb className="w-10 h-10 text-white" />
                        </div>
                      </motion.div>
                      <h3 className="text-2xl font-semibold text-white mb-3">
                        No ideas yet
                      </h3>
                      <p className="text-gray-400 mb-8 max-w-md mx-auto">
                        Start by submitting your first startup idea and watch it grow
                      </p>
                      <Link href="/submit">
                        <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/50 h-12 px-8">
                          <Plus className="w-5 h-5 mr-2" />
                          Submit Your First Idea
                        </Button>
                      </Link>
                    </CardContent>
                  </GlassCard>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ideas.map((idea, index) => (
                      <motion.div
                        key={idea.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                      >
                        <TiltCard className="h-full">
                          <GlassCard className="h-full group" hover3d={false}>
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
                              <div className="flex items-center justify-between mb-2">
                                <Badge className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                                  {idea.category}
                                </Badge>
                                <div className="flex items-center gap-1 text-sm text-gray-400">
                                  <Eye className="w-4 h-4" />
                                  {idea.views}
                                </div>
                              </div>
                              <CardTitle className="text-xl text-white line-clamp-2 group-hover:text-indigo-300 transition-colors">
                                {idea.title}
                              </CardTitle>
                              <CardDescription className="line-clamp-3 text-gray-300">
                                {idea.description}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex gap-2">
                                <Link href={`/ideas/${idea.id}`} className="flex-1">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full border-indigo-500/50 text-indigo-300 hover:text-white hover:bg-indigo-500/20"
                                  >
                                    <Target className="w-4 h-4 mr-1" />
                                    View
                                  </Button>
                                </Link>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-red-500/50 text-red-300 hover:text-white hover:bg-red-500/20"
                                  onClick={() => handleDelete(idea.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </GlassCard>
                        </TiltCard>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </ProtectedRoute>
  );
}