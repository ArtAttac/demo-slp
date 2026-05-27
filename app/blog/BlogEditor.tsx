'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface BlogPost {
  slug: string;
  title: string;
  body: string;
  imageUrl?: string;
  createdAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Decodes HTML entities stored in blog post titles.
 * Handles both numeric (&#8217;) and named (&amp;) entities.
 */
function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

// ─────────────────────────────────────────────────────────────────────────────
// ImageUploader
//
// Lets the editor pick a featured image, uploads it immediately to Vercel Blob
// via /api/blog/upload, and returns the resulting public URL via onUpload().
//
// Props:
//   editKey    — the blog edit key (needed to authenticate the upload)
//   currentUrl — pre-populated URL when editing an existing post
//   onUpload   — called with the new Vercel Blob URL after a successful upload
//   onRemove   — called when the user removes the current image
// ─────────────────────────────────────────────────────────────────────────────

interface ImageUploaderProps {
  editKey: string;
  currentUrl: string;
  onUpload: (url: string) => void;
  onRemove: () => void;
}

function ImageUploader({ editKey, currentUrl, onUpload, onRemove }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
    setUploadError('');
    setIsUploading(true);
    try {
      const form = new FormData();
      form.append('editKey', editKey);
      form.append('image', file);

      const res = await fetch('/api/blog/upload', { method: 'POST', body: form });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error ?? 'Upload failed');
      onUpload(data.url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelection = (files: FileList | null) => {
    if (files?.length) uploadFile(files[0]);
  };

  // Show the uploaded image with a remove button
  if (currentUrl) {
    return (
      <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
        <div className="relative h-48 w-full">
          <Image
            src={currentUrl}
            alt="Featured image preview"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-2 right-2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors"
          title="Remove image"
        >
          <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    );
  }

  // Show the drag-and-drop / click-to-upload zone
  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFileSelection(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={`flex flex-col items-center justify-center gap-2 h-36 rounded-xl border-2 border-dashed cursor-pointer transition-colors ${
          isDragging
            ? 'border-brand-bluePurple bg-brand-bluePurple/5'
            : 'border-gray-300 bg-gray-50 hover:border-brand-bluePurple hover:bg-brand-bluePurple/5'
        }`}
      >
        {isUploading ? (
          <>
            <div className="w-7 h-7 border-4 border-brand-bluePurple/30 border-t-brand-bluePurple rounded-full animate-spin" />
            <p className="text-sm text-gray-500">Uploading…</p>
          </>
        ) : (
          <>
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-gray-600 font-medium">Click to upload or drag &amp; drop</p>
            <p className="text-xs text-gray-400">JPEG, PNG, WebP or GIF · max 5 MB</p>
          </>
        )}
      </div>
      {/* Hidden file input — triggered by clicking the zone above */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => handleFileSelection(e.target.files)}
      />
      {uploadError && <p className="mt-1.5 text-sm text-red-600">{uploadError}</p>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BlogEditorContent (main component)
// ─────────────────────────────────────────────────────────────────────────────

function BlogEditorContent({ initialPosts }: { initialPosts: BlogPost[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isEditMode = searchParams.get('blogEdit') === 'yes';

  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);

  // Form state
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [editKey, setEditKey] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // ── Markdown toolbar helpers ────────────────────────────────────────────────

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
      const cursorPos = selected.length > 0
        ? start + prefix.length + selected.length + suffix.length
        : start + prefix.length;
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
      textarea.setSelectionRange(start + markdown.length, start + markdown.length);
    });
  }, [body]);

  const insertImage = useCallback(() => {
    const textarea = bodyRef.current;
    if (!textarea) return;
    const url = prompt('Paste the image URL:');
    if (!url) return;
    const alt = prompt('Describe the image (alt text):') ?? '';
    const markdown = `\n![${alt}](${url})\n`;
    const pos = textarea.selectionStart;
    const newText = body.slice(0, pos) + markdown + body.slice(pos);
    setBody(newText);
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(pos + markdown.length, pos + markdown.length);
    });
  }, [body]);

  // ── Form actions ────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('sending');

    try {
      const isEditing = editingSlug !== null;
      const payload = isEditing
        ? { slug: editingSlug, title, body, imageUrl: imageUrl || undefined, editKey }
        : { title, body, imageUrl: imageUrl || undefined, editKey };

      const res = await fetch('/api/blog', {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
        setImageUrl('');
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
    setImageUrl(post.imageUrl ?? '');
    setSubmitStatus('idle');
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const cancelEditing = () => {
    setEditingSlug(null);
    setTitle('');
    setBody('');
    setImageUrl('');
    setSubmitStatus('idle');
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-4xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* ── Edit Mode: New / Edit Post Form ─────────────────────────────────── */}
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

            {/* Edit Key */}
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

            {/* Title */}
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

            {/* Featured Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Featured Image{' '}
                <span className="font-normal text-gray-400">(optional)</span>
              </label>
              {editKey ? (
                <ImageUploader
                  editKey={editKey}
                  currentUrl={imageUrl}
                  onUpload={setImageUrl}
                  onRemove={() => setImageUrl('')}
                />
              ) : (
                <p className="text-sm text-gray-400 italic px-4 py-3 rounded-xl border border-dashed border-gray-200 bg-gray-50">
                  Enter your edit key above to enable image upload.
                </p>
              )}
            </div>

            {/* Body with Edit / Preview toggle */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="postBody" className="block text-sm font-semibold text-gray-800">
                  Body *
                </label>
                <div className="flex rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setShowPreview(false)}
                    className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                      !showPreview
                        ? 'bg-brand-bluePurple text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPreview(true)}
                    className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                      showPreview
                        ? 'bg-brand-bluePurple text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Preview
                  </button>
                </div>
              </div>

              {showPreview ? (
                <div className="w-full min-h-[288px] rounded-xl border border-gray-200 bg-white overflow-hidden">
                  {body ? (
                    <>
                      {/* Preview: featured image */}
                      {imageUrl && (
                        <div className="relative h-48 w-full">
                          <Image
                            src={imageUrl}
                            alt="Featured image preview"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 800px"
                          />
                        </div>
                      )}
                      <div className="px-4 py-3 prose prose-lg max-w-none text-gray-700 leading-relaxed prose-headings:text-gray-900 prose-strong:text-gray-900 prose-a:text-brand-bluePurple prose-a:underline hover:prose-a:text-brand-darkBlue prose-img:rounded-xl prose-img:shadow-md prose-img:mx-auto prose-img:w-full">
                        {title && (
                          <h1 className="text-3xl font-body font-bold text-gray-900 mb-6">{title}</h1>
                        )}
                        <ReactMarkdown remarkPlugins={[remarkBreaks]}>{body}</ReactMarkdown>
                      </div>
                    </>
                  ) : (
                    <p className="px-4 py-3 text-gray-400 italic">Nothing to preview yet. Write something in the editor first.</p>
                  )}
                </div>
              ) : (
                <>
                  {/* Formatting Toolbar */}
                  <div className="flex items-center gap-1 mb-2 p-2 bg-gray-50 rounded-xl border border-gray-200">
                    <button type="button" onClick={() => insertFormatting('**', '**')} className="px-3 py-1.5 text-sm font-bold text-gray-700 hover:bg-white hover:text-brand-bluePurple rounded-lg transition-colors" title="Bold">B</button>
                    <button type="button" onClick={() => insertFormatting('*', '*')} className="px-3 py-1.5 text-sm italic text-gray-700 hover:bg-white hover:text-brand-bluePurple rounded-lg transition-colors" title="Italic">I</button>
                    <div className="w-px h-6 bg-gray-300 mx-1" />
                    <button type="button" onClick={() => insertFormatting('# ', '')} className="px-3 py-1.5 text-sm font-bold text-gray-700 hover:bg-white hover:text-brand-bluePurple rounded-lg transition-colors" title="Large heading">H1</button>
                    <button type="button" onClick={() => insertFormatting('## ', '')} className="px-3 py-1.5 text-sm font-bold text-gray-700 hover:bg-white hover:text-brand-bluePurple rounded-lg transition-colors" title="Medium heading">H2</button>
                    <button type="button" onClick={() => insertFormatting('### ', '')} className="px-3 py-1.5 text-sm font-bold text-gray-700 hover:bg-white hover:text-brand-bluePurple rounded-lg transition-colors" title="Small heading">H3</button>
                    <div className="w-px h-6 bg-gray-300 mx-1" />
                    <button type="button" onClick={() => insertFormatting('- ', '')} className="px-3 py-1.5 text-sm text-gray-700 hover:bg-white hover:text-brand-bluePurple rounded-lg transition-colors" title="Bullet list">&bull;</button>
                    <button type="button" onClick={() => insertFormatting('1. ', '')} className="px-3 py-1.5 text-sm text-gray-700 hover:bg-white hover:text-brand-bluePurple rounded-lg transition-colors" title="Numbered list">1.</button>
                    <div className="w-px h-6 bg-gray-300 mx-1" />
                    <button type="button" onClick={insertImage} className="px-3 py-1.5 text-sm text-gray-700 hover:bg-white hover:text-brand-bluePurple rounded-lg transition-colors" title="Insert image">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button type="button" onClick={insertLink} className="px-3 py-1.5 text-sm text-gray-700 hover:bg-white hover:text-brand-bluePurple rounded-lg transition-colors" title="Insert link">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </button>
                    <button type="button" onClick={() => insertFormatting('\n', '')} className="px-3 py-1.5 text-sm text-gray-700 hover:bg-white hover:text-brand-bluePurple rounded-lg transition-colors" title="Line break">&#8629;</button>
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
                </>
              )}
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
                  ? (editingSlug ? 'Saving…' : 'Publishing…')
                  : (editingSlug ? 'Save Changes' : 'Publish Post')}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* ── Blog Post List ───────────────────────────────────────────────────── */}
      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">No blog posts yet. Stay tuned!</p>
        </div>
      ) : (
        <div className="lg:flex lg:gap-10 lg:items-start">
          {/* Sticky sidebar quick-nav (desktop only) */}
          <aside className="hidden lg:block lg:w-64 lg:flex-shrink-0 sticky top-24 self-start">
            <nav aria-label="Blog posts quick navigation" className="bg-white rounded-2xl border border-brand-darkBlue/10 shadow-sm p-5 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-bluePurple mb-3">
                All Posts
              </h3>
              <ul className="space-y-1.5">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <a
                      href={`#post-${post.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(`post-${post.slug}`)?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                        });
                      }}
                      className="block text-sm text-gray-700 hover:text-brand-bluePurple hover:bg-white/70 rounded-md px-2 py-1.5 leading-snug transition-colors line-clamp-2"
                      title={decodeHtmlEntities(post.title)}
                    >
                      {decodeHtmlEntities(post.title)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="flex-1 min-w-0 space-y-6 scroll-mt-24">
            {posts.map((post, index) => (
            <motion.article
              key={post.slug}
              id={`post-${post.slug}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="scroll-mt-24"
            >
              <div className="relative">
                <Link href={`/blog/${post.slug}`} className="block group">
                  <div className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:border-brand-bluePurple/20 transition-all duration-300 overflow-hidden">

                    {/* Featured image — only rendered when the post has one */}
                    {post.imageUrl && (
                      <div className="relative h-72 md:h-80 w-full">
                        <Image
                          src={post.imageUrl}
                          alt={`Featured image for ${decodeHtmlEntities(post.title)}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 800px"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      <time className="text-xs text-brand-bluePurple font-medium">
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      <h2 className="text-xl md:text-2xl font-body font-bold text-gray-900 mt-1.5 mb-2 group-hover:text-brand-bluePurple transition-colors">
                        {decodeHtmlEntities(post.title)}
                      </h2>
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                        {post.body.split('\n')[0].replace(/[#*_~`>]/g, '').trim()}
                      </p>
                      <span className="inline-block mt-3 text-brand-bluePurple font-semibold text-sm group-hover:underline">
                        Read more &rarr;
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Edit / Delete controls — only visible in edit mode */}
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
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BlogEditor (exported wrapper — handles the Suspense boundary needed for
// useSearchParams inside BlogEditorContent)
// ─────────────────────────────────────────────────────────────────────────────

export default function BlogEditor({ initialPosts }: { initialPosts: BlogPost[] }) {
  return (
    <Suspense fallback={
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center py-20">
          <div className="inline-block w-8 h-8 border-4 border-brand-bluePurple/30 border-t-brand-bluePurple rounded-full animate-spin" />
          <p className="mt-4 text-gray-500">Loading posts…</p>
        </div>
      </div>
    }>
      <BlogEditorContent initialPosts={initialPosts} />
    </Suspense>
  );
}
