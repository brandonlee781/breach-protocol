<template>
  <div class="row-wrapper">
    <ion-button
      v-for="(seq, index) in sequence"
      :key="index"
      :color="color"
      @click="() => increaseValue(index)"
    >
      {{ matrixValues[seq] }}
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
import { defineComponent, PropType, ref } from 'vue';
import { IonButton, IonIcon } from '@ionic/vue';
import { add, remove } from 'ionicons/icons';

const matrixValues = ['BD', 'E9', '1C', '55', 'FF', '7A'];

export default defineComponent({
  name: 'SequenceRow',
  components: {
    IonButton,
    IonIcon,
  },
  props: {
    sequence: { type: Array as PropType<number[]>, default: [] },
    color: { type: String, default: 'primary' }
  },
  setup(props, { emit }) {

    const increaseLength = () => {
      const newLength = Math.min(4, props.sequence.length + 1);
      if (newLength <= 4 && props.sequence.length < newLength) {
        emit('update:sequence', [...props.sequence, 0]);
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
      const newSequence = [...props.sequence];
      if (val + 1 > matrixValues.length - 1) {
        newSequence[index] = 0;
      } else {
        newSequence[index] = val + 1;
      }
      emit('update:sequence', newSequence);
    }
  
    return {
      add,
      remove,
      matrixValues,

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
