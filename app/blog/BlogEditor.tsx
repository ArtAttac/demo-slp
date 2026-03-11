'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Suspense } from 'react';

interface BlogPost {
  slug: string;
  title: string;
  body: string;
  createdAt: string;
}

function BlogEditorContent({ initialPosts }: { initialPosts: BlogPost[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isEditMode = searchParams.get('blogEdit') === 'yes';

  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);

  // Edit mode state
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [editKey, setEditKey] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const insertFormatting = useCallback((prefix: string, suffix: string) => {
    const textarea = bodyRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = body.slice(start, end);
    const newText = body.slice(0, start) + prefix + selected + suffix + body.slice(end);
    setBody(newText);
    requestAnimationFrame(() => {
      textarea.focus();
      const cursorPos = selected.length > 0 ? start + prefix.length + selected.length + suffix.length : start + prefix.length;
      textarea.setSelectionRange(cursorPos, cursorPos);
    });
  }, [body]);

  const insertLink = useCallback(() => {
    const textarea = bodyRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = body.slice(start, end);
    const url = prompt('Enter URL:');
    if (!url) return;
    const linkText = selected || 'link text';
    const markdown = `[${linkText}](${url})`;
    const newText = body.slice(0, start) + markdown + body.slice(end);
    setBody(newText);
    requestAnimationFrame(() => {
      textarea.focus();
      const cursorPos = start + markdown.length;
      textarea.setSelectionRange(cursorPos, cursorPos);
    });
  }, [body]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('sending');

    try {
      const isEditing = editingSlug !== null;
      const res = await fetch('/api/blog', {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          isEditing
            ? { slug: editingSlug, title, body, editKey }
            : { title, body, editKey }
        ),
      });

      if (res.ok) {
        const post = await res.json();
        if (isEditing) {
          setPosts((prev) => prev.map((p) => (p.slug === editingSlug ? post : p)));
          setEditingSlug(null);
        } else {
          setPosts((prev) => [post, ...prev]);
        }
        setTitle('');
        setBody('');
        setSubmitStatus('success');
        router.refresh();
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } else {
        const errData = await res.json().catch(() => null);
        console.error('Blog publish error:', res.status, errData);
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    }
  };

  const startEditing = (post: BlogPost) => {
    setEditingSlug(post.slug);
    setTitle(post.title);
    setBody(post.body);
    setSubmitStatus('idle');
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const cancelEditing = () => {
    setEditingSlug(null);
    setTitle('');
    setBody('');
    setSubmitStatus('idle');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Edit Mode - New Post Form */}
      {isEditMode && (
        <motion.div
          ref={formRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 bg-gradient-to-br from-brand-cream to-white rounded-2xl p-8 shadow-lg border-2 border-brand-bluePurple/20"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-brand-darkBlue">
              {editingSlug ? 'Edit Blog Post' : 'New Blog Post'}
            </h2>
            {editingSlug && (
              <button
                type="button"
                onClick={cancelEditing}
                className="text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors"
              >
                Cancel Edit
              </button>
            )}
          </div>
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
              {/* Formatting Toolbar */}
              <div className="flex items-center gap-1 mb-2 p-2 bg-gray-50 rounded-xl border border-gray-200">
                <button
                  type="button"
                  onClick={() => insertFormatting('**', '**')}
                  className="px-3 py-1.5 text-sm font-bold text-gray-700 hover:bg-white hover:text-brand-bluePurple rounded-lg transition-colors"
                  title="Bold"
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('*', '*')}
                  className="px-3 py-1.5 text-sm italic text-gray-700 hover:bg-white hover:text-brand-bluePurple rounded-lg transition-colors"
                  title="Italic"
                >
                  I
                </button>
                <div className="w-px h-6 bg-gray-300 mx-1" />
                <button
                  type="button"
                  onClick={() => insertFormatting('# ', '')}
                  className="px-3 py-1.5 text-sm font-bold text-gray-700 hover:bg-white hover:text-brand-bluePurple rounded-lg transition-colors"
                  title="Large heading"
                >
                  H1
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('## ', '')}
                  className="px-3 py-1.5 text-sm font-bold text-gray-700 hover:bg-white hover:text-brand-bluePurple rounded-lg transition-colors"
                  title="Medium heading"
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('### ', '')}
                  className="px-3 py-1.5 text-sm font-bold text-gray-700 hover:bg-white hover:text-brand-bluePurple rounded-lg transition-colors"
                  title="Small heading"
                >
                  H3
                </button>
                <div className="w-px h-6 bg-gray-300 mx-1" />
                <button
                  type="button"
                  onClick={() => insertFormatting('- ', '')}
                  className="px-3 py-1.5 text-sm text-gray-700 hover:bg-white hover:text-brand-bluePurple rounded-lg transition-colors"
                  title="Bullet list"
                >
                  &bull;
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('1. ', '')}
                  className="px-3 py-1.5 text-sm text-gray-700 hover:bg-white hover:text-brand-bluePurple rounded-lg transition-colors"
                  title="Numbered list"
                >
                  1.
                </button>
                <div className="w-px h-6 bg-gray-300 mx-1" />
                <button
                  type="button"
                  onClick={insertLink}
                  className="px-3 py-1.5 text-sm text-gray-700 hover:bg-white hover:text-brand-bluePurple rounded-lg transition-colors"
                  title="Insert link"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('\n', '')}
                  className="px-3 py-1.5 text-sm text-gray-700 hover:bg-white hover:text-brand-bluePurple rounded-lg transition-colors"
                  title="Line break"
                >
                  &#8629;
                </button>
              </div>
              <textarea
                ref={bodyRef}
                id="postBody"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
                rows={12}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-bluePurple/50 focus:border-brand-bluePurple transition-colors text-gray-800 resize-y font-mono text-sm"
                placeholder="Write your blog post here. Use **bold**, *italic*, and # headings for formatting."
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
                {submitStatus === 'sending'
                  ? (editingSlug ? 'Saving...' : 'Publishing...')
                  : (editingSlug ? 'Save Changes' : 'Publish Post')}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Blog Posts */}
      {posts.length === 0 ? (
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
                      {post.body.split('\n')[0].replace(/[#*_~`>]/g, '').trim()}
                    </p>
                    <span className="inline-block mt-4 text-brand-bluePurple font-semibold text-sm group-hover:underline">
                      Read more &rarr;
                    </span>
                  </div>
                </Link>
                {isEditMode && (
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <button
                      onClick={() => startEditing(post)}
                      className="w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition-colors"
                      title="Edit post"
                    >
                      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={async () => {
                        const key = prompt(`Enter edit key to delete "${post.title}":`);
                        if (!key) return;
                        const res = await fetch('/api/blog', {
                          method: 'DELETE',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ slug: post.slug, editKey: key }),
                        });
                        if (res.ok) {
                          setPosts((prev) => prev.filter((p) => p.slug !== post.slug));
                          router.refresh();
                        } else {
                          alert('Failed to delete. Check your edit key.');
                        }
                      }}
                      className="w-10 h-10 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors"
                      title="Delete post"
                    >
                      <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
}

export default function BlogEditor({ initialPosts }: { initialPosts: BlogPost[] }) {
  return (
    <Suspense fallback={
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center py-20">
          <div className="inline-block w-8 h-8 border-4 border-brand-bluePurple/30 border-t-brand-bluePurple rounded-full animate-spin" />
          <p className="mt-4 text-gray-500">Loading posts...</p>
        </div>
      </div>
    }>
      <BlogEditorContent initialPosts={initialPosts} />
    </Suspense>
  );
}
