import { Api } from '@shikivost/api';
import { currentRate } from './state';

const videoWatchedPercentCap = 80;

let timeout: ReturnType<typeof setTimeout>;

const api = Api.create();

function getCurrentEpisode() {
  const currentElement = document.querySelector('#items .active');
  const id = currentElement?.getAttribute('id');

  if (id) {
    return Number.parseInt(id.replaceAll(/\D/g, ''), 10) + 1;
  }

  return null;
}

function getVideoElement() {
  const iframe = document.querySelector<HTMLIFrameElement>('#anime iframe');
  const innerDoc = iframe?.contentDocument || iframe?.contentWindow?.document;

  return innerDoc?.querySelector('video');
}

let isUpdating = false;
function onTimeUpdate(e: Event) {
  const videoElement = e.target as HTMLVideoElement;
  const percentageWatched =
    (videoElement?.currentTime / videoElement?.duration) * 100;

  if (percentageWatched >= videoWatchedPercentCap) {
    const currentEpisode = getCurrentEpisode();

    if (
      currentRate.value?.id &&
      (currentRate.value?.episodes || 0) < currentEpisode &&
      !isUpdating
    ) {
      isUpdating = true;
      api
        .setEpisode(currentRate.value.id, currentEpisode)
        .then((res) => {
          currentRate.value = res;
        })
        .finally(() => {
          isUpdating = false;
        });
    }
  }
}

function connectVideoListener() {
  const videoElement = getVideoElement();

  clearTimeout(timeout);

  if (videoElement) {
    videoElement.addEventListener('timeupdate', onTimeUpdate);
  } else {
    timeout = setTimeout(() => {
      connectVideoListener();
    }, 1000);
  }
}

const PAGE_UPDATE_TIME = 2000;

export function videoWatchChecker() {
  connectVideoListener();

  const items = document.querySelector('#items');

  let timeout: ReturnType<typeof setTimeout>;

  function connectPlayerChangeListeners() {
    const iframe = document.querySelector<HTMLIFrameElement>('#anime iframe');
    const innerDoc = iframe?.contentDocument || iframe?.contentWindow?.document;
    const player1Btn = innerDoc?.getElementById('pl1');
    const player2Btn = innerDoc?.getElementById('pl2');

    player1Btn?.addEventListener('click', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        connectVideoListener();
      }, PAGE_UPDATE_TIME);
    });

    player2Btn?.addEventListener('click', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        connectVideoListener();
      }, PAGE_UPDATE_TIME);
    });
  }

  items.addEventListener('click', () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      connectVideoListener();

      connectPlayerChangeListeners();
    }, PAGE_UPDATE_TIME);
  });

  connectPlayerChangeListeners();
}
