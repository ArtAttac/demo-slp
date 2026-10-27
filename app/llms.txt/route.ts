import { EVENT_DETAILS, isEventPast } from '@/components/events-data';
import { getAbsoluteUrl } from '@/lib/blog';

// Plain-text site summary for AI assistants and LLM crawlers (https://llmstxt.org).
// Regenerated hourly so the upcoming-event section drops off once the event is over.
export const revalidate = 3600;

export function GET() {
  const upcomingEvent = isEventPast()
    ? ''
    : `
## Upcoming event

- [${EVENT_DETAILS.name}](${getAbsoluteUrl('/workshops')}): Saturday, November 7, 2026, 12:15-2:00 PM at ${EVENT_DETAILS.venue}, ${EVENT_DETAILS.street}, ${EVENT_DETAILS.cityLine}. Free. A playful early literacy and yoga class for ages 3-5 (12:15-1:00 PM), followed by crafts with Little Makers Studio, games, snacks, and family fun for all ages, siblings welcome (1:00-2:00 PM). Limited spots; register at ${EVENT_DETAILS.registerUrl}
`;

  const body = `# Speech on the Slope

> Play-based pediatric speech therapy based in Park Slope, Brooklyn. Speech-language pathologists provide in-home and in-school therapy for children across Brooklyn and Lower Manhattan.

Speech on the Slope serves families in Park Slope, Carroll Gardens, Cobble Hill, Boerum Hill, Brooklyn Heights, Gowanus, Prospect Heights, Windsor Terrace, Downtown Brooklyn, Fort Greene, Clinton Hill, and Lower Manhattan. Sessions take place at the family's home or the child's school (with permission). Free 30-minute consultations are available.

Contact: (917) 200-0339, hello@speechontheslope.com, Instagram @speechontheslopenyc.
${upcomingEvent}
## Services

- [Evaluations](${getAbsoluteUrl('/services')}): speech, language, and communication evaluations to build an individualized plan.
- [Speech therapy](${getAbsoluteUrl('/services')}): play-based therapy for speech sound disorders, articulation, phonological disorders, and language development, including early intervention for toddlers and preschool services.
- [Reading & writing support](${getAbsoluteUrl('/services')}): literacy support connecting speech and language skills to reading, writing, and spelling.
- [Myofunctional therapy](${getAbsoluteUrl('/services')}): exercises for tongue posture, oral muscle strength, tongue thrust, and mouth breathing.
- [Community events & workshops](${getAbsoluteUrl('/workshops')}): family events that build speech, language, and literacy skills.

## Resources

- [Speech milestone checker](${getAbsoluteUrl('/milestone-checker')}): free tool for parents to check their child's speech and language milestones.
- [Blog](${getAbsoluteUrl('/blog')}): articles for parents on speech, language, and literacy development.
- [FAQ](${getAbsoluteUrl('/faq')}): evaluations, therapy sessions, insurance, and service areas.
- [About the team](${getAbsoluteUrl('/about')})
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
