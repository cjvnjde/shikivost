import { signal } from '@preact/signals';
import { h, render } from 'preact';
import { Api, authorizationUrl } from '@shikivost/api';
import { useEffect, useState } from 'preact/hooks';
import { Account } from '../../../api/src/types/Account';

const api = Api.create();

export const account = signal<Account | null>(null)

function Account() {
  useEffect(() => {
    api.whoami().then((accountData) => {
      account.value = accountData
    });
  }, []);

  return (
    <div
      className="test"
    >
      {account.value?.nickname || ''}
    </div>
  );
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
    <a
      href={authorizationUrl}
      className="test"
    >
      Войти
    </a>
  );
}

export function renderHeader() {
  const topLine = document.querySelector('.topLine');
  topLine.classList.add(
'top-line'
  );

  const topLineBottomBlock = document.createElement('div');
  topLineBottomBlock.className = 'extension';

  topLine.appendChild(topLineBottomBlock);

  render(<Header />, topLineBottomBlock);
}
