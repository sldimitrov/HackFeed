import i18next from 'i18next';

export function getTimeAgo(isoTimestamp: string): string {
  const createdDate = new Date(isoTimestamp);
  const now = new Date();
  const diffInMs = now.getTime() - createdDate.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  if (diffInMinutes < 1) return i18next.t('timeAgo.justNow');
  if (diffInMinutes === 1) return i18next.t('timeAgo.oneMinute');
  if (diffInMinutes < 60) return i18next.t('timeAgo.minutes', { count: diffInMinutes });

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours === 1) return i18next.t('timeAgo.oneHour');
  if (diffInHours < 24) return i18next.t('timeAgo.hours', { count: diffInHours });

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return i18next.t('timeAgo.oneDay');
  return i18next.t('timeAgo.days', { count: diffInDays });
}
