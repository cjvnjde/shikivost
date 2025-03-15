import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../queryClient";

export function useSetEpisode(ratingId = -1) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (episode: number) => {
      return api.setEpisode(ratingId, episode);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["rating"],
      });
    },
  });
}
