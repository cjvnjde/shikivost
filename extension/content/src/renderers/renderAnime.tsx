import { setAnimeData } from "../state";
import { getTitle, getYear } from "../utils/titleParser";
import { renderAnimeInfo } from "./renderAnimeInfo";
import { renderAnimeTitle } from "./renderAnimeTitle";
import { renderRating } from "./renderRating";

export function renderAnime() {
  const title = getTitle();
  const year = getYear();

  if (!title.en && !title.ru) {
    return null;
  }

  setAnimeData(title.en, title.ru, year);

  renderRating();
  renderAnimeInfo();
  renderAnimeTitle();
}
