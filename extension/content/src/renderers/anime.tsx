import { createRoot } from "react-dom/client";
import { AnimeInfo } from "../components/AnimeInfo";
import { AnimeRating } from "../components/AnimeRating";
import { AnimeTitle } from "../components/AnimeTitle";
import { currentRateAtom, defaultStore, fetchAnime } from "../state";
import { getTitle, getYear } from "../titleParser";
import { videoWatchChecker } from "../videoWatchChecker";

export function renderRating() {
  const ratingBlock = document.querySelector(
    ".shortstoryContent table div > strong",
  )?.parentNode;

  const shikiRatingContainer = document.createElement("div");
  shikiRatingContainer.className = "extension anime-rating-wrapper";

  ratingBlock?.appendChild(shikiRatingContainer);

  const root = createRoot(shikiRatingContainer);
  root.render(<AnimeRating />);
}

export function renderAnimeInfo() {
  const leftAnimeBlock = document.querySelector(
    ".shortstoryContent .imgRadius",
  )?.parentNode;
  const topLineBottomBlock = document.createElement("div");
  topLineBottomBlock.className = "extension";

  leftAnimeBlock?.appendChild(topLineBottomBlock);

  const root = createRoot(topLineBottomBlock);
  root.render(<AnimeInfo />);
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
  root.render(<AnimeTitle />);
}

export function highlightWatchedEpisodes() {
  const episodes = document.querySelectorAll("#items > .epizode");

  defaultStore.sub(currentRateAtom, () => {
    const currentRateData = defaultStore.get(currentRateAtom);
    if (currentRateData?.episodes) {
      episodes.forEach((episode) => {
        const id = episode.getAttribute("id");

        if (id) {
          const episodeNumber =
            Number.parseInt(id.replaceAll(/\D/g, ""), 10) + 1;

          if (episodeNumber <= (currentRateData?.episodes || 0)) {
            episode.classList.add("watched");
          } else {
            episode.classList.remove("watched");
          }
        }
      });
    }
  });
}

export function renderAnime() {
  const title = getTitle();

  if (!title) {
    return null;
  }

  const year = getYear();
  fetchAnime(title, year);
  removeTitle();

  renderRating();

  renderAnimeInfo();
  renderAnimeTitle();

  videoWatchChecker();
  highlightWatchedEpisodes();
}
