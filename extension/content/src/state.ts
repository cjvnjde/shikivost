import { computed, effect, signal } from '@preact/signals';
import { Api } from '@shikivost/api';
import { Bridge } from '@shikivost/bridge';
import { Account } from '../../api/src/types/Account';
import { Anime } from '../../api/src/types/Anime';
import { Rate } from '../../api/src/types/Rate';

const bridge = Bridge.create();
const api = Api.create();

type Settings = {
  autotrackingType: 'none' | 'videoProgress' | 'watchedProgress';
  progressValue: number;
};

export const settings = signal<Settings | null>(null);
export const account = signal<Account | null>(null);
export const anime = signal<Anime | null>(null);
export const currentRate = signal<null | Rate>(null);
export const hasRate = computed(() => Boolean(currentRate.value?.status));
export const isAuthorized = computed(() => Boolean(account.value?.id));

effect(() => {
  if (anime.value?.id && account.value?.id) {
    api.showRate(anime.value.id, account.value.id).then(([rate]) => {
      if (rate) {
        currentRate.value = rate;
      }
    });
  }
});

effect(() => {
  const updateObj = {
    autotrackingType: settings.value?.autotrackingType ?? 'watchedProgress',
    progressValue: settings.value?.progressValue ?? 60,
  };

  if (settings.value) {
    bridge.send('background.store.settings', updateObj);
  }
});

export function fetchAccount() {
  if (!account.value) {
    api.whoami().then((accountData) => {
      account.value = accountData;
    });
  }
}

export function fetchAnime(title: string, year?: string | null) {
  api.searchAnimes(title, year).then(([animeData]) => {
    if (anime && animeData) {
      anime.value = animeData;
    }
  });
}
