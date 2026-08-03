import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import type { Metadata } from 'next';
import { getAbsoluteUrl, getBlogPost, getBlogSlugs, getPostLastModified, decodeHtmlEntities, createExcerpt } from '@/lib/blog';

const FALLBACK_IMAGE = getAbsoluteUrl('/mainlogo.png');
const ARTICLE_KEYWORDS = [
  'Brooklyn speech therapy blog',
  'Park Slope speech therapy blog',
  'pediatric speech therapy',
  'speech therapy tips for parents',
  'speech and language development',
];

export const revalidate = 3600; // revalidate every hour

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: 'Post Not Found' };

  const title = decodeHtmlEntities(post.title);
  const description = createExcerpt(post.body);
  const url = getAbsoluteUrl(`/blog/${slug}`);
  const image = post.imageUrl ?? FALLBACK_IMAGE;
  const publishedTime = post.createdAt;
  const modifiedTime = getPostLastModified(post);

  return {
    title,
    description,
    authors: [{ name: 'Speech on the Slope' }],
    keywords: [title, ...ARTICLE_KEYWORDS],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      siteName: 'Speech on the Slope',
      publishedTime,
      modifiedTime,
      authors: ['Speech on the Slope'],
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const title = decodeHtmlEntities(post.title);
  const description = createExcerpt(post.body, 220);
  const url = getAbsoluteUrl(`/blog/${slug}`);
  const image = post.imageUrl ?? FALLBACK_IMAGE;
  const dateModified = getPostLastModified(post);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url,
    datePublished: post.createdAt,
    dateModified,
    image: [image],
    isAccessibleForFree: true,
    inLanguage: 'en-US',
    author: {
      '@type': 'Organization',
      name: 'Speech on the Slope',
      url: getAbsoluteUrl(),
    },
    publisher: {
      '@type': 'Organization',
      name: 'Speech on the Slope',
      url: getAbsoluteUrl(),
      logo: {
        '@type': 'ImageObject',
        url: getAbsoluteUrl('/mainlogo.png'),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Article */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div>
          <time className="text-sm text-brand-bluePurple font-medium">
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-body font-bold text-gray-900 mt-3 mb-8 leading-tight">
            {title}
          </h1>

          <div className="w-16 h-1 bg-gradient-to-r from-brand-bluePurple to-brand-pink rounded-full mb-10" />

          {/* Featured image — shown when the post has one */}
          {post.imageUrl && (
            <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-10">
              <Image
                src={post.imageUrl}
                alt={`Featured image for ${title}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed prose-headings:text-gray-900 prose-strong:text-gray-900 prose-a:text-brand-bluePurple prose-a:underline hover:prose-a:text-brand-darkBlue prose-img:rounded-xl prose-img:shadow-md prose-img:mx-auto prose-img:w-full">
            <ReactMarkdown remarkPlugins={[remarkBreaks]}>{post.body}</ReactMarkdown>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 pt-10 border-t border-gray-200 text-center">
          <p className="text-lg text-gray-600 mb-6">
            Have questions about your child&apos;s speech or language development?
          </p>
          <Link
            href="/#contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-brand-bluePurple to-brand-pink text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </article>
    </div>
  );
}
