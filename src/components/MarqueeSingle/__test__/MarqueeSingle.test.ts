import { mount } from '@vue/test-utils'
import MarqueeSingle from '../MarqueeSingle.vue'

test('mount MarqueeSingle component', async () => {
  expect(MarqueeSingle).toBeTruthy()

  const wrapper = mount(MarqueeSingle)

  expect(wrapper.html()).toMatchSnapshot()
})
