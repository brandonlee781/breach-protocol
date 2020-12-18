<template>
  <ion-row class="wrapper">
    <MatrixElement
      v-for="(elem, index) in matrix[row]"
      :row="row"
      :col="index"
      :key="`row-${row}-${index}`"
      :chosen="chosen"
    ></MatrixElement>
  </ion-row>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IonRow } from '@ionic/vue';
import MatrixElement from '@/components/matrix/MatrixElement.vue';
import { useMatrix, FindPatternElement } from '@/composables/useMatrix';

export default defineComponent({
  name: 'MatrixRow',
  components: {
    IonRow,
    MatrixElement,
  },
  props: {
    row: { type: Number, required: true },
    chosen: { type: Array as PropType<FindPatternElement[][]>, default: [] }
  },
  setup(/*props, ctx*/) {
    const { matrix } = useMatrix()
    return { matrix };
  },
});
</script>

<style lang="scss" scoped>

</style>
