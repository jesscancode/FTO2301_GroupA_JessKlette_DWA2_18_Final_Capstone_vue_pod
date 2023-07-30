import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'

import App from './App.vue'
import router from './router'

import './assets/main.css'

import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import { useStore } from './stores/store.js'

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

const app = createApp(App)

const head = createHead()
app.use(head)

app.use(pinia)
app.use(router)

app.mount('#app')
