import { Api } from '@shikivost/api';
import { currentRate } from './state';

const videoWatchedPercentCap = 80;

const api = Api.create();

function getCurrentEpisode() {
  const currentElement = document.querySelector('#items .active');
  const id = currentElement?.getAttribute('id');

  if (id) {
    return Number.parseInt(id.replaceAll(/\D/g, ''), 10) + 1;
  }

  return null;
}

let isUpdating = false;
let isVideoElementUpdating = false;

function onTimeUpdate(e: Event) {
  const videoElement = e.target as HTMLVideoElement;
  const percentageWatched =
    (videoElement?.currentTime / videoElement?.duration) * 100;

  if (percentageWatched >= videoWatchedPercentCap) {
    const currentEpisode = getCurrentEpisode();

    if (
      currentRate.value?.id &&
      (currentRate.value?.episodes || 0) < currentEpisode &&
      !isUpdating &&
      !isVideoElementUpdating
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

function onPlayerFrameLoaded(cb: (e: HTMLIFrameElement) => unknown) {
  let playerFrame: HTMLIFrameElement | null =
    document.querySelector<HTMLIFrameElement>('#anime iframe');

  if (playerFrame) {
    cb(playerFrame);
  }

  const observer = new MutationObserver((mutations) => {
    let iframeChanged = null;
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (iframeChanged === null && node instanceof HTMLIFrameElement) {
          iframeChanged = node;
        }
      });
    });

    if (iframeChanged) {
      cb(iframeChanged);
    }
  });

  const playerbox = document.querySelector<HTMLDivElement>('#playerbox');

  observer.observe(playerbox, {
    subtree: true,
    childList: true,
  });
}

function onPlayerLoaded(
  container: HTMLIFrameElement,
  cb: (e: HTMLVideoElement) => unknown
) {
  const video = container.contentDocument.querySelector('video');

  if (video) {
    cb(video);
  }

  const observer = new MutationObserver((mutations) => {
    let iframeChanged = null;
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (iframeChanged === null && node.nodeName.toLowerCase() === 'video') {
          iframeChanged = node;
        }
      });
    });

    if (iframeChanged) {
      cb(iframeChanged);
    }
  });

  observer.observe(container.contentDocument.body, {
    subtree: true,
    childList: true,
    attributes: true,
  });
}

export function videoWatchChecker() {
  onPlayerFrameLoaded((e) => {
    const onContentLoaded = () => {
      e.contentWindow.addEventListener('unload', () => {
        isVideoElementUpdating = true;

        setTimeout(() => {
          e.contentWindow.addEventListener('DOMContentLoaded', () => {
            setTimeout(onContentLoaded);
          });
        });
      });

      onPlayerLoaded(e, (videoElement) => {
        isVideoElementUpdating = false;
        videoElement.addEventListener('timeupdate', onTimeUpdate);
      });
    };

    e.contentWindow.addEventListener('DOMContentLoaded', () => {
      isVideoElementUpdating = false;
      setTimeout(onContentLoaded);
    });
  });
}
