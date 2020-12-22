<template>
  <ion-grid class="matrix-wrapper">
    <div class="chosen-wrapper">
      <div
        v-for="(c, index) in chosen"
        :key="`chosen-${index}`"
        :class="`chosen row-${c[0]} col-${c[1]}`"
      >
        {{ index + 1 }}
      </div>
    </div>
    <MatrixRow
      v-for="(row, index) in matrix"
      :key="`row-${index}`"
      :row="index"
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
    chosen: { type: Array as PropType<number[][]>, default: () => [] }
  },
  setup() {
    const { matrix } = useMatrix();
    const width = computed(() => ({
      total: `${matrix.value.length * 60}px`,
      length: matrix.value.length,
    }));

    return { matrix, width };
  },
});
</script>

<style lang="scss" scoped>
.matrix-wrapper {
  width: v-bind('width.total');
  padding: 0;
  position: relative;
}

.chosen-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  grid-template-rows: repeat(v-bind('width.length'), 60px);
  grid-template-columns: repeat(v-bind('width.length'), 60px);

  .chosen {
    height: 60px;
    width: 60px;
    text-align: center;

    @for $i from 0 through 6 {
      &.row-#{$i} {
        grid-row: #{$i + 1} / span 1;
      }

      &.col-#{$i} {
        grid-column: #{$i + 1} / span 1;
      }
    }
  }
}
</style>
