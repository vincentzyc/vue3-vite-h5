import { mount } from '@vue/test-utils'
import FormCity from '../FormCity.vue'

test('mount FormCity component', async () => {
  expect(FormCity).toBeTruthy()

  const wrapper = mount(FormCity, {
    props: {
      modelValue: [],
      locationCity: [],
      'onUpdate:modelValue': (e: string[]) => wrapper.setProps({ modelValue: e })
    }
  })

  expect(wrapper.html()).toMatchSnapshot()
})