import { h, render } from 'preact';
import { ShikimoriLogin } from '../components/ShikimoriLogin';
import { fetchAccount } from '../state';

export function renderHeader() {
  const searchNode = document.querySelector('.search');

  const topLineBottomBlock = document.createElement('div');
  topLineBottomBlock.className = 'extension login-wrapper';

  searchNode?.parentNode?.insertBefore(topLineBottomBlock, searchNode);

  fetchAccount();
  render(<ShikimoriLogin />, topLineBottomBlock);
}
