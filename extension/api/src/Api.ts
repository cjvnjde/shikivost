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

  public async getTokens(
    code: string
  ): Promise<{ access_token: string; refresh_token: string }> {
    const form = new FormData();
    form.append('grant_type', 'authorization_code');
    form.append('client_id', 'ZYV_3N5DBDQWDhJYbWUq1YMcatv9nUI-xG51xsaXGAA');
    form.append('client_secret', 'vLW-Ppm52Qcel50kyXDLp0GxKt6Uc7xMahaLAHskNFg');
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

    return await resp.json();
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
}
