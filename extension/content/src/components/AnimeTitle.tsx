import { useAtomValue } from "jotai";
import { animeAtom } from "../state";

export function AnimeTitle() {
  const animeData = useAtomValue(animeAtom);

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
