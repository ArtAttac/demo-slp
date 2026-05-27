import HomeClient from './HomeClient';
import LatestPostsSection from '@/components/LatestPostsSection';

export const revalidate = 3600;

export default function Home() {
  return <HomeClient latestPostsSlot={<LatestPostsSection />} />;
}
