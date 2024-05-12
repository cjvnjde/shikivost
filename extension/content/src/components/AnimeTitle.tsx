import { useAtomValue } from 'jotai/index';
import { animeAtom } from '../state';

export function AnimeTitle() {
  const animeData = useAtomValue(animeAtom);

  return (
    <a
      href={`https://shikimori.one${animeData?.url}`}
      target="_blank"
      className="anime-title"
    >
      {animeData?.name || ''}
    </a>
  );
}
