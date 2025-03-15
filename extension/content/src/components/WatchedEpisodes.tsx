import { useEffect } from "react";
import { useRating } from "../api/queries/useRating";

export const WatchedEpisodes = () => {
  const { data: rating } = useRating();

  useEffect(() => {
    if (rating?.episodes) {
      const episodes = document.querySelectorAll("#items > .epizode");

      episodes.forEach((episode) => {
        const id = episode.getAttribute("id");

        if (id) {
          const episodeNumber =
            Number.parseInt(id.replaceAll(/\D/g, ""), 10) + 1;

          if (episodeNumber <= (rating?.episodes || 0)) {
            episode.classList.add("watched");
          } else {
            episode.classList.remove("watched");
          }
        }
      });
    }
  }, [rating]);

  return null;
};
