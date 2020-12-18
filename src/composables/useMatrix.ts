/* eslint-disable @typescript-eslint/no-use-before-define */
import { computed, onMounted, Ref, ref, watch } from 'vue';

interface PatternElement {
  row: number;
  col: number;
}

export interface FindPatternElement extends PatternElement {
  val: number;
  dir?: Directions;
}

enum Directions {
  X,
  Y
}

const flattenMatrix = (pMatrix: number[][]): FindPatternElement[] => {
  const rMatrix = [];
  for (let row = 0; row < pMatrix.length; row++) {
    for (let col = 0; col < pMatrix[row].length; col++) {
      const val = pMatrix[row][col];
      rMatrix.push({
        row,
        col,
        val,
      });
    }
  }
  return rMatrix;
}

// Find all possible next matching elements in the pattern
const findNextElements = (curr: number, prev: FindPatternElement | undefined) => {
  if (!prev) return flatMatrix.value.filter(m => m.val === curr);
  if (prev.dir === Directions.X) {
    return flatMatrix.value.filter(m => m.val === curr && m.col === prev.col);
  } 
  if (prev.dir === Directions.Y) {
    return flatMatrix.value.filter(m => m.val === curr && m.row === prev.row);
  }
  return flatMatrix.value.filter(m =>
    m.val === curr &&
    (m.row === prev.row || m.col === prev.col)
  );
}
const filterOutRepeats = (found: FindPatternElement[]) => (n: FindPatternElement): boolean => {
  let valid = true;
  if (found.length) {
    found.forEach(f => {
      if (f.row === n.row && f.col === n.col) {
        valid = false;
      }
    })
  }
  return valid;
};

export const findPatterns = (
  pattern: number[],
  found: FindPatternElement[] = [],
  allFound: FindPatternElement[][] = []
): FindPatternElement[][] => {
  const searchElement: number = pattern[found.length];
  const previousMatch: FindPatternElement | null = found[found.length - 1];
  const previousDirection = previousMatch?.dir;

  const matchingEls = findNextElements(searchElement, previousMatch)
    .filter(filterOutRepeats(found))
    .map(el => {
      const curr = {
        ...el,
        dir: previousDirection === Directions.X ? Directions.Y : Directions.X,
      }
      if (!previousMatch && curr.row === 0) {
        curr.dir = Directions.X
      } else if (!previousMatch && curr.row !== 0) {
        curr.dir = Directions.Y
      }

      return curr
    })

  if (pattern.length === found.length) {
    allFound.push(found);
  } else if (matchingEls.length) {
    for (const el of matchingEls) {
      findPatterns(pattern, found.concat(el), allFound);
    }
  }
  return allFound;
}

const randomElement = () => Math.floor(Math.random() * 6)

const getMatrix = (width: number) => {
  const matrix: number[][] = [];
  for (let i = 0; i < width; i++) {
    const row: number[] = [];
    for (let j = 0; j < width; j++) {
      row.push(randomElement());
    }
    matrix.push(row);
  }
  return matrix;
};
const getSequences = () => {
  const sequences = [];
  for (let i = 0; i < 3; i++) {
    const randLength = Math.floor(Math.random() * (4 - 2 + 1)) + 2;
    const row = Array.from({ length: randLength }, () => randomElement());
    
    sequences.push(row);
  }
  return sequences;
}

const matrix = ref<number[][]>([]);
const flatMatrix = computed(() => flattenMatrix(matrix.value));
const sequences = ref<number[][]>([]);
const patterns = ref<{ pattern: number[]; matches: FindPatternElement[][] }[]>([]);

export function useMatrix(width?: Ref<number>) {
  const updateValue = (row: number, col: number, value: number) => {
    matrix.value[row][col] = value;
  }

  const getPatterns = (pat: number[][]) => {
    patterns.value = pat.map(pattern => {
      const matches = findPatterns(pattern, [], []).filter(p => p.length);
      return {
        pattern,
        matches,
      };
    })
  }

  watch([sequences, matrix], ([newSequences]) => {
    getPatterns(newSequences);
  });
  watch([width], () => matrix.value = getMatrix(width?.value ?? 5))

  onMounted(() => {
    if (!matrix.value.length) {
      matrix.value = getMatrix(width?.value ?? 5)
    }
    if (!sequences.value.length) {
      sequences.value = getSequences()
    }
  });

  const resetAll = () => {
    matrix.value = getMatrix(width?.value ?? 5);
    sequences.value = getSequences();
    patterns.value = [];
  }

  return {
    matrix,
    sequences,
    patterns,
    updateValue,
    resetAll,
  }
}