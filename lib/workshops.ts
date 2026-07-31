export const SAWYER_WORKSHOPS_COOKIE = 'sawyertools';

export function isSawyerWorkshopsEnabled(cookieValue?: string) {
  return ['true', '1', 'on'].includes(cookieValue?.toLowerCase() ?? '');
}
