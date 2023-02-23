import { mount } from '@vue/test-utils'
import CountDown from '../CountDown.vue'

test('mount CountDown component', async () => {
  expect(CountDown).toBeTruthy()

  const wrapper = mount(CountDown)

  expect(wrapper.find('.countdown-timeblock').exists()).toBeTruthy()
  expect(wrapper.find('.countdown-colon').exists()).toBeTruthy()
})
