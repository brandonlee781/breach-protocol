<template>
  <ion-col class="wrapper" :class="chosenClass" @click="incrementValue">
    <span>{{ matrixValues[currValue] }}</span>
  </ion-col>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { useMatrix, FindPatternElement } from '@/composables/useMatrix';
import { IonCol } from '@ionic/vue';

const matrixValues = ['BD', 'E9', '1C', '55', 'FF', '7A'];

export default defineComponent({
  name: 'Matrix Element',
  components: { IonCol },
  props: {
    row: { type: Number as PropType<number>, required: true },
    col: { type: Number as PropType<number>, required: true },
    chosen: { type: Array as PropType<FindPatternElement[][]>, default: [] }
  },
  setup(props) {
    const { matrix, updateValue } = useMatrix();
    const currValue = computed<number>(() => matrix.value[props.row][props.col]);
    const chosenClass = computed(() => {
      let className = '';
      const firstSeq = props.chosen[0]?.length && props.chosen[0].find(i => i.row === props.row && i.col === props.col);
      const secSeq = props.chosen[1]?.length && props.chosen[1]?.find(i => i.row === props.row && i.col === props.col);
      const thirdSeq = props.chosen[2]?.length && props.chosen[2]?.find(i => i.row === props.row && i.col === props.col);

      if (firstSeq) className += 'first-seq ';
      if (secSeq) className += 'sec-seq ';
      if (thirdSeq) className += 'third-seq ';

      return className;
    })

    const incrementValue = () => {
      if (currValue.value + 1 >= matrixValues.length) {
        updateValue(props.row, props.col, 0);
      } else {
        updateValue(props.row, props.col, currValue.value + 1);
      }
    }

    return {
      matrixValues,
      currValue,
      incrementValue,
      chosenClass,
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

.wrapper {
  position: relative;
  height: 60px;
  width: 60px;

  &:hover > span {
    padding: 4px;
    border: 4px double rgb(78, 142, 150);
  }

  span {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    color: rgb(205, 240, 90);
    padding: 8px;
    font-size: 1.5rem;
    line-height: 44px;
    text-align: center;
    z-index: 10;
  }
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
