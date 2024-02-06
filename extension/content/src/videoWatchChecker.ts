import { Api } from '@shikivost/api';
import { Chunk } from './ChunkType';
import { currentRate } from './state';
import { getTotalWatchedTime } from './utils/getTotalWatchedTime';

const videoWatchedPercentCap = 60;

const api = Api.create();

function addVideoTracking(
  videoElement: HTMLVideoElement,
  cb: (progress: number) => void
) {
  const chunks: Chunk[] = [];

  const eventBuffer: number[] = [];
  let isSeeking = false;
  const bufferSize = 5;

  const handleTimeUpdate = (currentTime: number) => {
    if (chunks.length === 0) {
      chunks.push({ start: currentTime, end: currentTime });
    } else {
      const lastChunk = chunks[chunks.length - 1];

      lastChunk.end = currentTime;
    }
  };

  videoElement.addEventListener('timeupdate', () => {
    if (!isSeeking) {
      eventBuffer.unshift(videoElement.currentTime);

      if (eventBuffer.length > bufferSize) {
        const time = eventBuffer.pop();

        if (time !== undefined) {
          handleTimeUpdate(time);
        }
      }

      cb((getTotalWatchedTime(chunks) * 100) / videoElement.duration);
    }
  });
  videoElement.addEventListener('seeking', () => {
    isSeeking = true;
    eventBuffer.splice(0, eventBuffer.length);
  });
  videoElement.addEventListener('seeked', () => {
    isSeeking = false;
    const currentTime = videoElement.currentTime;
    chunks.push({ start: currentTime, end: currentTime });
  });
}

function getCurrentEpisode() {
  const currentElement = document.querySelector('#items .active');
  const id = currentElement?.getAttribute('id');

  if (id) {
    return Number.parseInt(id.replaceAll(/\D/g, ''), 10) + 1;
  }

  return null;
}

let isUpdating = false;

let currentEpisodeCache = -1;
let frameDelayCounter = 0;

function onProgressUpdate(percentageWatched: number) {
  if (percentageWatched >= videoWatchedPercentCap) {
    const currentEpisode = getCurrentEpisode();

    if (frameDelayCounter >= 4) {
      currentEpisodeCache = currentEpisode;
      frameDelayCounter = 0;
    }

    if (currentEpisodeCache !== currentEpisode) {
      frameDelayCounter++;
      return;
    }

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
        setTimeout(() => {
          e.contentWindow.addEventListener('DOMContentLoaded', () => {
            setTimeout(onContentLoaded);
          });
        });
      });

      onPlayerLoaded(e, (videoElement) => {
        addVideoTracking(videoElement, onProgressUpdate);
      });
    };

    e.contentWindow.addEventListener('DOMContentLoaded', () => {
      setTimeout(onContentLoaded);
    });
  });
}
