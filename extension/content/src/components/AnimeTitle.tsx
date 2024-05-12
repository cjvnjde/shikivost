import { useAtomValue } from 'jotai/index';
import { animeAtom } from '../state';

export function AnimeTitle() {
  const animeData = useAtomValue(animeAtom);

  return (
    <a
      href={`https://shikimori.one${animeData?.url}`}
      target="_blank"
      className="inline-block bg-orange-200 rounded text-amber-500 text-center mb-1 p-1"
    >
      {animeData?.name || ''}
    </a>
  );
}
