import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../queryClient";

export function useSetRating(accountId = -1, animeId = -1, ratingId = -1) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (status: string | null) => {
      if (status === null) {
        await api.deleteRating(ratingId);
      } else {
        await api.updateRating(ratingId, status);
      }
    },
    onSuccess: async (_, variables) => {
      if (variables === null) {
        return queryClient.resetQueries({
          queryKey: ["rating", accountId, animeId],
        });
      }

      return queryClient.invalidateQueries({
        queryKey: ["rating", accountId, animeId],
      });
    },
  });
}
