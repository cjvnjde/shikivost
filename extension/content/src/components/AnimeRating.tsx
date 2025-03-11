import { useAnime } from "../api/queries/useAnime";

export function AnimeRating() {
  const { data: animeData } = useAnime();

  return <>{animeData?.score}</>;
}
