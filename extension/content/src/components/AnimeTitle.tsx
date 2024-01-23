import { h } from 'preact';
import { anime } from '../state';

export function AnimeTitle() {
  return (
    <a
      href={`https://shikimori.one${anime.value?.url}`}
      target="_blank"
      className="anime-title"
    >
      {anime.value?.name || ''}
    </a>
  );
}
