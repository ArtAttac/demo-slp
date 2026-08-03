export const SAWYER_WORKSHOPS_QUERY = 'seesawyer';

export function isSawyerWorkshopsEnabled(queryValue?: string) {
  return ['true', '1', 'on'].includes(queryValue?.toLowerCase() ?? '');
}
