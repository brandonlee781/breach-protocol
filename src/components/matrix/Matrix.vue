<template>
  <ion-grid class="matrix-wrapper">
    <MatrixRow
      v-for="(row, index) in matrix"
      :key="`row-${index}`"
      :row="index"
      :chosen="chosenPatterns"
    ></MatrixRow>
  </ion-grid>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { IonGrid } from '@ionic/vue'
import MatrixRow from '@/components/matrix/MatrixRow.vue';
import { useMatrix } from '@/composables/useMatrix';

// Idea, instead of picking the best pattern,
// add buttons that can toggle through each pattern
// displaying the currently selected patterns on the matrix

export default defineComponent({
  name: 'Matrix',
  components: {
    MatrixRow,
    IonGrid,
  },
  props: {
    chosen: { type: Array as PropType<number[]>, default: () => [] }
  },
  setup(props) {
    const { matrix, patterns } = useMatrix();
    const chosenPatterns = computed(() => patterns.value.map((pat, index) => {
      return pat.matches[props.chosen[index]]
    }));
    const width = computed(() => `${matrix.value.length * 60}px`);

    return { matrix, patterns, chosenPatterns, width };
  },
});
</script>

<style lang="scss" scoped>
.matrix-wrapper {
  width: v-bind('width');
  padding: 0;
}
</style>
