import { Api } from '@shikivost/api';
import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';
import { accountAtom, animeAtom, currentRateAtom, hasRateAtom } from '../state';
import { statusText } from '../status';

const api = Api.create();

export function StatusSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const [rate, setRate] = useAtom(currentRateAtom);
  const accountData = useAtomValue(accountAtom);
  const animeData = useAtomValue(animeAtom);
  const hasRateData = useAtomValue(hasRateAtom);

  return (
    <div className="status-select">
      <button
        className="status-select-button"
        onClick={() => setIsOpen((io) => !io)}
      >
        <span className="status-name">
          {rate?.status ? statusText[rate.status] : 'Добавить в список'}
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
                if (accountData?.id && animeData?.id) {
                  setRate(
                    await api.setRate(key, {
                      id: rate?.id,
                      userId: accountData.id,
                      animeId: animeData.id,
                    }),
                  );
                  setIsOpen(false);
                }
              }}
            >
              {value}
            </div>
          );
        })}
        {hasRateData && (
          <div
            className="status-select-item status-select-item--red"
            onClick={async () => {
              if (rate?.id) {
                await api.deleteRate(rate.id);
                setRate(null);
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
