import { useQuery } from "@tanstack/react-query";
import Fuse from "fuse.js";
import { useAtomValue } from "jotai";
import { enAnimeTitle, animeYear, ruAnimeTitle } from "../../state";
import { api } from "../queryClient";
import { Anime } from "../types/Anime";

export function findBestAnimeMatch(
  enQuery: string,
  ruQuery: string,
  animeList: Anime[],
): Anime {
  const fuse = new Fuse(animeList, {
    keys: ["name", "russian"],
    threshold: 0.3,
  });

  const enResults = fuse.search(enQuery);
  const ruResults = fuse.search(ruQuery);

  if (enResults.length > 0 && ruResults.length > 0) {
    const enBest = enResults[0];
    const ruBest = ruResults[0];

    if ((enBest?.score ?? 0) < (ruBest?.score ?? 0)) {
      return enBest.item;
    } else {
      return ruBest.item;
    }
  }

  if (enResults.length > 0) {
    return enResults[0].item;
  }

  if (ruResults.length > 0) {
    return ruResults[0].item;
  }

  const firstAnime = animeList[0];

  firstAnime.suspicious = true;

  return firstAnime;
}

export function useAnime() {
  const enTitle = useAtomValue(enAnimeTitle);
  const ruTitle = useAtomValue(ruAnimeTitle);
  const year = useAtomValue(animeYear);

  return useQuery({
    queryKey: ["anime", { title: enTitle, year }],
    enabled: Boolean(enTitle),
    queryFn: async () => {
      const animeList = await api.searchAnimes(enTitle ?? "", year);

      return findBestAnimeMatch(enTitle ?? "", ruTitle ?? "", animeList);
    },
  });
}
