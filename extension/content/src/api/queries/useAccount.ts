import { useQuery } from "@tanstack/react-query";
import { accountAtom, defaultStore } from "../../state";
import { api } from "../queryClient";

export function useAccount() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const accountData = await api.whoami();

      // TODO: get rid of this
      defaultStore.set(accountAtom, accountData);

      return accountData;
    },
  });
}
