import { createApp } from 'vue'
import { setupStore } from './store' // 状态管理

import App from './App.vue'
import SvgIcon from './components/SvgIcon/index.vue'

const app = createApp(App)

app.component('svg-icon', SvgIcon)

setupStore(app) // 引入状态管理

app.mount('#app')

// createApp(App).component('svg-icon', SvgIcon).mount('#app')
