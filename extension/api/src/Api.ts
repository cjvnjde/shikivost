import { Bridge } from "@shikivost/bridge";
import queryString from "qs";
import { Account } from "./types/Account";
import { Anime } from "./types/Anime";
import { Rate } from "./types/Rate";
import { Score } from "./types/Score";

const clientId = "ZYV_3N5DBDQWDhJYbWUq1YMcatv9nUI-xG51xsaXGAA";
const clientSecret = "vLW-Ppm52Qcel50kyXDLp0GxKt6Uc7xMahaLAHskNFg";

export type Stringifiable = string | boolean | number | null | undefined;

export type QueryObject = Record<
  string,
  Stringifiable | readonly Stringifiable[]
>;

export type CustomHeaders = { [key: string]: string | undefined };
export type RequestOptions = Omit<RequestInit, "headers"> & {
  headers?: CustomHeaders;
};

export function buildUrl(
  url: string,
  params: QueryObject = {},
  options: queryString.IStringifyOptions | undefined = undefined,
): string {
  let query = queryString.stringify(params, options);
  query = query ? `?${query}` : "";

  return `https://shikimori.one${url}${query}`;
}

export class Api {
  private _accessToken: string = "";
  private _refreshToken: string = "";
  static api: Api;
  public isInitialized: boolean = false;

  static create() {
    if (this.api) {
      return this.api;
    }

    this.api = new Api();

    return this.api;
  }

  public async fetchTokens(code: string | null) {
    const form = new FormData();
    form.append("grant_type", "authorization_code");
    form.append("client_id", clientId);
    form.append("client_secret", clientSecret);
    form.append("code", code || "");
    form.append("redirect_uri", "https://animevost.org/");

    try {
      const resp = await fetch(buildUrl("/oauth/token"), {
        method: "POST",
        headers: {
          "User-Agent": "Shikivost",
        },
        body: form,
      });

      if (!resp.ok) {
        throw new Error("Request failed");
      }

      const bridge = Bridge.create();
      const { access_token, refresh_token } = await resp.json();

      this._refreshToken = refresh_token;
      this._accessToken = access_token;

      await bridge.send("background.store.access_token", access_token);
      await bridge.send("background.store.refresh_token", refresh_token);

      this.isInitialized = true;
    } catch (e: unknown) {
      console.error(e);
    }
  }

  set accessToken(accessToken: string) {
    this.isInitialized = true;
    this._accessToken = accessToken;
  }

  set refreshToken(refreshToken: string) {
    this._refreshToken = refreshToken;
  }

  get isAuthorized() {
    return Boolean(this._refreshToken);
  }

  async updateToken() {
    const form = new FormData();
    form.append("grant_type", "refresh_token");
    form.append("client_id", clientId);
    form.append("client_secret", clientSecret);
    form.append("refresh_token", this._refreshToken);
    form.append("redirect_uri", "https://animevost.org/");

    const resp = await fetch(buildUrl("/oauth/token"), {
      method: "POST",
      headers: {
        "User-Agent": "Shikivost",
      },
      body: form,
    });

    if (resp.status === 401) {
      this._refreshToken = "";
      this._accessToken = "";
      throw new Error("Request failed");
    }

    if (!resp.ok) {
      throw new Error("Request failed");
    }

    const bridge = Bridge.create();
    const { access_token, refresh_token } = await resp.json();

    this._refreshToken = refresh_token;
    this._accessToken = access_token;

    await bridge.send("background.store.access_token", access_token);
    await bridge.send("background.store.refresh_token", refresh_token);

    this.isInitialized = true;
  }

  private headers(extraHeaders: CustomHeaders = {}) {
    const defaultHeaders = new Headers();
    defaultHeaders.append("accept", "*/*");

    defaultHeaders.append("User-Agent", "Shikivost");
    defaultHeaders.append("Content-Type", "application/json");

    if (this._accessToken) {
      defaultHeaders.append("Authorization", `Bearer ${this._accessToken}`);
    }

    Object.entries(extraHeaders).forEach(([key, value]) => {
      if (value !== undefined) {
        defaultHeaders.set(key, value);
      } else {
        defaultHeaders.delete(key);
      }
    });

    return defaultHeaders;
  }

  async request<T = unknown>(
    url: string,
    data: Partial<RequestOptions> = {},
  ): Promise<T> {
    const resp = await fetch(url, {
      ...data,
      headers: this.headers(data.headers),
    });

    if (resp.status == 401) {
      await this.updateToken();
      return this.request(url, data);
    }

    if (!resp.ok) {
      throw new Error("Request failed");
    }

    return resp
      .json()
      .catch(() => resp.text())
      .catch(() => null);
  }

  async whoami(): Promise<Account> {
    return this.request(buildUrl("/api/users/whoami"));
  }

  async searchAnimes(search: string, year?: string | null): Promise<Anime[]> {
    const query = Object.fromEntries(
      Object.entries({
        search,
        season: year,
      }).filter(([_, value]) => value),
    );

    return this.request(buildUrl("/api/animes", query));
  }

  async showRate(animeId: number, userId: number): Promise<[Rate]> {
    return this.request(
      buildUrl(`/api/v2/user_rates`, {
        target_id: animeId,
        target_type: "Anime",
        user_id: userId,
      }),
    );
  }

  async setRate(
    status: string,
    {
      id,
      animeId,
      userId,
    }: {
      id?: number;
      userId: number;
      animeId: number;
    },
  ): Promise<Rate> {
    if (id) {
      return this.request(buildUrl(`/api/v2/user_rates/${id}`), {
        method: "PATCH",
        body: JSON.stringify({
          user_rate: {
            status,
          },
        }),
      });
    }

    return this.request(buildUrl("/api/v2/user_rates"), {
      method: "POST",
      body: JSON.stringify({
        user_rate: {
          status,
          user_id: userId,
          target_id: animeId,
          target_type: "Anime",
        },
      }),
    });
  }

  async deleteRate(rateId: number): Promise<void> {
    return this.request(buildUrl(`/api/v2/user_rates/${rateId}`), {
      method: "DELETE",
    });
  }

  async setScore(rateId: number, score: Score): Promise<Rate> {
    return this.request(buildUrl(`/api/v2/user_rates/${rateId}`), {
      method: "PATCH",
      body: JSON.stringify({
        user_rate: {
          score,
        },
      }),
    });
  }

  async incrementEpisode(rateId: number) {
    return this.request<Rate>(
      buildUrl(`/api/v2/user_rates/${rateId}/increment`),
      {
        method: "POST",
      },
    );
  }

  async setEpisode(rateId: number, episodes: number) {
    return this.request<Rate>(buildUrl(`/api/v2/user_rates/${rateId}`), {
      method: "PATCH",
      body: JSON.stringify({
        user_rate: {
          episodes,
        },
      }),
    });
  }
}
