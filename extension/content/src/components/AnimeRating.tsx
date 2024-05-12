import { useAtomValue } from 'jotai';
import { animeAtom } from '../state';

export function AnimeRating() {
  const animeData = useAtomValue(animeAtom);

  return <>{animeData?.score}</>;
}
