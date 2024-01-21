import { h, render } from 'preact';
import { fetchAccount } from '../state';
import { ShikimoriLogin } from './ShikimoriLogin';

function Header() {
  return <ShikimoriLogin />;
}

export function renderHeader() {
  const searchNode = document.querySelector('.search');

  const topLineBottomBlock = document.createElement('div');
  topLineBottomBlock.className = 'extension login-wrapper';

  searchNode.parentNode.insertBefore(topLineBottomBlock, searchNode);

  fetchAccount();
  render(<Header />, topLineBottomBlock);
}
