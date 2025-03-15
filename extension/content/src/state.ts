import { Bridge } from "@shikivost/bridge";
import { atom, getDefaultStore } from "jotai";

const bridge = Bridge.create();

export type Settings = {
  autotrackingType: "none" | "videoProgress" | "watchedProgress";
  progressValue: number;
};

export const settingsAtom = atom<Settings>({
  autotrackingType: "watchedProgress",
  progressValue: 60,
});

export const enAnimeTitle = atom<string | null>(null);
export const ruAnimeTitle = atom<string | null>(null);
export const animeYear = atom<string | null>(null);

export const defaultStore = getDefaultStore();

export function setAnimeData(
  enTitle: string,
  ruTitle: string,
  year: string | null,
) {
  defaultStore.set(enAnimeTitle, enTitle);
  defaultStore.set(ruAnimeTitle, ruTitle);
  defaultStore.set(animeYear, year);
}

defaultStore.sub(settingsAtom, () => {
  const value = defaultStore.get(settingsAtom);
  const updateObj = {
    autotrackingType: value?.autotrackingType ?? "watchedProgress",
    progressValue: value?.progressValue ?? 60,
  };

  if (value) {
    bridge.send("background.store.settings", updateObj);
  }
});
