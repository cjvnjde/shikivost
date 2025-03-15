import { useAccount } from "../../api/queries/useAccount";
import { useRating } from "../../api/queries/useRating";
import { EpisodeIncrementer } from "./components/EpisodeIncrementer";
import { RatingSelect } from "./components/RatingSelect";
import { StatusSelect } from "./components/StatusSelect";

export function AnimeInfo() {
  const { data: account } = useAccount();
  const { data: rating } = useRating();

  if (!account) {
    return null;
  }

  return (
    <div className="anime-info">
      <StatusSelect />
      {rating?.id && <RatingSelect />}
      {rating?.id && <EpisodeIncrementer />}
    </div>
  );
}
