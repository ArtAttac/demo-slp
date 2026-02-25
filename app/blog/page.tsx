import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function BlogPage() {
  return (
    <main>
      <Navigation />
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Blog
          </h1>
          <p className="text-xl text-gray-600">
            Coming soon! Check back for articles, tips, and resources about speech therapy.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
