import { h, render } from 'preact';
import '../main.css';
import { Api, authorizationUrl } from '@shikivost/api';
import { useEffect, useState } from 'preact/hooks';
import { Account } from '../../../api/src/types/Account';
import { css } from '../../styled-system/css';

const api = Api.create();

function Account() {
  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    api.whoami().then((account) => {
      setAccount(account);
    });
  }, []);

  return (
    <div
      className={css({
        marginTop: '12px !important',
        display: 'inline-block',
        bg: '#fcdaab !important',
        padding: '4px !important',
        borderRadius: '4px !important',
        color: '#e68d19',
      })}
    >
      {account?.nickname || ''}
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
      className={css({
        marginTop: '12px !important',
        display: 'inline-block',
        bg: '#fcdaab !important',
        padding: '4px !important',
        borderRadius: '4px !important',
        color: '#e68d19',
      })}
    >
      Войти
    </a>
  );
}

export function renderHeader() {
  const topLine = document.querySelector('.topLine');
  topLine.classList.add(
    css({
      height: 'auto !important',
    })
  );

  const topLineBottomBlock = document.createElement('div');
  topLineBottomBlock.className = 'extension';

  topLine.appendChild(topLineBottomBlock);

  render(<Header />, topLineBottomBlock);
}
