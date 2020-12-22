import { Path } from './Path';
import { SequenceElement, SequenceScore } from './SequenceScore';

export class PathScore {
  score: number | null = null;
  path: Path | null = null;
  sequenceScores: SequenceScore[] = [];

  constructor(pPath: Path, pSequences: SequenceElement[][], pBufferSize: number) {
    this.path = pPath;
    this.sequenceScores = pSequences.map((sequence, rewardLevel) => new SequenceScore(sequence, pBufferSize, rewardLevel));
  }

  compute(matrix: SequenceElement[][]) {
    if (this.score !== null) {
      return this.score;
    }
    for (const [row, col] of this.path!.coords) {
      for (const seqScore of this.sequenceScores) {
        seqScore.compute(matrix[row][col]);
      }
    }
    this.score = this.sequenceScores.map(seq => seq.score).reduce((a, b) => a += b, 0);
    return this.score;
  }
}