import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'lib-flexible/flexible'

// import Vconsole from "vconsole";
// new Vconsole();

const app = createApp(App)
app.use(router)
app.mount('#app')
