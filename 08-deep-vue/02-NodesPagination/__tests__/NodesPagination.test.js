const { getSolutionPath } = require('taskbook-test-utils');
const NodesPagination = require(getSolutionPath('components/NodesPagination.vue')).default;
import { shallowMount } from '@vue/test-utils';

describe('deep-vue/NodesPagination', () => {
  describe('NodesPagination', () => {
    it('NodesPagination должен иметь числовые параметры page и perPage', async () => {
      const wrapper = shallowMount(NodesPagination);
      expect(wrapper.vm.$options.props.page.type).toBe(Number);
      expect(wrapper.vm.$options.props.perPage.type).toBe(Number);
    });

    it('NodesPagination должен выводить элементы текущей страницы', async () => {
      const wrapper = shallowMount(NodesPagination, {
        propsData: {
          page: 1,
          perPage: 3,
        },
        slots: {
          default: `<span>A</span><span>B</span><span>C</span><span>D</span><span>E</span>`,
        },
      });
      expect(wrapper.text()).toBe('ABC');
    });

    it('NodesPagination должен выводить элементы страницы после смены страницы', async () => {
      const wrapper = shallowMount(NodesPagination, {
        propsData: {
          page: 1,
          perPage: 3,
        },
        slots: {
          default: `<span>A</span><span>B</span><span>C</span><span>D</span><span>E</span>`,
        },
      });

      await wrapper.setProps({
        page: 2,
      });
      expect(wrapper.text()).toBe('DE');
    });

    it('NodesPagination должен выводить единственный элемент на первой странице', async () => {
      const wrapper = shallowMount(NodesPagination, {
        propsData: {
          page: 1,
          perPage: 100,
        },
        slots: {
          default: `<span>A</span>`,
        },
      });
      expect(wrapper.text()).toBe('A');
    });

    it('NodesPagination не должен ничего выводить, если ничего не передано', async () => {
      const wrapper = shallowMount(NodesPagination, {
        propsData: {
          page: 1,
          perPage: 100,
        },
      });
      expect(wrapper).toBeDefined();
    });
  });
});
