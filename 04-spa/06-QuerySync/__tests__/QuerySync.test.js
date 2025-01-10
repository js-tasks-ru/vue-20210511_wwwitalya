import VueRouter from 'vue-router';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import MeetupsView from '../components/MeetupsView';
const { getSolutionPath } = require('taskbook-test-utils');
const QuerySync = require(getSolutionPath('views/QuerySync')).default;

describe('spa/QuerySync', () => {
  describe('Работа с query параметрами', () => {
    const queryWithNotDefaultValues = {
      search: 'search',
      view: 'calendar',
      participation: 'attending',
      date: 'future',
    };

    async function mountPage(route = '/') {
      const localVue = createLocalVue();
      localVue.use(VueRouter);
      const router = new VueRouter({
        mode: 'abstract',
        routes: [
          {
            path: '/',
            component: QuerySync,
          },
        ],
      });
      await router.replace(route).catch(() => {});
      const wrapper = shallowMount(QuerySync, { router, localVue });
      const meetupsView = wrapper.findComponent(MeetupsView);
      return { wrapper, meetupsView, router };
    }

    it('Значение параметров на MeetupsView должно соответствовать первоначальным значениям query параметров в маршруте', async () => {
      const { meetupsView } = await mountPage({ path: '/', query: queryWithNotDefaultValues });
      expect(meetupsView.props()).toMatchObject(queryWithNotDefaultValues);
    });

    it('При обновлении значения параметров из MeetupsView должны обновляться query параметры маршрута', async () => {
      const { wrapper, router, meetupsView } = await mountPage({ path: '/' });
      await router.replace({ query: queryWithNotDefaultValues });
      const queryWithNotDefaultValues2 = {
        view: 'calendar',
        participation: 'organizing',
        date: 'past',
        search: 'abacaba',
      };
      Object.entries(queryWithNotDefaultValues2).forEach(([prop, value]) => {
        meetupsView.vm.$emit(`update:${prop}`, value);
      });
      await wrapper.vm.$nextTick();
      expect(router.currentRoute.query).toMatchObject(queryWithNotDefaultValues2);
    });

    it('При изменении query параметров маршрута, должны обновляться соответствующие параметры на MeetupView', async () => {
      const { router, meetupsView } = await mountPage({ path: '/' });
      await router.replace({ query: queryWithNotDefaultValues });
      expect(meetupsView.props()).toMatchObject(queryWithNotDefaultValues);
    });

    it('При обновлении значения параметров из MeetupsView на значения по умолчанию, должны обновляться query параметры маршрута, не включая значения по умолчанию', async () => {
      const { wrapper, router, meetupsView } = await mountPage({ path: '/' });
      await router.replace({ query: queryWithNotDefaultValues });
      const queryWithDefaultValues = {
        view: 'list',
        participation: 'all',
        date: 'all',
        search: '',
      };
      Object.entries(queryWithDefaultValues).forEach(([prop, value]) => {
        meetupsView.vm.$emit(`update:${prop}`, value);
      });
      await wrapper.vm.$nextTick();
      expect(router.currentRoute.query).toEqual({});
    });
  });
});
