import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import {
  enAnimeTitle,
  animeYear,
  ruAnimeTitle,
  totalEpisodes,
  currentEpisode,
} from "../../state";
import { findBestAnimeMatch } from "../../utils/findBestAnimeMatch";
import { api } from "../queryClient";

export function useAnime() {
  const enTitle = useAtomValue(enAnimeTitle);
  const ruTitle = useAtomValue(ruAnimeTitle);
  const year = useAtomValue(animeYear);
  const total = useAtomValue(totalEpisodes);
  const current = useAtomValue(currentEpisode);

  return useQuery({
    queryKey: ["anime", { title: enTitle, year }],
    enabled: Boolean(enTitle),
    queryFn: async () => {
      const animeList = await api.searchAnimes(enTitle ?? "", year);

      return findBestAnimeMatch(
        enTitle ?? "",
        ruTitle ?? "",
        {
          current,
          total,
        },
        animeList,
      );
    },
  });
}
