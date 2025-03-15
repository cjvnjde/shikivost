import { useSetScore } from "../../api/mutations/useSetScore";
import { useAccount } from "../../api/queries/useAccount";
import { EpisodeIncrementer } from "./components/EpisodeIncrementer";
import { RatingSelect } from "./components/RatingSelect";
import { StatusSelect } from "./components/StatusSelect";
import { useRating } from "../../api/queries/useRating";

export function AnimeInfo() {
  const { data: account } = useAccount();
  const { data: rating } = useRating();
  const { mutate: setScore } = useSetScore(rating?.id);

  if (!account) {
    return null;
  }

  return (
    <div className="anime-info">
      <StatusSelect />
      {rating?.id && (
        <RatingSelect rating={rating.score || 0} setRating={setScore} />
      )}
      {rating?.id && <EpisodeIncrementer />}
    </div>
  );
}
