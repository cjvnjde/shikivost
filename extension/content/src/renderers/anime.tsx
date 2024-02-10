import { h, render } from 'preact';
import { AnimeInfo } from '../components/AnimeInfo';
import { AnimeRating } from '../components/AnimeRating';
import { AnimeTitle } from '../components/AnimeTitle';
import { fetchAnime } from '../state';
import { getTitle, getYear } from '../titleParser';
import { videoWatchChecker } from '../videoWatchChecker';

export function renderRating() {
  const ratingBlock = document.querySelector(
    '.shortstoryContent div > strong'
  ).parentNode;

  const shikiRatingContainer = document.createElement('div');
  shikiRatingContainer.className = 'extension anime-rating-wrapper';

  ratingBlock.appendChild(shikiRatingContainer);

  render(<AnimeRating />, shikiRatingContainer);
}

export function renderAnimeInfo() {
  const leftAnimeBlock = document.querySelector(
    '.shortstoryContent .imgRadius'
  ).parentNode;
  const topLineBottomBlock = document.createElement('div');
  topLineBottomBlock.className = 'extension';

  leftAnimeBlock.appendChild(topLineBottomBlock);

  render(<AnimeInfo />, topLineBottomBlock);
}

function removeTitle() {
  const title = document.querySelector('.shortstoryContent h4[itemprop=name]');

  if (title) {
    title.parentNode.removeChild(title);
  }
}

export function renderAnimeTitle() {
  const startAnimeBlock = document.querySelector('.shortstoryContent td p');
  const topLineBottomBlock = document.createElement('div');
  topLineBottomBlock.className = 'extension anime-title-wrapper';

  startAnimeBlock.parentNode.insertBefore(topLineBottomBlock, startAnimeBlock);
  render(<AnimeTitle />, topLineBottomBlock);
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
}
