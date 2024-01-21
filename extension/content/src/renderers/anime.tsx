import { h, render } from 'preact';
import { useEffect } from 'preact/hooks';
import { anime, currentRate, fetchAnime } from '../state';
import { statusText } from '../status';
import { getTitle } from '../titleParser';

function AnimeTitle() {
  return <div className="test">{anime.value?.name || ''}</div>;
}

function AnimeRating() {
  return <div>{statusText[currentRate.value?.status] || ''}</div>;
}

function AnimeBlock({ title }: { title: string }) {
  useEffect(() => {
    fetchAnime(title);
  }, [title]);

  return (
    <div>
      <AnimeTitle />
      <AnimeRating />
    </div>
  );
}

export function renderAnime() {
  const title = getTitle();
  if (!title) {
    return null;
  }

  const leftAnimeBlock = document.querySelector(
    '.shortstoryContent .imgRadius'
  ).parentNode;
  const topLineBottomBlock = document.createElement('div');
  topLineBottomBlock.className = 'extension';

  leftAnimeBlock.appendChild(topLineBottomBlock);

  render(<AnimeBlock title={title} />, topLineBottomBlock);
}
