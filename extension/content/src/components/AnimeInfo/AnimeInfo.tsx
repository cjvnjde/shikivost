import { Api } from "@shikivost/api";
import { useAtom, useAtomValue } from "jotai";
import { currentRateAtom, isAuthorizedAtom } from "../../state";
import { EpisodeIncrementer } from "./components/EpisodeIncrementer";
import { RatingSelect } from "./components/RatingSelect";
import { StatusSelect } from "./components/StatusSelect";

const api = Api.create();

export function AnimeInfo() {
  const isAuth = useAtomValue(isAuthorizedAtom);
  const [rate, setRate] = useAtom(currentRateAtom);

  if (!isAuth) {
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
