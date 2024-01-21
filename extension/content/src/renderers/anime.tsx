import { Api } from '@shikivost/api';
import { h, render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Anime } from '../../../api/src/types/Anime';
import { css } from '../../styled-system/css';
import { getTitle } from '../titleParser';

const api = Api.create();

function AnimeTitle() {
    const [anime, setAnime] = useState<Anime | null>(null);

  useEffect(() => {
    const animeTitle = getTitle()

    api.animes(animeTitle).then(([anime]) => {
      if (anime) {
        setAnime(anime);
      }
    });
  }, []);

  return (
    <div
      className={css({
        marginTop: '12px !important',
        display: 'inline-block',
        bg: '#fcdaab !important',
        padding: '4px !important',
        borderRadius: '4px !important',
        color: '#e68d19',
      })}
    >
      {anime?.name || ''}
    </div>
  )
}

export function renderAnime() {
  if (!getTitle()) {
    return null
  }

  const leftAnimeBlock = document.querySelector('.shortstoryContent .imgRadius').parentNode;
  const topLineBottomBlock = document.createElement('div');
  topLineBottomBlock.className = 'extension';

  leftAnimeBlock.appendChild(topLineBottomBlock);

  render(<AnimeTitle />, topLineBottomBlock);
}
