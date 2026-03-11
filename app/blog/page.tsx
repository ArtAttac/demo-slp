'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Suspense } from 'react';

interface BlogPost {
  slug: string;
  title: string;
  body: string;
  createdAt: string;
}

function BlogContent() {
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get('blogEdit') === 'yes';

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit mode state
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [editKey, setEditKey] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    fetch('/api/blog')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('sending');

    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body, editKey }),
      });

      if (res.ok) {
        const newPost = await res.json();
        setPosts((prev) => [newPost, ...prev]);
        setTitle('');
        setBody('');
        setSubmitStatus('success');
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center text-brand-darkBlue hover:text-brand-bluePurple font-medium transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <Link href="/#contact" className="px-5 py-2 bg-brand-bluePurple text-white text-sm font-semibold rounded-full hover:bg-brand-darkBlue transition-colors">
            Contact Us
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-br from-brand-darkBlue via-brand-bluePurple/90 to-brand-pink/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Our Blog
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Tips, insights, and resources for supporting your child&apos;s communication journey
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Edit Mode - New Post Form */}
        {isEditMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 bg-gradient-to-br from-brand-cream to-white rounded-2xl p-8 shadow-lg border-2 border-brand-bluePurple/20"
          >
            <h2 className="text-2xl font-bold text-brand-darkBlue mb-6">New Blog Post</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="editKey" className="block text-sm font-semibold text-gray-800 mb-2">
                  Edit Key *
                </label>
                <input
                  type="password"
                  id="editKey"
                  value={editKey}
                  onChange={(e) => setEditKey(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-bluePurple/50 focus:border-brand-bluePurple transition-colors text-gray-800"
                  placeholder="Enter your edit key"
                />
              </div>
              <div>
                <label htmlFor="postTitle" className="block text-sm font-semibold text-gray-800 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  id="postTitle"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-bluePurple/50 focus:border-brand-bluePurple transition-colors text-gray-800"
                  placeholder="Blog post title"
                />
              </div>
              <div>
                <label htmlFor="postBody" className="block text-sm font-semibold text-gray-800 mb-2">
                  Body *
                </label>
                <textarea
                  id="postBody"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                  rows={12}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-bluePurple/50 focus:border-brand-bluePurple transition-colors text-gray-800 resize-y font-mono text-sm"
                  placeholder="Write your blog post here. Use double newlines for paragraph breaks."
                />
              </div>

              {submitStatus === 'success' && (
                <p className="text-green-600 text-sm text-center font-medium">Post published successfully!</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-600 text-sm text-center">Failed to publish. Check your edit key and try again.</p>
              )}

              <div className="text-center">
                <button
                  type="submit"
                  disabled={submitStatus === 'sending'}
                  className="inline-block px-10 py-4 bg-gradient-to-r from-brand-bluePurple to-brand-pink text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:hover:scale-100"
                >
                  {submitStatus === 'sending' ? 'Publishing...' : 'Publish Post'}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Blog Posts */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-brand-bluePurple/30 border-t-brand-bluePurple rounded-full animate-spin" />
            <p className="mt-4 text-gray-500">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No blog posts yet. Stay tuned!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block group"
                  >
                    <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 hover:shadow-xl hover:border-brand-bluePurple/20 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <time className="text-sm text-brand-bluePurple font-medium">
                          {new Date(post.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-brand-bluePurple transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 leading-relaxed line-clamp-3">
                        {post.body.split('\n')[0]}
                      </p>
                      <span className="inline-block mt-4 text-brand-bluePurple font-semibold text-sm group-hover:underline">
                        Read more &rarr;
                      </span>
                    </div>
                  </Link>
                  {isEditMode && (
                    <button
                      onClick={async () => {
                        if (!confirm(`Delete "${post.title}"?`)) return;
                        const res = await fetch('/api/blog', {
                          method: 'DELETE',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ slug: post.slug, editKey }),
                        });
                        if (res.ok) {
                          setPosts((prev) => prev.filter((p) => p.slug !== post.slug));
                        } else {
                          alert('Failed to delete. Check your edit key.');
                        }
                      }}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors"
                      title="Delete post"
                    >
                      <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="inline-block w-8 h-8 border-4 border-brand-bluePurple/30 border-t-brand-bluePurple rounded-full animate-spin" />
      </div>
    }>
      <BlogContent />
    </Suspense>
  );
}
