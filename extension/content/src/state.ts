import { computed, effect, signal } from '@preact/signals';
import { Api } from '@shikivost/api';
import { Account } from '../../api/src/types/Account';
import { Anime } from '../../api/src/types/Anime';
import { Rate } from '../../api/src/types/Rate';

const api = Api.create();

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

export function fetchAccount() {
  if (!account.value) {
    api.whoami().then((accountData) => {
      account.value = accountData;
    });
  }
}

export function fetchAnime(title: string, year?: string) {
  api.searchAnimes(title, year).then(([animeData]) => {
    if (anime && animeData) {
      anime.value = animeData;
    }
  });
}
