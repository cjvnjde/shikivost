import { Api } from '@shikivost/api';
import { useState } from 'preact/hooks';
import { anime, currentRate } from '../state';

const api = Api.create();

export function EpisodeIncrementer() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div class="episode-incrementer">
      <span>Эпизоды</span>

      <div>
        <span>{`${currentRate.value?.episodes} / ${anime.value?.episodes}`}</span>
        <button
          type="button"
          disabled={isLoading}
          onClick={async () => {
            if (currentRate.value?.id) {
              try {
                setIsLoading(true);
                currentRate.value = await api.incrementEpisode(
                  currentRate.value.id
                );
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
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 5l0 14" />
      <path d="M5 12l14 0" />
    </svg>
  );
}
