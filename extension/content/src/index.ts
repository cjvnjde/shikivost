import { Api } from '@shikivost/api';
import { Bridge } from '@shikivost/bridge';
import { renderContent } from './renderers';
import { tokenChecker } from './tokenChecker';
import './assets/main.css';

const bridge = Bridge.create();
const api = Api.create();

async function init() {
  await tokenChecker();
  let isRendered = false;

  bridge.on('content.set.refresh_token', (value) => {
    api.refreshToken = value || '';
  });

  bridge.on('content.set.access_token', (value) => {
    api.accessToken = value || '';

    if (!isRendered) {
      renderContent();
      isRendered = true;
    }
  });

  await bridge.send('background.get.access_token');
  await bridge.send('background.get.refresh_token');
}

init();
