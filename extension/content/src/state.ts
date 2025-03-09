import { Bridge } from "@shikivost/bridge";
import { atom, getDefaultStore } from "jotai";
import { Api } from "./api";
import { Account } from "./api/types/Account";
import { Anime } from "./api/types/Anime";
import { Rate } from "./api/types/Rate";

const bridge = Bridge.create();
const api = Api.create();

export type Settings = {
  autotrackingType: "none" | "videoProgress" | "watchedProgress";
  progressValue: number;
};

export const settingsAtom = atom<Settings>({
  autotrackingType: "watchedProgress",
  progressValue: 60,
});
export const accountAtom = atom<Account | null>(null);
export const animeAtom = atom<Anime | null>(null);
export const currentRateAtom = atom<null | Rate>(null);

export const defaultStore = getDefaultStore();

function checkRating() {
  const animeValue = defaultStore.get(animeAtom);
  const accountValue = defaultStore.get(accountAtom);

  if (animeValue?.id && accountValue?.id) {
    api.showRate(animeValue.id, accountValue.id).then(([rate]) => {
      if (rate) {
        defaultStore.set(currentRateAtom, rate);
      }
    });
  }
}

defaultStore.sub(animeAtom, checkRating);
defaultStore.sub(accountAtom, checkRating);

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

export function fetchAnime(title: string, year?: string | null) {
  api.searchAnimes(title, year).then(([animeData]) => {
    if (animeData) {
      defaultStore.set(animeAtom, animeData);
    }
  });
}
