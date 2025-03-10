import { Bridge } from "../../../../libs/bridge/src";
import { buildUrl } from "./buildUrl";
import { config } from "../config";
import { Account } from "./types/Account";
import { Anime } from "./types/Anime";
import { Rate } from "./types/Rate";
import { CustomHeaders, RequestOptions } from "./types/RequestOptions";
import { Score } from "./types/Score";

export class Api {
  private _accessToken: string = "";
  private _refreshToken: string = "";
  private static api: Api;
  private bridge = Bridge.create();

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
    form.append("client_id", config.clientId);
    form.append("client_secret", config.clientSecret);
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
        throw new Error("Failed to fetch authorization tokens");
      }

      const { access_token, refresh_token } = await resp.json();

      this._refreshToken = refresh_token;
      this._accessToken = access_token;

      await this.bridge.send("background.store.access_token", access_token);
      await this.bridge.send("background.store.refresh_token", refresh_token);
    } catch (e: unknown) {
      await this.bridge.send("background.remove.access_token");
      await this.bridge.send("background.remove.refresh_token");
      console.error(e);
    }
  }

  set accessToken(accessToken: string) {
    this._accessToken = accessToken;
  }

  set refreshToken(refreshToken: string) {
    this._refreshToken = refreshToken;
  }

  private async updateToken() {
    const form = new FormData();
    form.append("grant_type", "refresh_token");
    form.append("client_id", config.clientId);
    form.append("client_secret", config.clientSecret);
    form.append("refresh_token", this._refreshToken);
    form.append("redirect_uri", "https://animevost.org/");

    try {
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
        throw new Error("Unauthorized");
      }

      if (!resp.ok) {
        throw new Error("Failed to fetch authorization tokens");
      }

      const { access_token, refresh_token } = await resp.json();

      this._refreshToken = refresh_token;
      this._accessToken = access_token;

      await this.bridge.send("background.store.access_token", access_token);
      await this.bridge.send("background.store.refresh_token", refresh_token);
    } catch (e: unknown) {
      await this.bridge.send("background.remove.access_token");
      await this.bridge.send("background.remove.refresh_token");
      console.error(e);
    }
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

  private async request<T = unknown>(
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
      throw new Error(`Failed to fetch: ${url}`);
    }

    return resp
      .json()
      .catch(() => resp.text())
      .catch(() => null);
  }

  public async whoami(): Promise<Account> {
    return this.request(buildUrl("/api/users/whoami"));
  }

  public async searchAnimes(
    search: string,
    year?: string | null,
  ): Promise<Anime[]> {
    const query = Object.fromEntries(
      Object.entries({
        search,
        season: year,
      }).filter(([_, value]) => value),
    );

    return this.request(buildUrl("/api/animes", query));
  }

  public async showRate(animeId: number, userId: number): Promise<[Rate]> {
    return this.request(
      buildUrl(`/api/v2/user_rates`, {
        target_id: animeId,
        target_type: "Anime",
        user_id: userId,
      }),
    );
  }

  public async setRate(
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

  public async deleteRate(rateId: number): Promise<void> {
    return this.request(buildUrl(`/api/v2/user_rates/${rateId}`), {
      method: "DELETE",
    });
  }

  public async setScore(rateId: number, score: Score): Promise<Rate> {
    return this.request(buildUrl(`/api/v2/user_rates/${rateId}`), {
      method: "PATCH",
      body: JSON.stringify({
        user_rate: {
          score,
        },
      }),
    });
  }

  public async incrementEpisode(rateId: number) {
    return this.request<Rate>(
      buildUrl(`/api/v2/user_rates/${rateId}/increment`),
      {
        method: "POST",
      },
    );
  }

  public async setEpisode(rateId: number, episodes: number) {
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
