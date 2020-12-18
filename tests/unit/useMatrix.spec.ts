import { findPatterns, useMatrix } from '@/composables/useMatrix';

describe('findPatterns', () => {
  it('finds multiple pattern in a more complex matrix', () => {
    const patterns = [
      { pattern: [3, 2], matches: 13 },
      { pattern: [2, 1, 0], matches: 16 },
      { pattern: [0, 0, 3], matches: 79 },
    ]
    const { matrix } = useMatrix();

    matrix.value = [
      [0, 1, 2, 0, 0],
      [2, 2, 0, 0, 3],
      [0, 0, 3, 0, 0],
      [2, 3, 3, 1, 0],
      [3, 2, 0, 3, 3],
    ];

    patterns.forEach(pat => {
      const { pattern, matches } = pat;
      const foundPattern = findPatterns(pattern, [], []);
      expect(foundPattern.length).toBe(matches);
    })

  })
})
