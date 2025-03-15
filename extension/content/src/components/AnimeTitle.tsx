import clsx from "clsx";
import { useAnime } from "../api/queries/useAnime";

export function AnimeTitle() {
  const { data: animeData } = useAnime();

  if (animeData) {
    return (
      <a
        href={`https://shikimori.one${animeData.url}`}
        target="_blank"
        className={clsx(
          "anime-title-link",
          animeData.suspicious && "anime-title-link--suspicious",
        )}
      >
        {animeData.name}
      </a>
    );
  }

  return null;
}
