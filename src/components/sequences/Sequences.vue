<template>
  <ion-grid class="sequence-wrapper">
    <ion-text>
      <h2>Sequences</h2>
    </ion-text>
    <SequenceRow
      v-for="(sequence, index) in sequences"
      :key="index"
      :color="colors[index]"
      :sequence="sequence"
      @update:sequence="(val) => updateSequence(val, index)"
    ></SequenceRow>
  </ion-grid>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonGrid, IonText } from '@ionic/vue';

import { useMatrix } from '@/composables/useMatrix';
import SequenceRow from './SequenceRow.vue';

const colors = ['primary', 'warning', 'tertiary'];

export default defineComponent({
  name: 'Sequences',
  components: {
    IonGrid,
    SequenceRow,
    IonText,
  },
  setup(/*props, ctx*/) {
    const { sequences } = useMatrix();

    const updateSequence = (val: number[], index: number) => {
      const newSequences = [...sequences.value];
      newSequences[index] = val;
      sequences.value = newSequences;
    }

    return { sequences, updateSequence, colors };
  },
});
</script>

<style lang="scss" scoped>
.sequence-wrapper {
  max-width: 300px;
  margin: 0 1rem;
}
</style>

