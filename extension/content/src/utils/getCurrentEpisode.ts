export function getCurrentEpisode() {
  const currentElement = document.querySelector("#items .active");
  const id = currentElement?.getAttribute("id");

  if (id) {
    return Number.parseInt(id.replaceAll(/\D/g, ""), 10) + 1;
  }

  return 0;
}
