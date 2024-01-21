import { Bridge } from '@shikivost/bridge';
import browser from 'webextension-polyfill';

const bridge = Bridge.create();

function init() {
  bridge.on('background.store.access_token', (payload) => {
    browser.storage.local.set({ access_token: payload });
  });
  bridge.on('background.store.refresh_token', (payload) => {
    browser.storage.local.set({ refresh_token: payload });
  });

  bridge.on('background.get.access_token', () => {
    browser.storage.local.get('access_token').then(({ access_token }) => {
      bridge.send('content.set.access_token', access_token);
    });
  });
  bridge.on('background.get.refresh_token', () => {
    browser.storage.local.get('refresh_token').then(({ refresh_token }) => {
      bridge.send('content.set.refresh_token', refresh_token);
    });
  });
}

init();
