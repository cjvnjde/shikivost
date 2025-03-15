import { useAtomValue } from "jotai";
import { useCallback, useEffect, useRef } from "react";
import { useSetEpisode } from "../api/mutations/useSetEpisode";
import { useRating } from "../api/queries/useRating";
import { settingsAtom } from "../state";
import { onVideoElementLoaded } from "../utils/onVideoElementLoaded";
import { onVideoProgress } from "../utils/onVideoProgress";
import { getCurrentEpisode } from "../utils/getCurrentEpisode";

export const VideoTracker = () => {
  const settingsData = useAtomValue(settingsAtom);
  const { data: rating } = useRating();
  const { mutate: setEpisode, isPending } = useSetEpisode(rating?.id);
  const frameDelayCounter = useRef(0);
  const currentEpisodeCache = useRef(-1);

  const onProgressUpdate = useCallback(
    (percentageWatched: number) => {
      if (
        rating &&
        !isPending &&
        percentageWatched >= (settingsData?.progressValue ?? 60)
      ) {
        const currentEpisode = getCurrentEpisode();

        if (frameDelayCounter.current >= 4) {
          currentEpisodeCache.current = currentEpisode;
          frameDelayCounter.current = 0;
        }

        if (currentEpisodeCache.current !== currentEpisode) {
          frameDelayCounter.current++;
          return;
        }

        if (rating.episodes < currentEpisode) {
          setEpisode(currentEpisode);
        }
      }
    },
    [rating, isPending, settingsData],
  );

  useEffect(() => {
    let clear = () => {};

    onVideoElementLoaded((videoElement) => {
      clear = onVideoProgress(videoElement, onProgressUpdate);
    });

    return clear;
  }, [onProgressUpdate]);

  return null;
};
