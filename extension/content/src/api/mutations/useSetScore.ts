import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../queryClient";
import { Score } from "../types/Score";

export function useSetScore(ratingId = -1) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (score: Score) => {
      return api.setScore(ratingId, score);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["rating"],
      });
    },
  });
}
