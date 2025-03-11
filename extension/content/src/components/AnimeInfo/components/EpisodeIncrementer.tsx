import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useAnime } from "../../../api/queries/useAnime";
import { useRating } from "../../../api/queries/useRating";

export function EpisodeIncrementer() {
  const [isLoading, setIsLoading] = useState(false);
  const { data: animeData } = useAnime();
  const { data: rating } = useRating();

  return (
    <div className="episode-incrementer">
      <span className="episode-label">Эпизоды</span>

      <div className="episode-controls">
        <span>{`${rating?.episodes} / ${animeData?.episodes}`}</span>
        <button
          type="button"
          className="increment-button"
          disabled={isLoading}
          onClick={async () => {
            if (rating?.id) {
              try {
                setIsLoading(true);
                // setRate(await api.incrementEpisode(rate.id));
              } finally {
                setIsLoading(false);
              }
            }
          }}
        >
          <IconPlus size={20} />
        </button>
      </div>
    </div>
  );
}
