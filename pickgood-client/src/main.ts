import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import { createHead } from '@vueuse/head'

import 'vue-toast-notification/dist/theme-default.css'

// Pinia instance
import pinia from './store/pinia'

// Head options (HTML head)
const head = createHead()

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faGear } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faGear)

createApp(App)
  .use(pinia)
  .use(router)
  .use(head)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
