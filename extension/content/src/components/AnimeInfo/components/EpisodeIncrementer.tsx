import { IconPlus } from "@tabler/icons-react";
import { useIncrementEpisode } from "../../../api/mutations/useIncrementEpisode";
import { useAnime } from "../../../api/queries/useAnime";
import { useRating } from "../../../api/queries/useRating";

export function EpisodeIncrementer() {
  const { data: animeData } = useAnime();
  const { data: rating } = useRating();
  const { mutate: incrementEpisode, isPending } = useIncrementEpisode(
    rating?.id,
  );

  return (
    <div className="episode-incrementer">
      <span className="episode-label">Эпизоды</span>

      <div className="episode-controls">
        <span>{`${rating?.episodes} / ${animeData?.episodes}`}</span>
        <button
          type="button"
          className="increment-button"
          disabled={isPending}
          onClick={() => incrementEpisode()}
        >
          <IconPlus size={20} />
        </button>
      </div>
    </div>
  );
}
