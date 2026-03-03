# Quick Setup Guide

## Your Site is Ready!

The development server is running at: **http://localhost:3000**

## What's Been Created

### Landing Page Sections (in order):
1. ✅ Announcement Bar - "NOW ACCEPTING NEW CLIENTS" (pastel pink)
2. ✅ Navigation - Sticky nav with mobile menu, links to all sections + blog
3. ✅ Hero Section - "Every Voice Deserves to be Heard" with image and CTA button
4. ✅ About Section - 3 values cards (Compassionate Care, Evidence-Based, Family-Centered)
5. ✅ Services Section - 6 service boxes with custom SVG illustrations:
   - Stuttering
   - Articulation
   - Language Development
   - Social Communication
   - Voice Therapy
   - Feeding & Swallowing
6. ✅ Team Section - Meet the Owners (2 profiles with images)
7. ✅ Parallax Section - Scroll effect with background image
8. ✅ Testimonials Carousel - 4 client testimonials with 5-star ratings
9. ✅ Contact Form - Integrated with Web3Forms
10. ✅ Footer - Social media links (Facebook, Instagram, LinkedIn, Twitter)

### Blog Page
- Basic placeholder page at `/blog` ready for content

## Next Steps

### 1. Set Up Contact Form (REQUIRED)
The contact form won't work until you add your Web3Forms key:

1. Visit https://web3forms.com/
2. Sign up (free)
3. Get your Access Key
4. Open `components/ContactSection.tsx`
5. Replace `YOUR_ACCESS_KEY_HERE` on line 28 with your key

### 2. Customize Content
- **Images**: Replace Unsplash placeholder images with your own
- **Team Info**: Update names, bios, credentials in `components/TeamSection.tsx`
- **Contact Details**: Update in `components/ContactSection.tsx` and `components/Footer.tsx`
- **Social Links**: Update in `components/Footer.tsx`

### 3. Colors
Pastel colors are defined in `tailwind.config.ts`:
- Pink: #FFB3C6
- Blue: #A8D8EA
- Yellow: #FFFACD
- Orange: #FFCBA4

Adjust these to match your exact brand colors if needed.

### 4. Blog Implementation
Ready to build the blog when you're ready. Options:
- Markdown files with gray-matter
- Headless CMS (Contentful, Sanity, etc.)
- Simple JSON data file

## Development Commands

```bash
npm run dev     # Start dev server (already running!)
npm run build   # Build for production
npm start       # Run production build
npm run lint    # Run ESLint
```

## Tech Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS (with custom pastel colors)
- Framer Motion (animations)
- Web3Forms (contact form)

## File Structure
```
components/
├── AnnouncementBar.tsx
├── Navigation.tsx
├── HeroSection.tsx
├── AboutSection.tsx
├── ServicesSection.tsx
├── TeamSection.tsx
├── ParallaxSection.tsx
├── TestimonialsSection.tsx
├── ContactSection.tsx
└── Footer.tsx

app/
├── page.tsx (home page)
├── blog/page.tsx
├── layout.tsx
└── globals.css
```

Enjoy your new website!
