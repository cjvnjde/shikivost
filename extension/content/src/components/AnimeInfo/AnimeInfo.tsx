import { useAtom } from "jotai";
import { Api } from "../../api";
import { useAccount } from "../../api/queries/useAccount";
import { currentRateAtom } from "../../state";
import { EpisodeIncrementer } from "./components/EpisodeIncrementer";
import { RatingSelect } from "./components/RatingSelect";
import { StatusSelect } from "./components/StatusSelect";

const api = Api.create();

export function AnimeInfo() {
  const { data: account } = useAccount();
  const [rate, setRate] = useAtom(currentRateAtom);

  if (!account) {
    return null;
  }

  return (
    <div className="anime-info">
      <StatusSelect />
      {rate?.id && (
        <RatingSelect
          rating={rate.score || 0}
          setRating={async (score) => {
            if (rate?.id) {
              setRate(await api.setScore(rate.id, score));
            }
          }}
        />
      )}
      {rate?.id && <EpisodeIncrementer />}
    </div>
  );
}
