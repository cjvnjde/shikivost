import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../queryClient";

export function useIncrementEpisode(ratingId = -1) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.incrementEpisode(ratingId),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["rating"],
      });
    },
  });
}
