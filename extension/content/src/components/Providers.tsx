import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";
import { PropsWithChildren } from "react";
import { queryClient } from "../api/queryClient";
import { defaultStore } from "../state";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <Provider store={defaultStore}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
};

export default Providers;
