import { h, render } from 'preact';
import { Api, authorizationUrl } from '@shikivost/api';
import { useEffect, useState } from 'preact/hooks';
import { Account } from '../../../api/src/types/Account';
import { account, fetchAccount } from '../state';

const api = Api.create();

function Account() {
  useEffect(() => {
    fetchAccount();
  }, []);

  return <div className="test">{account.value?.nickname || ''}</div>;
}

function Header() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    setIsAuthorized(api.isAuthorized);
  });

  if (isAuthorized) {
    return <Account />;
  }

  return (
    <a href={authorizationUrl} className="test">
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

  render(<Header />, topLineBottomBlock);
}
