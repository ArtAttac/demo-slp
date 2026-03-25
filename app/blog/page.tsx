import Link from 'next/link';
import BlogEditor from './BlogEditor';
import type { Metadata } from 'next';
import { getAbsoluteUrl, getAllBlogPosts, decodeHtmlEntities, createExcerpt, getPostLastModified } from '@/lib/blog';
import type { BlogPost } from '@/lib/redis';

const BLOG_URL = getAbsoluteUrl('/blog');
const BLOG_TITLE = 'Blog | Speech on the Slope';
const BLOG_DESCRIPTION = 'Tips, insights, and resources for supporting your child\'s speech, language, literacy, and sound development from the Speech on the Slope team.';

export const metadata: Metadata = {
  title: 'Blog',
  description: BLOG_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    url: BLOG_URL,
    type: 'website',
    images: [
      {
        url: getAbsoluteUrl('/mainmainlogo.png'),
        alt: 'Speech on the Slope Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    images: [getAbsoluteUrl('/mainmainlogo.png')],
  },
  alternates: {
    canonical: BLOG_URL,
    types: {
      'application/rss+xml': getAbsoluteUrl('/blog/rss.xml'),
    },
  },
};

export const revalidate = 3600; // revalidate every hour

export default async function BlogPage() {
  const posts: BlogPost[] = await getAllBlogPosts();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Speech on the Slope Blog',
    description: BLOG_DESCRIPTION,
    url: BLOG_URL,
    inLanguage: 'en-US',
    publisher: {
      '@type': 'Organization',
      name: 'Speech on the Slope',
      url: getAbsoluteUrl(),
      logo: {
        '@type': 'ImageObject',
        url: getAbsoluteUrl('/mainlogo.png'),
      },
    },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: decodeHtmlEntities(post.title),
      url: getAbsoluteUrl(`/blog/${post.slug}`),
      datePublished: post.createdAt,
      dateModified: getPostLastModified(post),
      description: createExcerpt(post.body, 220),
      ...(post.imageUrl ? { image: [post.imageUrl] } : {}),
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Our Blog
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Tips, insights, and resources for supporting your child&apos;s communication journey
          </p>
        </div>
      </section>

      <BlogEditor initialPosts={posts} />
    </div>
  );
}
