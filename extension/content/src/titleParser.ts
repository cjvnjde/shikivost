const enTitleRegexp = /\/(.*?)\[/;

export function parseTitle(title: string | null = '') {
  const match = title?.match(enTitleRegexp);

  if (match && match[1]) {
    return match[1].trim();
  }

  return null;
}

export function getTitle() {
  const titleContent = document.querySelector('.shortstoryHead > h1');

  return parseTitle(titleContent?.textContent);
}

export function getYear() {
  const titleContent = document.querySelector('.shortstoryContent p');

  const match = titleContent?.textContent?.match(/\d+$/);

  if (match && match[0]) {
    return match[0].trim();
  }

  return null;
}
