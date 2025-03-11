import { Bridge } from "@shikivost/bridge";
import { atom, getDefaultStore } from "jotai";
import { Account } from "./api/types/Account";
import { Rate } from "./api/types/Rate";

const bridge = Bridge.create();

export type Settings = {
  autotrackingType: "none" | "videoProgress" | "watchedProgress";
  progressValue: number;
};

export const settingsAtom = atom<Settings>({
  autotrackingType: "watchedProgress",
  progressValue: 60,
});

export const animeTitle = atom<string | null>(null);
export const animeYear = atom<string | null>(null);
export const accountAtom = atom<Account | null>(null);
export const currentRateAtom = atom<null | Rate>(null);

export const defaultStore = getDefaultStore();

export function setAnimeData(title: string, year: string | null) {
  defaultStore.set(animeTitle, title);
  defaultStore.set(animeYear, year);
}

export function setCurrentRating(rate: Rate) {
  defaultStore.set(currentRateAtom, rate);
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
