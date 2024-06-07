// HomeContentPreviousRulings.spec.ts
import { beforeEach, describe, it, expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { mount } from '@vue/test-utils'
import HomeContentPreviousRulings from '@/components/Home/HomeContentPreviousRulings.vue'

describe('HomeContentPreviousRulings.vue', () => {
  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
  })

  it('renders correctly', () => {
    const wrapper = mount(HomeContentPreviousRulings, {
      global: {
        plugins: [createPinia()]
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('updates selected view correctly', async () => {
    const wrapper = mount(HomeContentPreviousRulings, {
      global: {
        plugins: [createPinia()] // Asegúrate de que el store esté disponible para el componente
      }
    })

    await wrapper.find('.selected').trigger('click')
    await wrapper.findAll('.items div')[0].trigger('click')

    expect(wrapper.find('.selected').text()).toBe('List')
  })
})