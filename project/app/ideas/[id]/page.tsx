"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { supabase, Idea } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Calendar, User, ArrowLeft, Heart, MessageCircle, Share2, TrendingUp, Sparkles, Clock } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { SpaceBackground } from '@/components/3d/SpaceBackground';
import { GlassCard } from '@/components/3d/GlassCard';

export default function IdeaDetailPage() {
  const params = useParams();
  const [idea, setIdea] = useState<Idea | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (params.id) {
      fetchIdea(params.id as string);
      incrementViews(params.id as string);
    }
  }, [params.id]);

  async function fetchIdea(id: string) {
    const { data } = await supabase
      .from('ideas')
      .select('*, profiles(*)')
      .eq('id', id)
      .maybeSingle();

    if (data) {
      setIdea(data);
      // Simulate likes based on views for demo
      setLikeCount(Math.floor(data.views * 0.3));
    }
    setLoading(false);
  }

  async function incrementViews(id: string) {
    const { data: currentIdea } = await supabase
      .from('ideas')
      .select('views')
      .eq('id', id)
      .maybeSingle();

    if (currentIdea) {
      await supabase
        .from('ideas')
        .update({ views: currentIdea.views + 1 })
        .eq('id', id);
    }
  }

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const getPopularityLevel = (views: number) => {
    if (views >= 100) return { level: 'Viral', color: 'from-pink-500 to-rose-500', icon: '🔥' };
    if (views >= 50) return { level: 'Trending', color: 'from-orange-500 to-yellow-500', icon: '📈' };
    if (views >= 20) return { level: 'Growing', color: 'from-green-500 to-emerald-500', icon: '🌱' };
    return { level: 'New', color: 'from-blue-500 to-cyan-500', icon: '✨' };
  };

  if (loading) {
    return (
      <div className="min-h-screen relative">
        <SpaceBackground />
        <div className="relative z-10">
          <Navbar />
          <div className="pt-24 pb-16 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-gray-400">Loading idea...</p>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="min-h-screen relative">
        <SpaceBackground />
        <div className="relative z-10">
          <Navbar />
          <div className="pt-24 pb-16 max-w-4xl mx-auto px-4">
            <GlassCard>
              <CardContent className="py-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-bold text-white mb-2">Idea not found</h2>
                <p className="text-gray-400 mb-6">This idea may have been removed or does not exist.</p>
                <Link href="/explore">
                  <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                    Back to Explore
                  </Button>
                </Link>
              </CardContent>
            </GlassCard>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  const popularity = getPopularityLevel(idea.views);

  return (
    <div className="min-h-screen relative">
      <SpaceBackground />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-40 left-20 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-3xl animate-pulse" />
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="relative z-10">
        <Navbar />

        <main className="pt-24 pb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Back Button */}
              <Link href="/explore">
                <Button 
                  variant="outline" 
                  className="mb-6 border-white/20 text-gray-300 hover:text-white hover:bg-white/5"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Explore
                </Button>
              </Link>

              {/* Hero Image */}
              {idea.image_url && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="aspect-video w-full bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-2xl overflow-hidden mb-8 shadow-2xl"
                >
                  <img
                    src={idea.image_url}
                    alt={idea.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )}

              {/* Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Title & Info Card */}
                  <GlassCard>
                    <CardHeader>
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <Badge className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-sm px-3 py-1">
                          {idea.category}
                        </Badge>
                        {idea.tags.map((tag) => (
                          <Badge 
                            key={tag} 
                            variant="outline" 
                            className="border-white/20 text-gray-400"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <CardTitle className="text-3xl md:text-4xl mb-4 text-white leading-tight">
                        {idea.title}
                      </CardTitle>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                        {idea.profiles && (
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{idea.profiles.full_name || idea.profiles.email}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(idea.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{Math.ceil(idea.description.length / 200)} min read</span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="prose prose-lg prose-invert max-w-none">
                        <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                          {idea.description}
                        </p>
                      </div>
                    </CardContent>
                  </GlassCard>

                  {/* Engagement Actions */}
                  <GlassCard>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={handleLike}
                            className={`border-white/20 ${
                              liked 
                                ? 'bg-pink-500/20 text-pink-400 border-pink-500/50' 
                                : 'text-gray-300 hover:text-pink-400 hover:bg-pink-500/10'
                            }`}
                          >
                            <Heart className={`w-5 h-5 mr-2 ${liked ? 'fill-current' : ''}`} />
                            {likeCount}
                          </Button>

                          <Button
                            variant="outline"
                            size="lg"
                            className="border-white/20 text-gray-300 hover:text-blue-400 hover:bg-blue-500/10"
                          >
                            <MessageCircle className="w-5 h-5 mr-2" />
                            {Math.floor(idea.views * 0.15)}
                          </Button>

                          <Button
                            variant="outline"
                            size="lg"
                            className="border-white/20 text-gray-300 hover:text-green-400 hover:bg-green-500/10"
                          >
                            <Share2 className="w-5 h-5 mr-2" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </GlassCard>

                  {/* Creator Info */}
                  {idea.profiles && (
                    <GlassCard>
                      <CardHeader>
                        <CardTitle className="text-xl text-white flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-indigo-400" />
                          About the Creator
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white text-2xl font-semibold flex-shrink-0 shadow-lg shadow-indigo-500/50">
                            {idea.profiles.full_name?.[0] || idea.profiles.email[0].toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-white">
                              {idea.profiles.full_name || 'Anonymous'}
                            </h3>
                            <p className="text-gray-400">{idea.profiles.email}</p>
                            {idea.profiles.bio && (
                              <p className="text-gray-300 mt-2">{idea.profiles.bio}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </GlassCard>
                  )}
                </div>

                {/* Right Column - Stats & Popularity */}
                <div className="space-y-6">
                  {/* Popularity Card */}
                  <GlassCard>
                    <CardHeader>
                      <CardTitle className="text-lg text-white flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-indigo-400" />
                        Popularity
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Popularity Badge */}
                      <div className={`bg-gradient-to-r ${popularity.color} p-4 rounded-xl text-center`}>
                        <div className="text-4xl mb-2">{popularity.icon}</div>
                        <div className="text-white font-bold text-xl">{popularity.level}</div>
                      </div>

                      {/* Stats */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center gap-2 text-gray-400">
                            <Eye className="w-4 h-4" />
                            <span>Views</span>
                          </div>
                          <span className="text-white font-semibold">{idea.views}</span>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center gap-2 text-gray-400">
                            <Heart className="w-4 h-4" />
                            <span>Likes</span>
                          </div>
                          <span className="text-white font-semibold">{likeCount}</span>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center gap-2 text-gray-400">
                            <MessageCircle className="w-4 h-4" />
                            <span>Comments</span>
                          </div>
                          <span className="text-white font-semibold">{Math.floor(idea.views * 0.15)}</span>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center gap-2 text-gray-400">
                            <Share2 className="w-4 h-4" />
                            <span>Shares</span>
                          </div>
                          <span className="text-white font-semibold">{Math.floor(idea.views * 0.1)}</span>
                        </div>
                      </div>

                      {/* Engagement Rate */}
                      <div className="pt-4 border-t border-white/10">
                        <div className="text-center">
                          <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                            {Math.round((likeCount / idea.views) * 100)}%
                          </div>
                          <div className="text-sm text-gray-400 mt-1">Engagement Rate</div>
                        </div>
                      </div>
                    </CardContent>
                  </GlassCard>

                  {/* Related Tags */}
                  <GlassCard>
                    <CardHeader>
                      <CardTitle className="text-lg text-white">Related Tags</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {idea.tags.map((tag) => (
                          <Badge 
                            key={tag}
                            className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/30 cursor-pointer"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </GlassCard>
                </div>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}