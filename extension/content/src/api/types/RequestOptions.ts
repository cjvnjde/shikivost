export type CustomHeaders = { [key: string]: string | undefined };

export type RequestOptions = Omit<RequestInit, "headers"> & {
  headers?: CustomHeaders;
};
