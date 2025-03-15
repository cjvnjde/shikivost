import { createRoot } from "react-dom/client";
import { AnimeInfo } from "../components/AnimeInfo";
import { AnimeRating } from "../components/AnimeRating";
import { AnimeTitle } from "../components/AnimeTitle";
import Providers from "../components/Providers";
import { VideoTracker } from "../components/VideoTracker";
import { WatchedEpisodes } from "../components/WatchedEpisodes";
import { setAnimeData } from "../state";
import { getTitle, getYear } from "../titleParser";

export function renderRating() {
  const ratingBlock = document.querySelector(
    ".shortstoryContent table div > strong",
  )?.parentNode;

  const shikiRatingContainer = document.createElement("div");
  shikiRatingContainer.className = "extension anime-rating-wrapper";

  ratingBlock?.appendChild(shikiRatingContainer);

  const root = createRoot(shikiRatingContainer);
  root.render(
    <Providers>
      <AnimeRating />
    </Providers>,
  );
}

export function renderAnimeInfo() {
  const leftAnimeBlock = document.querySelector(
    ".shortstoryContent .imgRadius",
  )?.parentNode;
  const topLineBottomBlock = document.createElement("div");
  topLineBottomBlock.className = "extension";

  leftAnimeBlock?.appendChild(topLineBottomBlock);

  const root = createRoot(topLineBottomBlock);
  root.render(
    <Providers>
      <AnimeInfo />
      <WatchedEpisodes />
      <VideoTracker />
    </Providers>,
  );
}

function removeTitle() {
  const title = document.querySelector(".shortstoryContent h4[itemprop=name]");

  if (title) {
    title.parentNode?.removeChild(title);
  }
}

export function renderAnimeTitle() {
  const startAnimeBlock = document.querySelector(".shortstoryContent td p");
  const topLineBottomBlock = document.createElement("div");
  topLineBottomBlock.className = "extension anime-title-wrapper";

  startAnimeBlock?.parentNode?.insertBefore(
    topLineBottomBlock,
    startAnimeBlock,
  );
  const root = createRoot(topLineBottomBlock);
  root.render(
    <Providers>
      <AnimeTitle />
    </Providers>,
  );
}

export function renderAnime() {
  const title = getTitle();

  if (!title.en && !title.ru) {
    return null;
  }

  const year = getYear();
  setAnimeData(title.en, title.ru, year);

  removeTitle();

  renderRating();

  renderAnimeInfo();
  renderAnimeTitle();
}
