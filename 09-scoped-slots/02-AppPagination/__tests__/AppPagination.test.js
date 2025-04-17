import { mount } from '@vue/test-utils';
const { getSolutionPath } = require('taskbook-test-utils');
const AppPagination = require(getSolutionPath('components/AppPagination.vue')).default;

describe('scoped-slots/AppPagination', () => {
  describe('AppPagination', () => {
    let wrapper;
    const tag = 'section';

    function testPageContentWithLetterPerPage(expectedStr) {
      const itemWrappers = wrapper.findAll(tag).wrappers;
      expect(itemWrappers).toHaveLength(expectedStr.length);
      expect(itemWrappers.every((item, i) => item.text().includes(`"${expectedStr[i]}"`))).toBe(true);
    }

    beforeEach(() => {
      wrapper = mount(AppPagination, {
        propsData: {
          page: 1,
          perPage: 3,
          items: ['A', 'B', 'C', 'D', 'E'],
        },
        scopedSlots: {
          default(props) {
            return this.$createElement(tag, { key: JSON.stringify(props) }, JSON.stringify(props));
          },
        },
      });
    });

    it('AppPagination должен иметь параметры page, perPage, items', async () => {
      expect(wrapper.vm.$options.props.page).toBeTruthy();
      expect(wrapper.vm.$options.props.perPage).toBeTruthy();
      expect(wrapper.vm.$options.props.items).toBeTruthy();
    });

    it('AppPagination должен выводить элементы текущей страницы', async () => {
      testPageContentWithLetterPerPage('ABC');
    });

    it('AppPagination должен выводить новые элементы после смены страницы', async () => {
      await wrapper.setProps({
        page: 2,
      });
      testPageContentWithLetterPerPage('DE');
    });

    it('AppPagination должен выводить элементы после смены количества элементов на странице и номер страницы', async () => {
      await wrapper.setProps({
        page: 2,
        perPage: 2,
      });
      testPageContentWithLetterPerPage('CD');
    });

    it('AppPagination должен выводить элементы после обновления исходного массива данных', async () => {
      await wrapper.setProps({
        items: ['a', 'b', 'c', 'd', 'e', 'f'],
      });
      testPageContentWithLetterPerPage('abc');
    });
  });
});
