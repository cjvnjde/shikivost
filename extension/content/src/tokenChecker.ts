import { Api } from '../../api/src';
import { Bridge } from '@shikivost/bridge';

const bridge = Bridge.create();
const api = Api.create();

export async function tokenChecker() {
  const url = new URL(window.location.href);

  if (url.searchParams.has('code')) {
    const code = url.searchParams.get('code');
    url.searchParams.delete('code');

    history.replaceState(null, '', url.toString());
    const { access_token, refresh_token } = await api.getTokens(code);

    await bridge.send('background.store.access_token', access_token);
    await bridge.send('background.store.refresh_token', access_token);

    api.accessToken = access_token;
    api.refreshToken = refresh_token;
  }
}
