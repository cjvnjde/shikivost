import { useQuery } from "@tanstack/react-query";
import { api } from "../queryClient";

export function useAccount() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => api.whoami(),
  });
}
