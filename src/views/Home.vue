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
        <div class="matrix-wrapper">
          <div class="matrix-controls">
              <ion-button @click="onRandomize">
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

          <Matrix :chosen="bestPath"></Matrix>
        </div>
        <div class="sequence-wrapper">
          <div class="buffer">
            <h3>Buffer:</h3>
            <div class="buffer-controls">
              <ion-button :disabled="buffer === 4" @click="() => buffer = Math.max(4, buffer - 1)">
                <ion-icon slot="icon-only" :icon="chevronBack"></ion-icon>
              </ion-button>
              <ion-text>
                <h3 class="buffer-size">
                  <span>{{ buffer }}</span>
                </h3>
              </ion-text>
              <ion-button :disabled="width === 8" @click="() => buffer = Math.min(8, buffer + 1)">
                <ion-icon slot="icon-only" :icon="chevronForward"></ion-icon>
              </ion-button>
            </div>
          </div>
          <Sequences></Sequences>
          <ion-button :disabled="evaluatingPath" @click="onFindPath">
            Find Best Path
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonText } from '@ionic/vue';
import { refresh, chevronForward, chevronBack } from 'ionicons/icons';
import { defineComponent, ref } from 'vue';
import Matrix from '@/components/matrix/Matrix.vue';
import Sequences from '@/components/sequences/Sequences.vue';
import { useMatrix } from '@/composables/useMatrix';

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
    IonText,
    Matrix,
    Sequences,
  },
  setup() {
    const bestPath = ref<number[][]>([]);
    const { buffer, width, resetAll, findPath, evaluatingPath } = useMatrix();
    
    const onFindPath = () => {
      bestPath.value = findPath()
    }

    const onRandomize = () => {
      bestPath.value = [];
      resetAll();
    }

    return {
      buffer,
      width,
      onFindPath,
      onRandomize,
      evaluatingPath,
      bestPath,

      // icons
      refresh,
      chevronForward,
      chevronBack
    }
  }
});
</script>

<style lang="scss" scoped>
#container {
  text-align: center;
/*   
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%); */

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;

  @media(min-width: 600px) {
    flex-flow: row nowrap;
  }
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

.matrix-wrapper,
.sequence-wrapper {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

.matrix-controls {
  width: 300px;
}

.matrix-controls,
.width-controls {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}

.width-controls,
.buffer-controls {
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

.buffer,
.buffer-controls {
  display: flex;
  flex-flow: row nowrap;

  ion-button::part(native) {
    margin-top: 6px;
  }
}
.buffer {
  justify-content: center;
}

.buffer-size {
  max-height: 36px;
}
</style>