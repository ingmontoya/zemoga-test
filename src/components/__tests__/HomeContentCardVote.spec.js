import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import HomeContentCardVote from '@/components/Home/HomeContentCardVote.vue'

describe('HomeContentCardVote.vue', () => {
    it('renders correctly', () => {
      const pinia = createPinia()
      const wrapper = mount(HomeContentCardVote, {
        global: {
          plugins: [pinia]
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })
  })