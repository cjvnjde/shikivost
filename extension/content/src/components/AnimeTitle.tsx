import { useAnime } from "../api/queries/useAnime";

export function AnimeTitle() {
  const { data: animeData } = useAnime();

  if (animeData) {
    return (
      <a
        href={`https://shikimori.one${animeData?.url ?? ""}`}
        target="_blank"
        className="anime-title-link"
      >
        {animeData?.name ?? ""}
      </a>
    );
  }

  return null;
}
