import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

const app = createApp(App)
  .use(IonicVue)
  .use(router);

app.directive('longpress', {
  mounted(el, binding) {
    let pressTimer: number | null = null;

    const handler = (e: any) => {
      binding.value(e);
    };

    const start = (e: any) => {
      if (e.type === 'click' && e.buton !== 0) {
        return;
      }

      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          handler(e);
        }, 1000)
      }
    };
    const cancel = () => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer);
        pressTimer = null;
      }
    };

    // Add Event listeners
    el.addEventListener("mousedown", start);
    el.addEventListener("touchstart", start);
    // Cancel timeouts if this events happen
    el.addEventListener("click", cancel);
    el.addEventListener("mouseout", cancel);
    el.addEventListener("touchend", cancel);
    el.addEventListener("touchcancel", cancel);
  }
})
  
router.isReady().then(() => {
  app.mount('#app');
});