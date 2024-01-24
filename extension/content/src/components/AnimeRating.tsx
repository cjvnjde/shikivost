import { anime } from '../state';

export function AnimeRating() {
  return <>{anime.value?.score}</>;
}
