type ClearFn = () => unknown;

function onPlayerFrameLoaded(cb: (e: HTMLIFrameElement) => ClearFn) {
  let playerFrame: HTMLIFrameElement | null =
    document.querySelector<HTMLIFrameElement>("#anime iframe");

  let clearFn: ClearFn | null = null;

  if (playerFrame) {
    clearFn = cb(playerFrame);
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
      clearFn?.();
      clearFn = cb(iframeChanged);
    }
  });

  const playerbox = document.querySelector<HTMLDivElement>("#playerbox");

  if (playerbox) {
    observer.observe(playerbox, {
      subtree: true,
      childList: true,
    });
  }

  return () => {
    clearFn?.();
    observer.disconnect();
  };
}

function onPlayerLoaded(
  container: HTMLIFrameElement,
  cb: (e: HTMLVideoElement) => ClearFn,
) {
  const video = container.contentDocument?.querySelector("video");

  let clearFn: ClearFn | null = null;

  if (video) {
    clearFn = cb(video);
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
      clearFn?.();
      clearFn = cb(iframeChanged);
    }
  });

  if (container.contentDocument?.body) {
    observer.observe(container.contentDocument.body, {
      subtree: true,
      childList: true,
      attributes: true,
    });
  }

  return () => {
    clearFn?.();
    observer.disconnect();
  };
}

export function onVideoElementLoaded(cb: (e: HTMLVideoElement) => ClearFn) {
  return onPlayerFrameLoaded((iframe) => {
    let onClearFn: ClearFn | null = null;
    let onLoadTimeout: ReturnType<typeof setTimeout> = -1;
    let onUnloadTimeouts: ReturnType<typeof setTimeout>[] = [];

    const onContentLoaded = () => {
      clearTimeout(onLoadTimeout);
      onLoadTimeout = setTimeout(() => {
        onClearFn?.();
        onClearFn = onPlayerLoaded(iframe, (videoElement) => {
          onUnloadTimeouts.forEach(clearTimeout);
          onUnloadTimeouts = [];
          return cb(videoElement);
        });
      }, 500);
    };

    const onUnload = () => {
      onUnloadTimeouts.forEach(clearTimeout);
      onUnloadTimeouts = [];

      iframe.contentWindow?.addEventListener(
        "DOMContentLoaded",
        onContentLoaded,
      );

      for (let i = 0; i < 10; i++) {
        onUnloadTimeouts.push(
          setTimeout(() => {
            iframe.contentWindow?.addEventListener(
              "DOMContentLoaded",
              onContentLoaded,
            );
          }, 10 * i),
        );
      }
    };

    iframe.contentWindow?.addEventListener("DOMContentLoaded", onContentLoaded);
    iframe.contentWindow?.addEventListener("unload", onUnload);

    return () => {
      onClearFn?.();
      iframe.contentWindow?.removeEventListener("unload", onUnload);
      iframe.contentWindow?.removeEventListener(
        "DOMContentLoaded",
        onContentLoaded,
      );
    };
  });
}
