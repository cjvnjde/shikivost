const enTitleRegexp = /\/(.*?)\[/;
const ruTitleRegexp = /(.*) \/ /;

export function parseTitle(title: string | null = "") {
  const enMatch = title?.match(enTitleRegexp);
  const ruMatch = title?.match(ruTitleRegexp);

  const titles = {
    en: "",
    ru: "",
  };

  if (enMatch && enMatch[1]) {
    titles.en = enMatch[1].trim();
  }

  if (ruMatch && ruMatch[1]) {
    titles.ru = ruMatch[1].trim();
  }

  return titles;
}

export function getTitle() {
  const titleContent = document.querySelector(".shortstoryHead > h1");

  return parseTitle(titleContent?.textContent);
}

export function getYear() {
  const titleContent = document.querySelector(".shortstoryContent p");

  const match = titleContent?.textContent?.match(/\d+$/);

  if (match && match[0]) {
    return match[0].trim();
  }

  return null;
}

const episodeRegexp = /\[\d-(\d+) из (\d+)\+?]/;

export function getEpisodesCount() {
  const titleContent = document.querySelector(".shortstoryHead > h1");

  const match = titleContent?.textContent?.match(episodeRegexp);

  const episodes = {
    current: 0,
    total: 0,
  };

  if (match) {
    if (match[1]) {
      episodes.current = Number.parseInt(match[1], 10);
    }

    if (match[2]) {
      episodes.total = Number.parseInt(match[2], 10);
    }
  }

  return episodes;
}
