import type { InfiniteQueryObserverResult, FetchNextPageOptions } from '@tanstack/react-query';

export async function fetchNextPageSafe(
  fetchNextPage: (
    options?: FetchNextPageOptions,
  ) => Promise<InfiniteQueryObserverResult<any, Error>>,
): Promise<void> {
  const previousScroll = window.scrollY;
  const previousHeight = document.body.scrollHeight;

  await fetchNextPage();

  setTimeout(() => {
    const newHeight = document.body.scrollHeight;
    window.scrollTo({
      top: previousScroll + (newHeight - previousHeight - 220),
      behavior: 'auto',
    });
  }, 150);
}
