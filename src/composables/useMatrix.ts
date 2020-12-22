/* eslint-disable @typescript-eslint/no-use-before-define */
import { onMounted, ref, watch} from 'vue';
import { generatePaths, Matrix, Sequence } from './solver/generatePaths';
import { Path } from './solver/Path';
import { PathScore } from './solver/PathScore';
import { SequenceElement } from './solver/SequenceScore';

const sequenceElements: SequenceElement[] = [0xbd, 0xe9, 0x1c, 0x55, 0xff, 0x77];
const getSequenceElement = (num: number): SequenceElement => {
  return sequenceElements[num];
}
const randomElement = () => getSequenceElement(Math.floor(Math.random() * 6))

const getMatrix = (width: number) => {
  const matrix: SequenceElement[][] = [];
  for (let i = 0; i < width; i++) {
    const row: SequenceElement[] = [];
    for (let j = 0; j < width; j++) {
      row.push(randomElement());
    }
    matrix.push(row);
  }
  return matrix;
};
const getSequences = () => {
  const sequences = [];
  for (let i = 0; i < 4; i++) {
    const randLength = Math.floor(Math.random() * (4 - 2 + 1)) + 2;
    const row = Array.from({ length: randLength }, () => randomElement());
    
    sequences.push(row);
  }
  return sequences;
}

const matrix = ref<Matrix>([]);
const sequences = ref<Sequence[]>([]);

export function useMatrix() {
  const evaluatingPath = ref(false);
  const width = ref(5);
  const buffer = ref(7);
  const updateValue = (row: number, col: number, value: SequenceElement) => {
    matrix.value[row][col] = value;
  }

  onMounted(() => {
    if (!matrix.value.length) {
      matrix.value = getMatrix(width?.value ?? 5)
    }
    if (!sequences.value.length) {
      sequences.value = getSequences()
    }
  });

  watch(width, (newWidth, oldWidth) => {
    const diff = newWidth - oldWidth;
    if (diff > 0) {
      const newVals = Array(diff).fill(0xbd);
      const newRow = Array(newWidth).fill(0xbd);
      matrix.value = matrix.value.map(row => row.concat(newVals));
      for (let i = 0; i < diff; i++) {
        matrix.value.push([...newRow]);
      }
    } else {
      matrix.value.length = newWidth;
      matrix.value.forEach((row, idx) => {
        matrix.value[idx].length = newWidth;
      })
    }
  });

  const resetAll = () => {
    matrix.value = getMatrix(width?.value ?? 5);
    sequences.value = getSequences();
  }

  const findPath = () => {
    let coords: number[][] = [];
    evaluatingPath.value = true;
    const paths = generatePaths(buffer.value, matrix.value, sequences.value);
    const pathsAndScores: [Path, number][] = paths.map(path => [path, new PathScore(path, sequences.value, buffer.value).compute(matrix.value)])
    if (pathsAndScores.length) {
      const [[bestPath]] = pathsAndScores.sort(([aPath, aScore], [bPath, bScore]) => bScore - aScore);
      coords = bestPath.coords;
    }
    evaluatingPath.value = false;
    return coords;
  }

  return {
    buffer,
    width,
    matrix,
    sequences,
    sequenceElements,
    updateValue,
    resetAll,
    findPath,
    evaluatingPath,
  }
}