export function getMinutesAgo(isoTimestamp: string): string {
  const createdDate = new Date(isoTimestamp);
  const now = new Date();
  const diffInMs = now.getTime() - createdDate.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  if (diffInMinutes < 1) return 'just now';
  if (diffInMinutes === 1) return '1 minute ago';
  return `${diffInMinutes} minutes ago`;
}
