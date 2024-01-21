const enTitleRegexp = /\/(.*?)\[/

export function parseTitle(title: string = '') {
  const match = title.match(enTitleRegexp)

  if (match && match[1]) {
    return match[1].trim()
  }

  return null
}

export function getTitle()  {
  const titleContent = document.querySelector(".shortstoryHead > h1")

  return parseTitle(titleContent?.textContent);
}
