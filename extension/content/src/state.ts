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
export const isAuthorized = atom<boolean>(false);
export const totalEpisodes = atom<number>(0);
export const currentEpisode = atom<number>(0);

export const defaultStore = getDefaultStore();

export function setIsAuthorized(value: boolean) {
  defaultStore.set(isAuthorized, value);
}

export function setAnimeData(
  title: { en: string; ru: string },
  year: string | null,
  episodes: { total: number; current: number },
) {
  defaultStore.set(enAnimeTitle, title.en);
  defaultStore.set(ruAnimeTitle, title.ru);
  defaultStore.set(totalEpisodes, episodes.total);
  defaultStore.set(currentEpisode, episodes.current);
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
