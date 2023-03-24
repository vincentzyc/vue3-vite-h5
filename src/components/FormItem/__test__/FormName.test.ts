import { mount, shallowMount } from '@vue/test-utils';
import FormName from '../FormName.vue';

test('mount FormName component', async () => {
  expect(FormName).toBeTruthy();

  const wrapper = mount(FormName, {
    props: {
      modelValue: '',
      'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e }),
    },
  });

  expect(wrapper.html()).toMatchSnapshot();

  await wrapper.get('input').setValue('测试姓名');

  expect(wrapper.props('modelValue')).toBe('测试姓名');

  const emitEvent = wrapper.emitted('update:modelValue');

  expect(emitEvent).toHaveLength(1);
});

// 下面是chatGPT给的单测代码
describe('chatGPT FormName.vue', () => {
  it('renders input element with placeholder', () => {
    const wrapper = shallowMount(FormName, {
      props: {
        modelValue: '',
      },
    });
    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);
    expect(input.attributes().placeholder).toBe('输入办理人姓名（已加密）');
  });

  it('emits update:modelValue event when input is typed', async () => {
    const wrapper = shallowMount(FormName, {
      props: {
        modelValue: '',
      },
    });
    const input = wrapper.find('input');
    await input.setValue('张三');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['张三']);
  });

  it.each`
    input           | expected
    ${''}           | ${'请输入领卡姓名'}
    ${'4'}          | ${'姓名长度不能小于2或超过20'}
    ${'张3'}        | ${'姓名必须为汉字'}
    ${'王五111111'} | ${'姓名必须为汉字'}
    ${'李四二'}     | ${true}
  `('checkName returns $expected when input is $input', ({ input, expected }) => {
    const wrapper = shallowMount(FormName, {
      props: {
        modelValue: '',
      },
    });
    const checkResult = wrapper.vm.checkName(input);
    expect(checkResult).toBe(expected);
  });

  it('checkName is called when input blurs', async () => {
    const wrapper = shallowMount(FormName, {
      props: {
        modelValue: '',
      },
    });
    const input = wrapper.find('input');
    const checkNameSpy = vi.spyOn(wrapper.vm, 'checkName');
    await input.trigger('blur');
    expect(checkNameSpy).toHaveBeenCalled();
  });
});
