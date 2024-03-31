import { Api } from '@shikivost/api';
import { h } from 'preact';
import { useState } from 'preact/hooks';
import { account, anime, currentRate, hasRate } from '../state';
import { statusText } from '../status';

const api = Api.create();

export function StatusSelect() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="status-select">
      <button
        className="status-select-button"
        onClick={() => setIsOpen((io) => !io)}
      >
        <span className="status-name">
          {currentRate.value?.status
            ? statusText[currentRate.value.status]
            : 'Добавить в список'}
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
        {hasRate.value && (
          <div
            className="status-select-item status-select-item--red"
            onClick={async () => {
              if (currentRate.value?.id) {
                await api.deleteRate(currentRate.value.id);
                currentRate.value = null;
                setIsOpen(false);
              }
            }}
          >
            Удалить из списка
          </div>
        )}
      </div>
    </div>
  );
}
