import { QueryClient } from "@tanstack/react-query";
import { Api } from "./Api";

export const queryClient = new QueryClient();

export const api = Api.create();
