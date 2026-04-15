"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2, Lightbulb, Sparkles, Rocket, CheckCircle2 } from 'lucide-react';
import { SpaceBackground } from '@/components/3d/SpaceBackground';
import { GlassCard } from '@/components/3d/GlassCard';

const categories = [
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

export default function SubmitPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    imageUrl: '',
  });

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!user) {
    toast({
      title: "Error",
      description: "You must be logged in to submit an idea.",
      variant: "destructive",
    });
    return;
  }

  setLoading(true);

  const tagsArray = formData.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);

  const { data, error } = await supabase
    .from("ideas")
    .insert([
      {
        user_id: user.id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        tags: tagsArray,
        image_url: formData.imageUrl || null,
        status: "published",
      },
    ]);

  console.log("Insert result:", data);
  console.log("Insert error:", error);

  if (error) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
  } else {
    toast({
      title: "Success!",
      description: "Your idea has been submitted successfully.",
    });

    router.push("/dashboard");
  }

  setLoading(false);
};

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
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="inline-block mb-4"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse" />
                      <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-full">
                        <Lightbulb className="w-10 h-10 text-white" />
                      </div>
                    </div>
                  </motion.div>
                  
                  <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                    Submit Your Idea
                  </h1>
                  <p className="text-gray-300 text-lg">
                    Share your startup vision with the community
                  </p>
                </div>

                {/* Main Form Card */}
                <GlassCard className="mb-8">
                  <div className="p-8">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Rocket className="w-6 h-6 text-indigo-400" />
                        Idea Details
                      </h2>
                      <p className="text-gray-400 mt-2">
                        Fill in the information about your startup idea
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Title */}
                      <motion.div 
                        className="space-y-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <Label htmlFor="title" className="text-gray-200 font-medium">
                          Idea Title <span className="text-red-400">*</span>
                        </Label>
                        <Input
                          id="title"
                          placeholder="e.g., AI-Powered Task Manager"
                          value={formData.title}
                          onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                          }
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-indigo-500 h-12"
                          required
                        />
                      </motion.div>

                      {/* Description */}
                      <motion.div 
                        className="space-y-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Label htmlFor="description" className="text-gray-200 font-medium">
                          Description <span className="text-red-400">*</span>
                        </Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your idea, the problem it solves, and your target audience..."
                          value={formData.description}
                          onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                          }
                          rows={6}
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-indigo-500 resize-none"
                          required
                        />
                        <p className="text-sm text-gray-500">
                          Minimum 50 characters. Be descriptive and clear.
                        </p>
                      </motion.div>

                      {/* Category & Tags Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Category */}
                        <motion.div 
                          className="space-y-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <Label htmlFor="category" className="text-gray-200 font-medium">
                            Category <span className="text-red-400">*</span>
                          </Label>
                          <Select
                            value={formData.category}
                            onValueChange={(value) =>
                              setFormData({ ...formData, category: value })
                            }
                            required
                          >
                            <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
                              <SelectValue placeholder="Select a category" />
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
                        </motion.div>

                        {/* Tags */}
                        <motion.div 
                          className="space-y-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <Label htmlFor="tags" className="text-gray-200 font-medium">
                            Tags
                          </Label>
                          <Input
                            id="tags"
                            placeholder="e.g., productivity, AI, mobile"
                            value={formData.tags}
                            onChange={(e) =>
                              setFormData({ ...formData, tags: e.target.value })
                            }
                            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-indigo-500 h-12"
                          />
                          <p className="text-sm text-gray-500">
                            Separate tags with commas
                          </p>
                        </motion.div>
                      </div>

                      {/* Image URL */}
                      <motion.div 
                        className="space-y-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Label htmlFor="imageUrl" className="text-gray-200 font-medium">
                          Image URL (Optional)
                        </Label>
                        <Input
                          id="imageUrl"
                          type="url"
                          placeholder="https://example.com/image.jpg"
                          value={formData.imageUrl}
                          onChange={(e) =>
                            setFormData({ ...formData, imageUrl: e.target.value })
                          }
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-indigo-500 h-12"
                        />
                        <p className="text-sm text-gray-500">
                          Add a visual to make your idea stand out
                        </p>
                      </motion.div>

                      {/* Buttons */}
                      <motion.div 
                        className="flex gap-4 pt-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <Button
                          type="submit"
                          className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white h-12 text-lg shadow-lg shadow-indigo-500/50"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Sparkles className="mr-2 h-5 w-5" />
                              Submit Idea
                            </>
                          )}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => router.push('/dashboard')}
                          disabled={loading}
                          className="border-white/20 text-gray-300 hover:text-white hover:bg-white/5 h-12"
                        >
                          Cancel
                        </Button>
                      </motion.div>
                    </form>
                  </div>
                </GlassCard>

                {/* Tips Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <GlassCard>
                    <div className="p-6">
                      <h3 className="font-semibold text-white mb-4 flex items-center gap-2 text-lg">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                        Tips for Success
                      </h3>
                      <ul className="space-y-3 text-sm text-gray-300">
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2" />
                          <span>Be clear and concise about the problem you're solving</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2" />
                          <span>Explain what makes your solution unique</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2" />
                          <span>Use relevant tags to help people discover your idea</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2" />
                          <span>Add a compelling image to increase engagement</span>
                        </li>
                      </ul>
                    </div>
                  </GlassCard>
                </motion.div>
              </motion.div>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </ProtectedRoute>
  );
}