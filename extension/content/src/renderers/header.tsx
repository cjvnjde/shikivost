import { authorizationUrl } from '@shikivost/api';
import { h, render } from 'preact';
import { Account } from '../../../api/src/types/Account';
import { account, fetchAccount } from '../state';

function Account() {
  return <div className="common-block">{account.value?.nickname || ''}</div>;
}

function Header() {
  if (account.value?.id) {
    return <Account />;
  }

  return (
    <a href={authorizationUrl} className="common-block">
      Войти
    </a>
  );
}

export function renderHeader() {
  const topLine = document.querySelector('.topLine');
  topLine.classList.add('top-line');

  const topLineBottomBlock = document.createElement('div');
  topLineBottomBlock.className = 'extension';

  topLine.appendChild(topLineBottomBlock);

  fetchAccount();
  render(<Header />, topLineBottomBlock);
}
