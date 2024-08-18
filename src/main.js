import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

createApp(App)
  .use(Buefy)
  .mount('#app');
