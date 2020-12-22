<template>
  <ion-col
    class="el-wrapper"
    v-longpress="() => setOpen(true, $event)"
    @click.alt.exact="() => setOpen(true, $event)"
    @click.shift.exact="decrementValue"
    @click.exact="incrementValue"
  >
    <span class="element">{{ valueDisplay(sequenceElements, currValue) }}</span>
  </ion-col>
  <ion-popover
    :is-open="isOpen"
    css-class="element-popover"
    :event="event"
    :show-backdrop="false"
    @onDidDismiss="() => setOpen(false)"
  >
    <ion-list>
      <ion-item
        class="element"
        v-for="(v) in sequenceElements"
        :key="v"
        @click="() => setElement(v)"
      >
        {{ v }}
      </ion-item>
    </ion-list>
  </ion-popover>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, ref } from 'vue';
import { useMatrix } from '@/composables/useMatrix';
import { IonCol, IonPopover, IonList , IonItem} from '@ionic/vue';
import { SequenceElement } from '@/composables/solver/SequenceScore';

const sequenceValues = ['BD', 'E9', '1C', '55', 'FF', '7A'];
export const valueDisplay = (elements: SequenceElement[], value: SequenceElement) => {
  const idx = elements.findIndex(el => el === value);
  return sequenceValues[idx];
}

export default defineComponent({
  name: 'Matrix Element',
  components: { IonCol, IonPopover, IonList, IonItem },
  props: {
    row: { type: Number as PropType<number>, required: true },
    col: { type: Number as PropType<number>, required: true },
  },
  setup(props) {
    const isOpen = ref(false);
    const event = ref<Event | null>();
    const { matrix, updateValue, sequenceElements } = useMatrix();
    const currValue = computed<SequenceElement>(() => matrix.value[props.row][props.col]);

    // const chosenClass = computed(() => {
    //   let className = '';
    //   const firstSeq = props.chosen[0]?.length && props.chosen[0].find(i => i.row === props.row && i.col === props.col);
    //   const secSeq = props.chosen[1]?.length && props.chosen[1]?.find(i => i.row === props.row && i.col === props.col);
    //   const thirdSeq = props.chosen[2]?.length && props.chosen[2]?.find(i => i.row === props.row && i.col === props.col);

    //   if (firstSeq) className += 'first-seq ';
    //   if (secSeq) className += 'sec-seq ';
    //   if (thirdSeq) className += 'third-seq ';

    //   return className;
    // })

    const decrementValue = () => {
      const idx = sequenceElements.findIndex(el => el === currValue.value);
      if (idx - 1 >= 0) {
        updateValue(props.row, props.col, sequenceElements[idx - 1]);
      } else {
        updateValue(props.row, props.col, sequenceElements[sequenceElements.length - 1]);
      }
    }

    const incrementValue = () => {
      const idx = sequenceElements.findIndex(el => el === currValue.value);
      if (idx + 1 >= sequenceElements.length) {
        updateValue(props.row, props.col, sequenceElements[0]);
      } else {
        updateValue(props.row, props.col, sequenceElements[idx + 1]);
      }
    }

    const setOpen = (state: boolean, ev?: Event) => {
      event.value = ev;
      isOpen.value = state;
    }

    const setElement = (value: SequenceElement) => {
      updateValue(props.row, props.col, value)
      setOpen(false);
    }

    return {
      isOpen,
      event,
      sequenceElements,
      currValue,
      incrementValue,
      decrementValue,
      // chosenClass,
      valueDisplay,
      setOpen,
      setElement,
    }
  },
});
</script>

<style lang="scss" scoped>
$firstColor: rgba(#3880ff, 0.6);
$secondColor: rgba(#ffc409, 0.6);
$thirdColor: rgba(#5260ff, 0.6);

@mixin two-colors($color1, $color2) {
  background: $color1;
  overflow: hidden;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 60px;
    background: $color2;
    transform: skew(-45deg);
    transform-origin: top;
    overflow: hidden;
  }
}

.element {
  color: rgb(205, 240, 90);
  padding: 8px;
  font-size: 1.5rem;
  line-height: 44px;
  text-align: center;
  z-index: 10;
  user-select: none;
  cursor: pointer;
}

.el-wrapper {
  height: 60px;
  width: 60px;

  &:hover > span {
    padding: 4px;
    border: 4px double rgb(78, 142, 150);
  }

  & > .element {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
}

.element-popover .popover-content {
  --width: 60px;
  display: flex;
  flex-flow: column nowrap;
}

.first-seq {
  background: $firstColor;
}
.sec-seq {
  background: $secondColor;
  span {
    color: black;
  }
}
.third-seq {
  background: $thirdColor;
}

.first-seq.sec-seq {
  @include two-colors($firstColor, $secondColor);
}

.first-seq.third-seq {
  @include two-colors($firstColor, $thirdColor);
}
.sec-seq.third-seq {
  @include two-colors($secondColor, $thirdColor);
}

</style>
