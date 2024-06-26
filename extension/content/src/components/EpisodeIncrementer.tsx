import { Api } from '@shikivost/api';
import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';
import { animeAtom, currentRateAtom } from '../state';

const api = Api.create();

export function EpisodeIncrementer() {
  const [isLoading, setIsLoading] = useState(false);
  const animeData = useAtomValue(animeAtom);
  const [rate, setRate] = useAtom(currentRateAtom);

  return (
    <div className="flex items-center justify-between border-b-orange-200 my-1 pb-0.5 border-b border-solid">
      <span className="font-bold">Эпизоды</span>

      <div className="flex flex-row gap-1.5 items-center leading-5">
        <span>{`${rate?.episodes} / ${animeData?.episodes}`}</span>
        <button
          type="button"
          className="flex items-center justify-center rounded transition-colors bg-amber-600 text-orange-200 p-0 border-none hover:bg-yellow-700]"
          disabled={isLoading}
          onClick={async () => {
            if (rate?.id) {
              try {
                setIsLoading(true);
                setRate(await api.incrementEpisode(rate.id));
              } finally {
                setIsLoading(false);
              }
            }
          }}
        >
          <Plus />
        </button>
      </div>
    </div>
  );
}

function Plus() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-plus"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 5l0 14" />
      <path d="M5 12l14 0" />
    </svg>
  );
}
