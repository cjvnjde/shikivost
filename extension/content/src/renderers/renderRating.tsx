import { AnimeRating } from "../components/AnimeRating";
import Providers from "../components/Providers";
import { createRootNode } from "../utils/createRootNode";

export function renderRating() {
  const root = createRootNode(".shortstoryContent table div > strong", {
    className: "anime-rating-wrapper",
  });

  root.render(
    <Providers>
      <AnimeRating />
    </Providers>,
  );
}
