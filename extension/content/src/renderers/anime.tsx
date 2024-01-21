import { effect, signal } from '@preact/signals';
import { Api } from '@shikivost/api';
import { h, render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Anime } from '../../../api/src/types/Anime';
import { Rate } from '../../../api/src/types/Rate';
import { getTitle } from '../titleParser';
import { account } from './header';

const api = Api.create();

const anime = signal<Anime | null>(null);

function AnimeTitle() {
  return (
    <div
      className="test"
    >
      {anime.value?.name || ''}
    </div>
  );
}

const currentRate = signal<null | Rate>(null);

effect(() => {
  if (anime.value?.id, account.value?.id) {
    api.showRate(anime.value.id, account.value.id).then(([rate]) => {
      if (rate) {
        currentRate.value = rate;
      }
    });
  }
});

function AnimeRating() {
  return (
    <div>
      {currentRate.value?.status}
    </div>
  );
}

function AnimeBlock({ title }: { title: string }) {
  useEffect(() => {
    api.searchAnimes(title).then(([animeData]) => {
      if (anime) {
        anime.value = animeData;
      }
    });
  }, []);

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

  const leftAnimeBlock = document.querySelector('.shortstoryContent .imgRadius').parentNode;
  const topLineBottomBlock = document.createElement('div');
  topLineBottomBlock.className = 'extension';

  leftAnimeBlock.appendChild(topLineBottomBlock);

  render(<AnimeBlock title={title} />, topLineBottomBlock);
}
