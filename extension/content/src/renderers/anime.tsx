import { Api } from '@shikivost/api';
import { h, render } from 'preact';
import { useState } from 'preact/hooks';
import { account, anime, currentRate, fetchAnime } from '../state';
import { statusText } from '../status';
import { getTitle } from '../titleParser';

const api = Api.create();

function AnimeTitle() {
  return <div className="common-block">{anime.value?.name || ''}</div>;
}

function StatusSelect() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="status-select">
      <button
        className="status-select-button"
        onClick={() => setIsOpen((io) => !io)}
      >
        <span className="status-name">
          {statusText[currentRate.value?.status] || 'Добавить в список'}
        </span>
      </button>
      <div
        className={`status-select-list ${
          isOpen ? 'status-select-list--open' : ''
        }`}
      >
        {Object.entries(statusText).map(([key, value]) => {
          return (
            <div
              className="status-select-item"
              key={key}
              onClick={async () => {
                if (account.value?.id && anime.value?.id) {
                  currentRate.value = await api.setRate(key, {
                    id: currentRate.value?.id,
                    userId: account.value.id,
                    animeId: anime.value.id,
                  });
                  setIsOpen(false);
                }
              }}
            >
              {value}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AnimeBlock() {
  return (
    <div>
      <AnimeTitle />
      {Boolean(account.value?.id) && <StatusSelect />}
    </div>
  );
}

export function renderAnime() {
  const title = getTitle();
  if (!title) {
    return null;
  }

  const leftAnimeBlock = document.querySelector(
    '.shortstoryContent .imgRadius'
  ).parentNode;
  const topLineBottomBlock = document.createElement('div');
  topLineBottomBlock.className = 'extension';

  leftAnimeBlock.appendChild(topLineBottomBlock);

  fetchAnime(title);
  render(<AnimeBlock />, topLineBottomBlock);
}
