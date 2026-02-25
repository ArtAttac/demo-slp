'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function TeamSection() {
  const team = [
    {
      name: 'Dr. Sarah Martinez',
      title: 'Co-Founder & Lead SLP',
      credentials: 'MS, CCC-SLP',
      bio: 'With over 15 years of experience, Sarah specializes in pediatric speech therapy and has a passion for helping children find their voice.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    },
    {
      name: 'Michael Chen',
      title: 'Co-Founder & Clinical Director',
      credentials: 'PhD, CCC-SLP',
      bio: 'Michael brings expertise in voice therapy and adult communication disorders, with a focus on evidence-based practice and continuing education.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    },
  ];

  return (
    <section id="team" className="py-20 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Meet the Owners
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our dedicated team of certified speech-language pathologists is here to guide you
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-brand-pink shadow-lg">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-lg font-semibold text-brand-bluePurple mb-1">{member.title}</p>
                <p className="text-sm text-gray-600 mb-4">{member.credentials}</p>
                <p className="text-gray-700">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
