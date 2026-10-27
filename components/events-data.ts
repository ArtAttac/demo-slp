export const EVENT_DETAILS = {
  name: 'Free Reading Yogis Pop-Up & Family Celebration',
  registerUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLScQ90OiT69wldfFj6ys5-KfCOhquRXCFD9nxczP6cjUNpvsDQ/viewform?usp=header',
  flyerSrc: '/events/reading-yogis-flyer.png',
  shareImageSrc: '/events/reading-yogis-share.png',
  startDate: '2026-11-07T12:15:00-05:00',
  endDate: '2026-11-07T14:00:00-05:00',
  dateLabel: 'Sat, Nov 7',
  timeLabel: '12:15–2 PM',
  venue: 'Rikud Studio',
  street: '607A Vanderbilt Ave',
  cityLine: 'Brooklyn, NY 11238',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rikud+Studio+607A+Vanderbilt+Ave+Brooklyn+NY+11238',
  instagramUrl: 'https://www.instagram.com/speechontheslopenyc/',
} as const;

export function isEventPast(now: Date = new Date()) {
  return now.getTime() > new Date(EVENT_DETAILS.endDate).getTime();
}
