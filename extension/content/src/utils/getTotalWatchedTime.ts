import { Chunk } from '../ChunkType';
import { mergeWatchedChunks } from './mergeWatchedChunks';

export function getTotalWatchedTime(arr: Chunk[]): number {
  const merged = mergeWatchedChunks(arr);

  return merged.reduce((acc, curr) => {
    return acc + curr.end - curr.start;
  }, 0);
}
