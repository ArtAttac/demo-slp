import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export interface BlogPost {
  slug: string;
  title: string;
  body: string;
  imageUrl?: string; // Optional featured image — hosted on Vercel Blob
  createdAt: string;
  updatedAt?: string;
}
