import { useQuery } from "@tanstack/react-query";
import { api } from "../queryClient";
import { useAccount } from "./useAccount";
import { useAnime } from "./useAnime";

export function useRating() {
  const { data: animeData } = useAnime();
  const { data: accountData } = useAccount();

  return useQuery({
    queryKey: ["rating", accountData?.id, animeData?.id],
    enabled: Boolean(animeData && accountData),
    queryFn: async () => {
      const [rateData] = await api.showRate(
        animeData?.id ?? -1,
        accountData?.id ?? -1,
      );

      return rateData;
    },
  });
}
