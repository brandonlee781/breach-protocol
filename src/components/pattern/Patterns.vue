<template>
  <ion-grid>
    <div class="pattern-row">
      <ion-button color="primary" @click="() => decreaseChosenPattern(0)">
        <ion-icon slot="icon-only" :icon="chevronBack"></ion-icon>
      </ion-button>
      <ion-text color="primary">
        <h3 class="pattern-count">
          {{ patterns.length && patterns[0].matches.length ? chosen[0] + 1 : 0 }} /
          {{ patterns.length && patterns[0].matches && patterns[0].matches.length }}
          Patterns
        </h3>
      </ion-text>
      <ion-button color="primary" @click="() => increaseChosenPattern(0)">
        <ion-icon slot="icon-only" :icon="chevronForward"></ion-icon>
      </ion-button>
    </div>

    <div class="pattern-row">
      <ion-button color="warning" @click="() => decreaseChosenPattern(1)">
        <ion-icon slot="icon-only" :icon="chevronBack"></ion-icon>
      </ion-button>
      <ion-text color="warning">
        <h3 class="pattern-count">
          {{ patterns.length && patterns[1].matches.length ? chosen[1] + 1 : 0 }} /
          {{ patterns.length && patterns[1].matches && patterns[1].matches.length }}
          Patterns
        </h3>
      </ion-text>
      <ion-button color="warning" @click="() => increaseChosenPattern(1)">
        <ion-icon slot="icon-only" :icon="chevronForward"></ion-icon>
      </ion-button>
    </div>

    <div class="pattern-row">
      <ion-button color="tertiary" @click="() => decreaseChosenPattern(2)">
        <ion-icon slot="icon-only" :icon="chevronBack"></ion-icon>
      </ion-button>
      <ion-text color="tertiary">
        <h3 class="pattern-count">
          {{ patterns.length && patterns[2].matches.length ? chosen[2] + 1 : 0 }} /
          {{ patterns.length && patterns[2].matches && patterns[2].matches.length }}
          Patterns
        </h3>
      </ion-text>
      <ion-button color="tertiary" @click="() => increaseChosenPattern(2)">
        <ion-icon slot="icon-only" :icon="chevronForward"></ion-icon>
      </ion-button>
    </div>
  </ion-grid>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import { IonGrid, IonButton, IonIcon, IonText } from '@ionic/vue';
import { chevronForward, chevronBack } from 'ionicons/icons';
import { useMatrix } from '@/composables/useMatrix';

export default defineComponent({
  name: 'Patterns',
  components: {
    IonGrid,
    IonButton,
    IonIcon,
    IonText,
  },
  props: {
    chosen: { type: Array as PropType<number[]>, default: () => [] }
  },
  setup(props, { emit }) {
    const { patterns } = useMatrix();

    const increaseChosenPattern = (index: number) => {
      const newChosen = [...props.chosen];
      const matchCount = patterns.value[index].matches.length;
      if (newChosen[index] + 1 >= matchCount) {
        newChosen[index] = 0;
      } else {
        newChosen[index] = newChosen[index] + 1;
      }
      emit('update:chosen', newChosen);
    }

    const decreaseChosenPattern = (index: number) => {
      const newChosen = [...props.chosen];
      if (newChosen[index] - 1 < 0) {
        newChosen[index] = 0;
      } else {
        newChosen[index] = newChosen[index] - 1;
      }
      emit('update:chosen', newChosen);
    }
    return { 
      chevronForward,
      chevronBack,
      patterns,

      increaseChosenPattern,
      decreaseChosenPattern,
    };
  },
});
</script>

<style lang="scss" scoped>
.pattern-count {
  margin: 7px 0;
  padding: 0 8px;
}
.pattern-row {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}
</style>
