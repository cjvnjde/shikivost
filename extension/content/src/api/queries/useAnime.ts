import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { animeTitle, animeYear } from "../../state";
import { api } from "../queryClient";

export function useAnime() {
  const title = useAtomValue(animeTitle);
  const year = useAtomValue(animeYear);

  return useQuery({
    queryKey: ["anime", { title, year }],
    enabled: Boolean(title),
    queryFn: async () => {
      const [animeData] = await api.searchAnimes(title ?? "", year);

      return animeData;
    },
  });
}
