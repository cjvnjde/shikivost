import { AnimeTitle } from "../components/AnimeTitle";
import Providers from "../components/Providers";
import { createRootNode } from "../utils/createRootNode";

function removeTitle() {
  const title = document.querySelector(".shortstoryContent h4[itemprop=name]");

  if (title) {
    title.parentNode?.removeChild(title);
  }
}

export function renderAnimeTitle() {
  removeTitle();

  const root = createRootNode(".shortstoryContent td p", {
    className: "anime-title-wrapper",
    position: "before",
  });

  root.render(
    <Providers>
      <AnimeTitle />
    </Providers>,
  );
}
