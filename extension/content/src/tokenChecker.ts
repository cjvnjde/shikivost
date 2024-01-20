import { Bridge } from '@shikivost/bridge';

const bridge = Bridge.create();

export function tokenChecker() {
  const url = new URL(window.location.href);

  if (url.searchParams.has('code')) {
    const token = url.searchParams.get('code');
    url.searchParams.delete('code');

    history.replaceState(null, '', url.toString());
    const form = new FormData();
    form.append('grant_type', 'authorization_code');
    form.append('client_id', 'ZYV_3N5DBDQWDhJYbWUq1YMcatv9nUI-xG51xsaXGAA');
    form.append('client_secret', 'vLW-Ppm52Qcel50kyXDLp0GxKt6Uc7xMahaLAHskNFg');
    form.append('code', token);
    form.append('redirect_uri', 'https://animevost.org/');

    fetch('https://shikimori.one/oauth/token', {
      method: 'POST',
      headers: {
        'User-Agent': 'Shikivost',
      },
      body: form,
    })
      .then((res) => {
        return res.json();
      })
      .then((token) => {
        if (token.access_token && token.refresh_token) {
          bridge.send('set.access_token', { payload: token.access_token });
          bridge.send('set.refresh_token', { payload: token.refresh_token });
        }
      });
  }
}
