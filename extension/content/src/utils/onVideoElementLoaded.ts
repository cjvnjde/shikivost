function onPlayerFrameLoaded(cb: (e: HTMLIFrameElement) => unknown) {
  let playerFrame: HTMLIFrameElement | null =
    document.querySelector<HTMLIFrameElement>("#anime iframe");

  if (playerFrame) {
    cb(playerFrame);
  }

  const observer = new MutationObserver((mutations) => {
    let iframeChanged: null | HTMLIFrameElement = null;
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

  const playerbox = document.querySelector<HTMLDivElement>("#playerbox");

  if (playerbox) {
    observer.observe(playerbox, {
      subtree: true,
      childList: true,
    });
  }
}

function onPlayerLoaded(
  container: HTMLIFrameElement,
  cb: (e: HTMLVideoElement) => unknown,
) {
  const video = container.contentDocument?.querySelector("video");

  if (video) {
    cb(video);
  }

  const observer = new MutationObserver((mutations) => {
    let iframeChanged: null | Node = null;
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (iframeChanged === null && node.nodeName.toLowerCase() === "video") {
          iframeChanged = node;
        }
      });
    });

    if (iframeChanged) {
      cb(iframeChanged);
    }
  });

  if (container.contentDocument?.body) {
    observer.observe(container.contentDocument.body, {
      subtree: true,
      childList: true,
      attributes: true,
    });
  }
}

export function onVideoElementLoaded(cb: (e: HTMLVideoElement) => unknown) {
  onPlayerFrameLoaded((e) => {
    const onContentLoaded = () => {
      e.contentWindow?.addEventListener("unload", () => {
        setTimeout(() => {
          e.contentWindow?.addEventListener("DOMContentLoaded", () => {
            setTimeout(onContentLoaded);
          });
        });
      });

      onPlayerLoaded(e, (videoElement) => {
        cb(videoElement);
      });
    };

    e.contentWindow?.addEventListener("DOMContentLoaded", () => {
      setTimeout(onContentLoaded);
    });
  });
}
