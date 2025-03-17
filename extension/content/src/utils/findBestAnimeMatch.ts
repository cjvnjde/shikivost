import Fuse from "fuse.js";
import { Anime } from "../api/types/Anime";

export function findBestAnimeMatch(
  enQuery: string,
  ruQuery: string,
  episodesQuery: { total: number; current: number },
  animeList: Anime[],
): Anime {
  const fuse = new Fuse(animeList, {
    keys: ["name", "russian"],
    threshold: 0.3,
  });

  const enResults = fuse.search(enQuery);
  const ruResults = fuse.search(ruQuery);

  const candidateMap = new Map<number, { anime: Anime; score: number }>();
  const addResultsToMap = (results: typeof enResults) => {
    results.forEach(({ item, score = 1 }) => {
      const existing = candidateMap.get(item.id);

      if (!existing || score < existing.score) {
        candidateMap.set(item.id, { anime: item, score });
      }
    });
  };

  addResultsToMap(enResults);
  addResultsToMap(ruResults);

  const candidates = Array.from(candidateMap.values());

  if (candidates.length === 0) {
    const firstAnime = animeList[0];
    firstAnime.suspicious = true;
    return firstAnime;
  }

  const candidatesWithDiff = candidates.map((candidate) => {
    const totalDiff = Math.abs(episodesQuery.total - candidate.anime.episodes);
    const currentDiff = Math.abs(
      episodesQuery.current - candidate.anime.episodes_aired,
    );
    return {
      ...candidate,
      sumDiff: totalDiff + currentDiff,
    };
  });
  const maxSumDiff = Math.max(...candidatesWithDiff.map((c) => c.sumDiff), 1);
  const maxTitleScore = Math.max(...candidatesWithDiff.map((c) => c.score), 1);

  const scoredCandidates = candidatesWithDiff.map((candidate) => {
    const normalizedTitle = candidate.score / maxTitleScore;
    const normalizedEpisodes = candidate.sumDiff / maxSumDiff;
    const combinedScore = normalizedTitle * 0.7 + normalizedEpisodes * 0.3;
    return { ...candidate, combinedScore };
  });

  scoredCandidates.sort((a, b) => a.combinedScore - b.combinedScore);

  return scoredCandidates[0].anime;
}
