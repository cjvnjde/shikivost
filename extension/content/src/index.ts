import { Api } from '@shikivost/api';
import { Bridge } from '@shikivost/bridge';
import { renderContent } from './renderers';
import { tokenChecker } from './tokenChecker';

const bridge = Bridge.create();
const api = Api.create();

async function init() {
  await tokenChecker();

  bridge.on('content.set.refresh_token', (value) => {
    api.refreshToken = value || '';
  });

  bridge.on('content.set.access_token', (value) => {
    console.log("test");
    api.accessToken = value || '';
    renderContent();
  });

  await bridge.send('background.get.access_token');
  await bridge.send('background.get.refresh_token');
}

init();
