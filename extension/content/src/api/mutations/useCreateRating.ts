import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../queryClient";

export function useCreateRating(accountId = -1, animeId = -1) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (status: string) => {
      return api.createRating(accountId, animeId, status);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["rating", accountId, animeId],
      });
    },
  });
}
