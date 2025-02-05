const { mount, shallowMount } = require('@vue/test-utils');
const { getSolutionPath } = require('taskbook-test-utils');
const DateInput = require(getSolutionPath('components/DateInput.vue')).default;

describe('wrappers/DateInput', () => {
  describe('DateInput', () => {
    let dateStrings = {};
    let dates = {};

    beforeEach(() => {
      dateStrings = {
        'YYYY-MM-DD': '2020-02-01',
        'HH:MM': '23:32',
        'HH:MM:SS': '23:32:50',
        'YYYY-MM-DDTHH:MM': '2020-02-01T23:32',
        'YYYY-MM-DDTHH:MM:SS': '2020-02-01T23:32:50',
        'YYYY-MM-DDTHH:MM:SSZ': '2020-02-01T23:32:50Z',
      };
      dates = {
        'YYYY-MM-DD': new Date(`${dateStrings['YYYY-MM-DD']}T00:00:00Z`),
        'HH:MM': new Date(`1970-01-01T${dateStrings['HH:MM']}:00Z`),
        'HH:MM:SS': new Date(`1970-01-01T${dateStrings['HH:MM:SS']}Z`),
        'YYYY-MM-DDTHH:MM': new Date(`${dateStrings['YYYY-MM-DDTHH:MM']}:00Z`),
        'YYYY-MM-DDTHH:MM:SS': new Date(dateStrings['YYYY-MM-DDTHH:MM:SSZ']),
        'YYYY-MM-DDTHH:MM:SSZ': new Date(dateStrings['YYYY-MM-DDTHH:MM:SSZ']),
      };
    });

    it('DateInput должен иметь параметры type, value', () => {
      const wrapper = shallowMount(DateInput);
      expect(wrapper.vm.$options.props.type).toBeDefined();
      expect(wrapper.vm.$options.props.value).toBeDefined();
    });

    it.each(['date', 'time', 'datetime-local'])('DateInput должен рендерить AppInput[type=%s]', (type) => {
      const wrapper = mount(DateInput, { propsData: { type } });
      const input = wrapper.find('input');
      expect(input.attributes('type')).toBe(type);
    });

    it('DateInput[type=date] должен выводить поле ввода со значением в соответствии с value типа Date в формате yyyy-mm-dd', async () => {
      const wrapper = mount(DateInput, { propsData: { type: 'date' } });
      await wrapper.setProps({ value: dates['YYYY-MM-DD'] });
      expect(wrapper.find('input').element.value).toBe(dateStrings['YYYY-MM-DD']);
    });

    it('DateInput[type=time] должен выводить поле ввода со значением в соответствии с value типа Date в формате hh:mm', async () => {
      const wrapper = mount(DateInput, { propsData: { type: 'time' } });
      await wrapper.setProps({ value: dates['HH:MM'] });
      expect(wrapper.find('input').element.value).toBe(dateStrings['HH:MM']);
    });

    it('DateInput[type=datetime-local] должен выводить поле ввода со значением в соответствии с value типа Date в формате yyyy-mm-ddThh:mm', async () => {
      const wrapper = mount(DateInput, {
        propsData: { type: 'datetime-local' },
      });
      await wrapper.setProps({ value: dates['YYYY-MM-DDTHH:MM'] });
      expect(wrapper.find('input').element.value).toBe(dateStrings['YYYY-MM-DDTHH:MM']);
    });

    it('DateInput[type=date] должен выводить поле ввода со значением в соответствии с числовым value в формате yyyy-mm-dd', async () => {
      const wrapper = mount(DateInput, { propsData: { type: 'date' } });
      await wrapper.setProps({ value: +dates['YYYY-MM-DD'] });
      expect(wrapper.find('input').element.value).toBe(dateStrings['YYYY-MM-DD']);
    });

    it('DateInput[type=time] должен выводить поле ввода со значением в соответствии с числовым value в формате hh:mm', async () => {
      const wrapper = mount(DateInput, { propsData: { type: 'time' } });
      await wrapper.setProps({ value: +dates['HH:MM'] });
      expect(wrapper.find('input').element.value).toBe(dateStrings['HH:MM']);
    });

    it('DateInput[type=time] должен выводить поле ввода со значением в соответствии с числовым value в формате hh:mm, если атрибут step кратен 60', async () => {
      const wrapper = mount(DateInput, { propsData: { type: 'time' }, attrs: { step: 120 } });
      await wrapper.setProps({ value: +dates['HH:MM'] });
      expect(wrapper.find('input').element.value).toBe(dateStrings['HH:MM']);
    });

    it('DateInput[type=time] должен выводить поле ввода со значением в соответствии с value типа Date в формате hh:mm:ss, если атрибут step не кратен 60', async () => {
      const wrapper = mount(DateInput, {
        propsData: { type: 'time' },
        attrs: { step: 1 },
      });
      await wrapper.setProps({ value: dates['HH:MM:SS'] });
      expect(wrapper.find('input').element.value).toBe(dateStrings['HH:MM:SS']);
    });

    it('DateInput[type=datetime-local] должен выводить поле ввода со значением в соответствии с числовым value в формате yyyy-mm-ddThh:mm', async () => {
      const wrapper = mount(DateInput, {
        propsData: { type: 'datetime-local' },
      });
      await wrapper.setProps({ value: +dates['YYYY-MM-DDTHH:MM'] });
      expect(wrapper.find('input').element.value).toBe(dateStrings['YYYY-MM-DDTHH:MM']);
    });

    it('DateInput[type=date] должен выводить поле ввода со значением в соответствии со строковым значением value', async () => {
      const wrapper = mount(DateInput, { propsData: { type: 'date' } });
      await wrapper.setProps({ value: dateStrings['YYYY-MM-DD'] });
      expect(wrapper.find('input').element.value).toBe(dateStrings['YYYY-MM-DD']);
    });

    it('DateInput[type=date] должен порождать change с новым значением числового value при выборе даты', async () => {
      const wrapper = mount(DateInput, { propsData: { type: 'date' } });
      await wrapper.setProps({ value: 0 });
      wrapper.find('input').element.value = dateStrings['YYYY-MM-DD'];
      wrapper.find('input').element.valueAsDate = dates['YYYY-MM-DD'];
      wrapper.find('input').element.valueAsNumber = +dates['YYYY-MM-DD'];
      await wrapper.find('input').trigger('input');
      await wrapper.find('input').trigger('change');
      expect(wrapper.emitted().change).toBeDefined();
      expect(wrapper.emitted().change[0]).toEqual([+dates['YYYY-MM-DD']]);
    });

    it('DateInput[type=date] должен порождать change с новым значением value типа Date при выборе даты', async () => {
      const wrapper = mount(DateInput, { propsData: { type: 'date' } });
      await wrapper.setProps({ value: new Date(0) });
      wrapper.find('input').element.value = dateStrings['YYYY-MM-DD'];
      wrapper.find('input').element.valueAsDate = dates['YYYY-MM-DD'];
      wrapper.find('input').element.valueAsNumber = +dates['YYYY-MM-DD'];
      await wrapper.find('input').trigger('input');
      await wrapper.find('input').trigger('change');
      expect(wrapper.emitted().change).toBeDefined();
      expect(wrapper.emitted().change[0]).toEqual([dates['YYYY-MM-DD']]);
    });

    it('DateInput[type=date] должен порождать change с новым значением строкового value при выборе даты', async () => {
      const wrapper = mount(DateInput, { propsData: { type: 'date' } });
      await wrapper.setProps({ value: '1970-01-01' });
      wrapper.find('input').element.value = dateStrings['YYYY-MM-DD'];
      wrapper.find('input').element.valueAsDate = dates['YYYY-MM-DD'];
      wrapper.find('input').element.valueAsNumber = +dates['YYYY-MM-DD'];
      await wrapper.find('input').trigger('input');
      await wrapper.find('input').trigger('change');
      expect(wrapper.emitted().change).toBeDefined();
      expect(wrapper.emitted().change[0]).toEqual([dateStrings['YYYY-MM-DD']]);
    });

    it('DateInput[type=datetime-local] должен порождать change с новым значением числового value при выборе даты', async () => {
      const wrapper = mount(DateInput, {
        propsData: { type: 'datetime-local' },
      });
      await wrapper.setProps({ value: 0 });
      wrapper.find('input').element.value = dateStrings['YYYY-MM-DDTHH:MM'];
      wrapper.find('input').element.valueAsNumber = +dates['YYYY-MM-DDTHH:MM'];
      await wrapper.find('input').trigger('input');
      await wrapper.find('input').trigger('change');
      expect(wrapper.emitted().change).toBeDefined();
      expect(wrapper.emitted().change[0]).toEqual([+dates['YYYY-MM-DDTHH:MM']]);
    });

    it('DateInput[type=datetime-local] должен порождать change с новым значением value типа Date при выборе даты', async () => {
      const wrapper = mount(DateInput, {
        propsData: { type: 'datetime-local' },
      });
      await wrapper.setProps({ value: new Date(0) });
      wrapper.find('input').element.value = dateStrings['YYYY-MM-DDTHH:MM'];
      wrapper.find('input').element.valueAsNumber = +dates['YYYY-MM-DDTHH:MM'];
      await wrapper.find('input').trigger('input');
      await wrapper.find('input').trigger('change');
      expect(wrapper.emitted().change).toBeDefined();
      expect(wrapper.emitted().change[0]).toEqual([dates['YYYY-MM-DDTHH:MM']]);
    });

    it('DateInput[type=date] должен порождать change со значением null или пустой строкой при выборе некорректной даты (не выборе даты)', async () => {
      const wrapper = mount(DateInput, { propsData: { type: 'date' } });
      await wrapper.setProps({ value: new Date(42) });
      wrapper.find('input').element.value = '';
      wrapper.find('input').element.valueAsDate = null;
      wrapper.find('input').element.valueAsNumber = NaN;
      await wrapper.find('input').trigger('input');
      await wrapper.find('input').trigger('change');
      expect(wrapper.emitted().change).toBeDefined();
      expect(wrapper.emitted().change[0][0]).toBeFalsy();
    });

    it('DateInput должен выводить левую иконку в AppInput через слот left-icon', async () => {
      const wrapper = mount(DateInput, {
        slots: { 'left-icon': '<img class="icon icon-search" />' },
      });
      expect(wrapper.find('img.icon-search + input').exists()).toBe(true);
    });
  });
});
