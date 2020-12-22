export type SequenceElement = 0xbd | 0xe9 | 0x1c | 0x55 | 0xff | 0x77;

export class SequenceScore {
  maxProgress = 0;
  sequence: SequenceElement[] = [];
  score = 0;
  rewardLevel = 0;
  bufferSize = 0;

  constructor(pSequence: SequenceElement[], pBufferSize: number, rewardLevel = 0) {
    this.maxProgress = pSequence.length;
    this.sequence = pSequence;
    this.rewardLevel = rewardLevel;
    this.bufferSize = pBufferSize;
  }

  public compute(compare: SequenceElement) {
    if (!this.completed()) {
      if (this.sequence[this.score] === compare) {
        this.increase();
      } else {
        this.decrease();
      }
    }
  }

  // When the head of the sequence matches the targed node, increase the score by 1
  // If the sequence has been completed set the score depending on the reward level
  private increase() {
    this.bufferSize -= 1;
    this.score += 1;
    if (this.completed()) {
      // Can be adjusted to maximize either:
      // a) highest quality rewards, possible lesser quantity
      this.score = 10 ** (this.rewardLevel + 1);
      // b) highest amount of rewards, possibly lesser quality
      // this.score = 100 * (this.rewardLevel + 1);
    }
  }

  // When an incorrect value is matched against the current head of the sequence, the score is
  // decreased by 1 (can't go below 0)
  // If it's not possible to complete the sequence, set the score to a negative value depending
  // on the reward
  private decrease() {
    this.bufferSize -= 1;
    if (this.score > 0) {
      this.score -= 1;
    }
    if (this.completed()) {
      this.score = -this.rewardLevel - 1;
    }
  }

  // A sequence is considered completed if no further progress is possible or necessary
  private completed() {
    return this.score < 0 || this.score >= this.maxProgress || this.bufferSize < (this.maxProgress - this.score);
  }
}