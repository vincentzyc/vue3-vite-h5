import { mount } from '@vue/test-utils';
import FormPhone from '../FormPhone.vue';

test('mount FormPhone component', async () => {
  expect(FormPhone).toBeTruthy();

  const wrapper = mount(FormPhone, {
    props: {
      modelValue: '',
      'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e }),
    },
  });

  expect(wrapper.html()).toMatchSnapshot();

  await wrapper.get('input').setValue('18812345678');

  expect(wrapper.props('modelValue')).toBe('18812345678');

  const emitEvent = wrapper.emitted('update:modelValue');

  expect(emitEvent).toHaveLength(1);
});

// 下面是chatGPT给的单测代码
describe('FormPhone.vue', () => {
  it('renders input element', () => {
    const wrapper = mount(FormPhone, { props: { modelValue: '' } });
    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('emits update:modelValue event when input value changes', async () => {
    const wrapper = mount(FormPhone, { props: { modelValue: '' } });
    const input = wrapper.find('input');
    await input.setValue('12345678901');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['12345678901']);
  });

  it('sets input value when modelValue prop changes', async () => {
    const wrapper = mount(FormPhone, { props: { modelValue: '12345678901' } });
    const input = wrapper.find('input');
    expect(input.element.value).toBe('12345678901');
    await wrapper.setProps({ modelValue: '9876543210' });
    expect(input.element.value).toBe('9876543210');
  });

  it('limits input value to 11 characters', async () => {
    const wrapper = mount(FormPhone, { props: { modelValue: '' } });
    const input = wrapper.find('input');
    await input.setValue('12345678901');
    expect(input.element.value).toHaveLength(11);
  });
});
