import { generatePaths, Matrix, Sequence } from '@/composables/solver/generatePaths';
import { Path } from '@/composables/solver/Path';
import { PathScore } from '@/composables/solver/PathScore';

describe('generatePaths', () => {
  it('finds multiple pattern in a more complex matrix', () => {
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
      [0x55, 0xff, 0x1c],
      [0xbd, 0xe9, 0xbd, 0x55],
      [0x55, 0x1c, 0xff, 0xbd]
    ];

    const expectedPath = [[0, 1], [2, 1], [2, 3], [1, 3], [1, 0], [4, 0], [4, 3]];

    type PathAndScores = [Path, number];
    const paths: PathAndScores[] = generatePaths(bufferSize, matrix, sequences)
      .map(path => [path, new PathScore(path, sequences, bufferSize).compute(matrix)]);
    const [maxPath, maxPathScore] = paths.sort(([aPath, aScore], [bPath, bScore]) => bScore - aScore)[0];

    expect(maxPath.coords).toEqual(expectedPath);
  })
})
