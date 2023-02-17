import { mount } from '@vue/test-utils'
import { Lazyload } from "vant"
import HelloWorld from '@/components/HelloWorld.vue'

test('hello world mount', async () => {
  expect(HelloWorld).toBeTruthy()

  const wrapper = mount(HelloWorld, {
    props: {
      count: 4,
    },
    global: {
      directives: {
        lazy: Lazyload as any
      }
    },
  })

  expect(wrapper.text()).toContain('4 x 2 = 8')
  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.get('button').trigger('click')

  expect(wrapper.text()).toContain('4 x 3 = 12')

  await wrapper.get('button').trigger('click')

  expect(wrapper.text()).toContain('4 x 4 = 16')
})