import browser from 'webextension-polyfill';

export function isBackgroundScript() {
  try {
    return (
      typeof browser.extension.getBackgroundPage === 'function' ||
      location.protocol.includes('chrome-extension:')
    );
  } catch (e) {
    return false;
  }
}
