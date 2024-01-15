import { createApp } from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './assets/style.css'
import App from './App.vue'
import mitt from 'mitt'



const emitter = mitt()
const app = createApp(App)
app.config.globalProperties.emitter = emitter
app.use(Toast)
app.mount('#app')
