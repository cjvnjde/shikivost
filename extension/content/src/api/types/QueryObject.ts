type Stringifiable = string | boolean | number | null | undefined;

export type QueryObject = Record<
  string,
  Stringifiable | readonly Stringifiable[]
>;
