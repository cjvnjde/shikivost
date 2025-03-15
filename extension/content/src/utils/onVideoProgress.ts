import { Chunk } from "../ChunkType";
import { defaultStore, settingsAtom } from "../state";
import { getTotalWatchedTime } from "./getTotalWatchedTime";

export function onVideoProgress(
  videoElement: HTMLVideoElement,
  cb: (progress: number) => void,
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

  const handleTimeupdate = () => {
    if (!isSeeking) {
      eventBuffer.unshift(videoElement.currentTime);

      if (eventBuffer.length > bufferSize) {
        const time = eventBuffer.pop();

        if (time !== undefined) {
          handleTimeUpdate(time);
        }
      }

      const settingsData = defaultStore.get(settingsAtom);
      if (settingsData?.autotrackingType === "watchedProgress") {
        cb((getTotalWatchedTime(chunks) * 100) / videoElement.duration);
      } else if (settingsData?.autotrackingType === "videoProgress") {
        cb((videoElement.currentTime * 100) / videoElement.duration);
      }
    }
  };

  const handleSeek = () => {
    isSeeking = true;
    eventBuffer.splice(0, eventBuffer.length);
  };

  const handleSeeked = () => {
    isSeeking = false;
    const currentTime = videoElement.currentTime;
    chunks.push({ start: currentTime, end: currentTime });
  };

  videoElement.addEventListener("timeupdate", handleTimeupdate);
  videoElement.addEventListener("seeking", handleSeek);
  videoElement.addEventListener("seeked", handleSeeked);

  return () => {
    videoElement.removeEventListener("timeupdate", handleTimeupdate);
    videoElement.removeEventListener("seeking", handleSeek);
    videoElement.removeEventListener("seeked", handleSeeked);
  };
}
