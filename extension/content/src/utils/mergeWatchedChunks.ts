import { Chunk } from '../ChunkType';

export function mergeWatchedChunks(arr: Chunk[]): Chunk[] {
  if (arr.length <= 1) return arr;

  const sortedArr = [...arr].sort((a, b) => a.start - b.start);
  const result: Chunk[] = [];
  let current = sortedArr[0];

  for (let i = 1; i < sortedArr.length; i++) {
    if (current.end >= sortedArr[i].start) {
      current.end = Math.max(current.end, sortedArr[i].end);
    } else {
      result.push(current);
      current = sortedArr[i];
    }
  }

  result.push(current);
  return result;
}
