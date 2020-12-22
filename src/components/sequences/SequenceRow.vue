<template>
  <div class="row-wrapper">
    <ion-button
      v-for="(seq, index) in sequence"
      :key="index"
      :color="color"
      @click="() => increaseValue(index)"
    >
      {{ valueDisplay(sequenceElements, seq) }}
    </ion-button>
    <ion-button v-if="sequence.length < 4" class="add-button" @click="increaseLength">
      <ion-icon slot="icon-only" :icon="add"></ion-icon>
    </ion-button>
    <ion-button v-if="sequence.length > 0" class="remove-button" @click="decreaseLength">
      <ion-icon slot="icon-only" :icon="remove"></ion-icon>
    </ion-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue';
import { IonButton, IonIcon } from '@ionic/vue';
import { add, remove } from 'ionicons/icons';
import { useMatrix } from '@/composables/useMatrix';
import { valueDisplay } from '@/components/matrix/MatrixElement.vue';
import { SequenceElement } from '@/composables/solver/SequenceScore';

export default defineComponent({
  name: 'SequenceRow',
  components: {
    IonButton,
    IonIcon,
  },
  props: {
    sequence: { type: Array as PropType<SequenceElement[]>, default: [] },
    color: { type: String, default: 'primary' }
  },
  setup(props, { emit }) {
    const { sequenceElements } = useMatrix();
    const increaseLength = () => {
      const newLength = Math.min(4, props.sequence.length + 1);
      if (newLength <= 4 && props.sequence.length < newLength) {
        emit('update:sequence', [...props.sequence, sequenceElements[0]]);
      }
    }
    const decreaseLength = () => {
      const newLength = Math.max(0, props.sequence.length - 1);
      if (newLength >= 0 && props.sequence.length > newLength) {
        const newSequence = props.sequence.slice(
          0,
          props.sequence.length - 1
        );
        emit('update:sequence', newSequence);
      }
    }

    const increaseValue = (index: number) => {
      const val = props.sequence[index]
      const idx = sequenceElements.findIndex(el => el === val);
      const newSequence = [...props.sequence];

      if (idx + 1 > sequenceElements.length - 1) {
        newSequence[index] = sequenceElements[0];
      } else {
        newSequence[index] = sequenceElements[idx + 1];
      }
      emit('update:sequence', newSequence);
    }
  
    return {
      add,
      remove,
      valueDisplay,
      sequenceElements,
      increaseLength,
      decreaseLength,
      increaseValue,
    };
  },
});
</script>

<style lang="scss" scoped>
$buttonPadding: 4px;
.add-button,
.remove-button {
  --background: transparent;
  --padding-start: #{$buttonPadding};
  --padding-end: #{$buttonPadding};
}
.row-wrapper {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
}
</style>
