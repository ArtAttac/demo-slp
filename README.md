# Bright Voices Speech Pathology Website

A modern, responsive landing page for a speech pathology practice built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Pastel Color Theme**: Pink, blue, yellow, and orange pastel colors throughout
- **Announcement Bar**: "NOW ACCEPTING NEW CLIENTS" notification
- **Navigation**: Sticky navigation with mobile menu
- **Hero Section**: Eye-catching hero with motto and CTA button
- **About Section**: Mission and values presentation
- **Services Section**: Six service areas with custom SVG illustrations
- **Team Section**: Meet the owners with profile photos
- **Parallax Section**: Scroll effect for visual engagement
- **Testimonials Carousel**: Client testimonials with ratings
- **Contact Form**: Integrated with Web3Forms (free form provider)
- **Social Media Footer**: Links to social media handles
- **Blog Page**: Ready for content (placeholder page included)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Contact Form

The contact form uses [Web3Forms](https://web3forms.com/), a free form provider.

1. Visit https://web3forms.com/
2. Sign up for a free account
3. Get your Access Key
4. Open `components/ContactSection.tsx`
5. Replace `YOUR_ACCESS_KEY_HERE` on line 28 with your actual access key

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### 4. Customize Content

- **Colors**: Edit `tailwind.config.ts` to adjust pastel colors
- **Images**: Replace placeholder images in components with your own
- **Copy**: Update text content in each component file
- **Contact Info**: Update phone, email, and address in `components/ContactSection.tsx` and `components/Footer.tsx`
- **Social Links**: Update social media URLs in `components/Footer.tsx`

## Project Structure

```
├── app/
│   ├── blog/
│   │   └── page.tsx          # Blog page (placeholder)
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/
│   ├── AboutSection.tsx      # Mission and values
│   ├── AnnouncementBar.tsx   # Top announcement bar
│   ├── ContactSection.tsx    # Contact form
│   ├── Footer.tsx            # Footer with social links
│   ├── HeroSection.tsx       # Hero section
│   ├── Navigation.tsx        # Navigation menu
│   ├── ParallaxSection.tsx   # Parallax scroll effect
│   ├── ServicesSection.tsx   # Services with illustrations
│   ├── TeamSection.tsx       # Team member profiles
│   └── TestimonialsSection.tsx # Testimonials carousel
└── public/
    └── images/               # Your custom images go here
```

## Build for Production

```bash
npm run build
npm start
```

## Deployment

This Next.js app can be deployed to:

- **Vercel** (recommended): Connect your GitHub repo to Vercel
- **Netlify**: Use the Next.js plugin
- **Any Node.js hosting**: Run `npm run build` and `npm start`

## Next Steps

1. Set up the blog functionality (content management system or markdown files)
2. Add your own images to replace placeholders
3. Customize colors and content to match your brand
4. Set up analytics (Google Analytics, Plausible, etc.)
5. Add SEO metadata for each page

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Web3Forms**: Free contact form service

## License

This project is private and proprietary.
