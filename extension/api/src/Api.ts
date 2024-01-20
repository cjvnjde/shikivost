import { Bridge } from '@shikivost/bridge';

const clientId = 'ZYV_3N5DBDQWDhJYbWUq1YMcatv9nUI-xG51xsaXGAA';
const clientSecret = 'vLW-Ppm52Qcel50kyXDLp0GxKt6Uc7xMahaLAHskNFg';

export class Api {
  private _accessToken: string;
  private _refreshToken: string;
  static api: Api;

  static create() {
    if (this.api) {
      return this.api;
    }

    this.api = new Api();

    return this.api;
  }

  public async fetchTokens(code: string) {
    const form = new FormData();
    form.append('grant_type', 'authorization_code');
    form.append('client_id', clientId);
    form.append('client_secret', clientSecret);
    form.append('code', code);
    form.append('redirect_uri', 'https://animevost.org/');

    const resp = await fetch('https://shikimori.one/oauth/token', {
      method: 'POST',
      headers: {
        'User-Agent': 'Shikivost',
      },
      body: form,
    });

    if (!resp.ok) {
      throw new Error('Request failed');
    }

    const bridge = Bridge.create();
    const { access_token, refresh_token } = await resp.json();

    this._refreshToken = refresh_token;
    this._accessToken = access_token;

    await bridge.send('background.store.access_token', access_token);
    await bridge.send('background.store.refresh_token', refresh_token);
  }

  set accessToken(accessToken: string) {
    this._accessToken = accessToken;
  }

  set refreshToken(refreshToken: string) {
    this._refreshToken = refreshToken;
  }

  get isInitialized() {
    return Boolean(this._refreshToken);
  }

  async updateToken() {
    const form = new FormData();
    form.append('grant_type', 'refresh_token');
    form.append('client_id', clientId);
    form.append('client_secret', clientSecret);
    form.append('refresh_token', this._refreshToken);
    form.append('redirect_uri', 'https://animevost.org/');

    const resp = await fetch('https://shikimori.one/oauth/token', {
      method: 'POST',
      headers: {
        'User-Agent': 'Shikivost',
      },
      body: form,
    });

    if (!resp.ok) {
      throw new Error('Request failed');
    }

    const bridge = Bridge.create();
    const { access_token, refresh_token } = await resp.json();

    this._refreshToken = refresh_token;
    this._accessToken = access_token;

    await bridge.send('background.store.access_token', access_token);
    await bridge.send('background.store.refresh_token', refresh_token);
  }
}
