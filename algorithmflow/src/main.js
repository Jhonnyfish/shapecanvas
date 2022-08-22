import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/style.css'
import '../build/package/rappid.css'
import * as joint from './../build/package/rappid.js'

createApp(App)
    .use(joint)
    .mount('#app')