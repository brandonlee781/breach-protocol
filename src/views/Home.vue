<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <div id="container">
        <div>
          <div class="matrix-controls">
              <ion-button @click="resetAll">
                <ion-icon slot="start" :icon="refresh"></ion-icon>
                Randomize
              </ion-button>
              <div class="width-controls">
                <ion-button :disabled="width === 5" @click="() => width = Math.max(0, width - 1)">
                  <ion-icon slot="icon-only" :icon="chevronBack"></ion-icon>
                </ion-button>
                <ion-text>
                  <h3 class="width-size">
                    <span>{{ width }}</span>
                  </h3>
                </ion-text>
                <ion-button :disabled="width === 7" @click="() => width = Math.min(7, width + 1)">
                  <ion-icon slot="icon-only" :icon="chevronForward"></ion-icon>
                </ion-button>
              </div>
          </div>

          <Matrix :chosen="chosenPatterns"></Matrix>
          <Patterns
            :chosen="chosenPatterns"
            @update:chosen="updateChosen"
          ></Patterns>
        </div>
        <Sequences></Sequences>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/vue';
import { refresh, chevronForward, chevronBack } from 'ionicons/icons';
import { defineComponent, ref } from 'vue';
import Matrix from '@/components/matrix/Matrix.vue';
import Sequences from '@/components/sequences/Sequences.vue';
import { useMatrix } from '@/composables/useMatrix';
import Patterns from '@/components/pattern/Patterns.vue';

export default defineComponent({
  name: 'Home',
  components: {
    IonButton,
    IonIcon,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    Matrix,
    Sequences,
    Patterns,
  },
  setup() {
    const width = ref(5);
    const { resetAll } = useMatrix(width);
    const chosenPatterns = ref([0, 0, 0]);
    const updateChosen = (newChosen: number[]) => {
      chosenPatterns.value = newChosen;
    }
    return {
      width,
      resetAll,
      refresh,
      chosenPatterns,
      updateChosen,
      chevronForward,
      chevronBack
    }
  }
});
</script>

<style lang="scss" scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}

.matrix-controls,
.width-controls {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}

.width-controls {
  .width-size {
    margin: 8px 0;
    padding: 0 8px;
  }

  .button {
    --background: transparent;
    --padding-start: 4px;
    --padding-end: 4px;
  }
}
</style>