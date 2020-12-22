/*
  Original algrithm from: https://nicolas-siplis.com/blog/cyberpwned
  credit to Nicolas Sipliss
*/
import { Path } from './Path';
import { PathScore } from './PathScore';
import { SequenceElement } from './SequenceScore';

export type Sequence = SequenceElement[];
export type Matrix = Sequence[]

export function generatePaths(bufferSize: number, matrix: Matrix, sequences: Sequence[]) {
  const completedPaths: Path[] = [];

  const candidateCoords = (turn = 0, coordinate = [0, 0]) => {
    if (turn % 2 === 0) {
      return matrix.map((m: any, column: number) => [coordinate[0], column]);
    } else {
      return matrix.map((m: any, row: number) => [row, coordinate[1]]);
    }
  }

  const walkPaths = (
    pBufferSize: number,
    pCompletedPaths: Path[],
    partialPathsStack = [new Path()],
    turn = 0,
    candidates = candidateCoords()
  ) => {
    const path = partialPathsStack.pop()!;
    for (const coord of candidates) {
      try {
        const newPath = path.add(coord)
        if (newPath.coords.length === pBufferSize) {
          pCompletedPaths.push(newPath);
        } else if (new PathScore(newPath, sequences, bufferSize).compute(matrix) < 0) {
          continue;
        } else {
          partialPathsStack.push(newPath);
          walkPaths(bufferSize, pCompletedPaths, partialPathsStack, turn + 1, candidateCoords(turn + 1, coord));
        }
      } catch (error) {
        continue;
      }
    }
  }

  walkPaths(bufferSize, completedPaths);
  return completedPaths;
}