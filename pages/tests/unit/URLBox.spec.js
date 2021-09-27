import { mount } from '@vue/test-utils'
import SearchBox from '@/components/SearchBox.vue'
import WaveUI from 'wave-ui'

test('check a good link', () => {
  const goodLink = 'https://google.com/'
  const wrapper = mount(SearchBox, {
    global: {
      components: {
        'w-input': WaveUI,
        'w-button': WaveUI,
        'w-form': WaveUI,
        'w-card': WaveUI
      }
    },
    data() {
      return {
        longLink: goodLink
      }
    }
  })

  expect(wrapper.find('w-input').value).toBe(goodLink)
})