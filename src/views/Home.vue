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
          <ion-button @click="resetAll">
            <ion-icon slot="start" :icon="refresh"></ion-icon>
            Reset
          </ion-button>
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
import { refresh } from 'ionicons/icons';
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
    const { resetAll } = useMatrix();
    const chosenPatterns = ref([0, 0, 0]);
    const updateChosen = (newChosen: number[]) => {
      chosenPatterns.value = newChosen;
    }
    return {
      resetAll,
      refresh,
      chosenPatterns,
      updateChosen
    }
  }
});
</script>

<style scoped>
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
</style>