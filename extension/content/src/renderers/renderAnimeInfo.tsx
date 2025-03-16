import { AnimeInfo } from "../components/AnimeInfo";
import Providers from "../components/Providers";
import { VideoTracker } from "../components/VideoTracker";
import { WatchedEpisodes } from "../components/WatchedEpisodes";
import { createRootNode } from "../utils/createRootNode";

export function renderAnimeInfo() {
  const root = createRootNode(".shortstoryContent .imgRadius");

  root.render(
    <Providers>
      <AnimeInfo />
      <WatchedEpisodes />
      <VideoTracker />
    </Providers>,
  );
}
