import { generatePaths, Matrix, Sequence } from './composables/solver/generatePaths';
import { Path } from './composables/solver/Path';
import { PathScore } from './composables/solver/PathScore';

export function main() {
  const matrix: Matrix = [
    [0x1c, 0xbd, 0x55, 0xe9, 0x55],
    [0x1c, 0xbd, 0x1c, 0x55, 0xe9],
    [0x55, 0xe9, 0xe9, 0xbd, 0xbd],
    [0x55, 0xff, 0xff, 0x1c, 0x1c],
    [0xff, 0xe9, 0x1c, 0xbd, 0xff]
  ];
  const bufferSize = 7;
  const sequences: Sequence[] = [
    [0x1c, 0x1c, 0x55],
    [0X55, 0Xff, 0X1c],
    [0xbd, 0xe9, 0xbd, 0x55],
    [0x55, 0x1c, 0xff, 0xbd]
  ];

  type PathAndScores = [Path, number];
  console.log('just before generatepath');
  const paths: PathAndScores[] = generatePaths(bufferSize, matrix).map(path => [path, new PathScore(path, sequences, bufferSize).compute(matrix)]);
  console.log(paths);
  const [maxPath] = paths.sort((a, b) => a[1] - b[1])[0];
  console.log(maxPath)
}