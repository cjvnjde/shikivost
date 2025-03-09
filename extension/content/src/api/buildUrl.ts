import queryString from "qs";
import { config } from "../config";
import { QueryObject } from "./types/QueryObject";

export function buildUrl(
  url: string,
  params: QueryObject = {},
  options: queryString.IStringifyOptions | undefined = undefined,
): string {
  let query = queryString.stringify(params, options);
  query = query ? `?${query}` : "";

  return `${config.domain}${url}${query}`;
}
