import { h, render } from 'preact';
import { AnimeInfo } from '../components/AnimeInfo';
import { AnimeTitle } from '../components/AnimeTitle';
import { fetchAnime } from '../state';
import { getTitle } from '../titleParser';

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

  fetchAnime(title);
  removeTitle();

  renderAnimeInfo();
  renderAnimeTitle();
}
