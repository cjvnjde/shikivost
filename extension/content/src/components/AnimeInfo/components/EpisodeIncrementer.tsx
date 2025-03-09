import { Api } from "../../../api";
import { IconPlus } from "@tabler/icons-react";
import { useAtom, useAtomValue } from "jotai";
import { useState } from "react";
import { animeAtom, currentRateAtom } from "../../../state";

const api = Api.create();

export function EpisodeIncrementer() {
  const [isLoading, setIsLoading] = useState(false);
  const animeData = useAtomValue(animeAtom);
  const [rate, setRate] = useAtom(currentRateAtom);

  return (
    <div className="episode-incrementer">
      <span className="episode-label">Эпизоды</span>

      <div className="episode-controls">
        <span>{`${rate?.episodes} / ${animeData?.episodes}`}</span>
        <button
          type="button"
          className="increment-button"
          disabled={isLoading}
          onClick={async () => {
            if (rate?.id) {
              try {
                setIsLoading(true);
                setRate(await api.incrementEpisode(rate.id));
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
