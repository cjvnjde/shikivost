import browser from 'webextension-polyfill';

export function isBackgroundScript() {
  try {
    return typeof browser.extension.getBackgroundPage === 'function';
  } catch (e) {
    return false;
  }
}
