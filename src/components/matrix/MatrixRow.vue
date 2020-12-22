<template>
  <ion-row class="wrapper">
    <MatrixElement
      v-for="(elem, index) in matrix[row]"
      :row="row"
      :col="index"
      :key="`row-${row}-${index}`"
    ></MatrixElement>
  </ion-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonRow } from '@ionic/vue';
import MatrixElement from '@/components/matrix/MatrixElement.vue';
import { useMatrix } from '@/composables/useMatrix';

export default defineComponent({
  name: 'MatrixRow',
  components: {
    IonRow,
    MatrixElement,
  },
  props: {
    row: { type: Number, required: true },
  },
  setup(/*props, ctx*/) {
    const { matrix } = useMatrix()
    return { matrix };
  },
});
</script>

<style lang="scss" scoped>

</style>
