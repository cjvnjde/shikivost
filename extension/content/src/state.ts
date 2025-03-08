import { Api } from "@shikivost/api";
import { Bridge } from "@shikivost/bridge";
import { atom, getDefaultStore } from "jotai";
import { Account } from "../../api/src/types/Account";
import { Anime } from "../../api/src/types/Anime";
import { Rate } from "../../api/src/types/Rate";

const bridge = Bridge.create();
const api = Api.create();

type Settings = {
  autotrackingType: "none" | "videoProgress" | "watchedProgress";
  progressValue: number;
};

export const settingsAtom = atom<Settings | null>(null);
export const accountAtom = atom<Account | null>(null);
export const animeAtom = atom<Anime | null>(null);
export const currentRateAtom = atom<null | Rate>(null);
export const isAuthorizedAtom = atom((get) => Boolean(get(accountAtom)?.id));

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

export function fetchAccount() {
  const value = defaultStore.get(accountAtom);

  if (!value) {
    api.whoami().then((accountData) => {
      defaultStore.set(accountAtom, accountData);
    });
  }
}

export function fetchAnime(title: string, year?: string | null) {
  api.searchAnimes(title, year).then(([animeData]) => {
    if (animeData) {
      defaultStore.set(animeAtom, animeData);
    }
  });
}
