import { createApp } from 'vue'
import App from './App.vue'
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'

const app = createApp(App)

new WaveUI(app, {
  // Some Wave UI options.
})

// https://stackoverflow.com/a/67576157/2527692
app.directive('select-input', {
  mounted(el) {
    const input = el.querySelector('input')

    input.focus()
    input.select()
  }
})

app.mount('#app')