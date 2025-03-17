import { setAnimeData } from "../state";
import { getEpisodesCount, getTitle, getYear } from "../utils/titleParser";
import { renderAnimeInfo } from "./renderAnimeInfo";
import { renderAnimeTitle } from "./renderAnimeTitle";
import { renderRating } from "./renderRating";

export function renderAnime() {
  const title = getTitle();
  const year = getYear();
  const episodes = getEpisodesCount();

  if (!title.en && !title.ru) {
    return null;
  }

  setAnimeData(title, year, episodes);

  renderRating();
  renderAnimeInfo();
  renderAnimeTitle();
}
