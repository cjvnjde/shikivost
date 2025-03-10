import { QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";
import { queryClient } from "../api/queryClient";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Providers;
