import { h, render } from 'preact';
import '../main.css';
import { authorizationUrl } from '@shikivost/api';
import { css } from '../../styled-system/css';

function Header() {
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
