import { Api } from '@shikivost/api';
import { Bridge } from '@shikivost/bridge';
import { checkIsRendered } from './checkIsRendered';
import { renderContent } from './renderers';
import { defaultStore, settingsAtom } from './state';
import { tokenChecker } from './tokenChecker';
import '../../assets/index.css';

const bridge = Bridge.create();
const api = Api.create();

async function init() {
  await tokenChecker();
  let isRendered = false;

  bridge.on('content.set.refresh_token', (value) => {
    api.refreshToken = value || '';
  });
  bridge.on('content.set.settings', (value) => {
    defaultStore.set(settingsAtom, {
      autotrackingType: value?.autotrackingType ?? 'watchedProgress',
      progressValue: value?.progressValue ?? 60,
    });
  });

  console.log('herereree');
  bridge.on('content.set.access_token', (value) => {
    api.accessToken = value || '';

    console.log('herereree');
    if (!isRendered && !checkIsRendered()) {
      renderContent();
      isRendered = true;
    }
  });

  bridge.on('content.reload', () => {
    window.location.reload();
  });

  await bridge.send('background.get.access_token');
  await bridge.send('background.get.refresh_token');
  await bridge.send('background.get.settings');
}

init();
