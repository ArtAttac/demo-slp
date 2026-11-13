type EventDetails = {
  name: string;
  registerUrl: string;
  /** Set to a /public path once a flyer for this event exists; the flyer card is hidden while null. */
  flyerSrc: string | null;
  /** Social share image. Falls back to the generic events image until an event-specific one exists. */
  shareImageSrc: string;
  startDate: string;
  endDate: string;
  dateLabel: string;
  longDateLabel: string;
  timeLabel: string;
  venue: string;
  street: string;
  cityLine: string;
  mapsUrl: string;
  instagramUrl: string;
};

export const EVENT_DETAILS: EventDetails = {
  name: 'Storytime Yoga & Family Fun',
  registerUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSdqrNxizl_bUSL1wZMFSZGgxMaH8tjchJoybRZ-lo3ZVSQomg/viewform?usp=header',
  flyerSrc: null,
  shareImageSrc: '/workshops-share.png',
  startDate: '2026-11-21T15:00:00-05:00',
  endDate: '2026-11-21T16:30:00-05:00',
  dateLabel: 'Sat, Nov 21',
  longDateLabel: 'Saturday, November 21st',
  timeLabel: '3–4:30 PM',
  venue: 'Rikud Studio',
  street: '607A Vanderbilt Ave',
  cityLine: 'Brooklyn, NY 11238',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rikud+Studio+607A+Vanderbilt+Ave+Brooklyn+NY+11238',
  instagramUrl: 'https://www.instagram.com/speechontheslopenyc/',
};

export function isEventPast(now: Date = new Date()) {
  return now.getTime() > new Date(EVENT_DETAILS.endDate).getTime();
}
