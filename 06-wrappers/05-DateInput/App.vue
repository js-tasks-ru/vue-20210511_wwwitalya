<template>
  <div id="app" class="page container">
    <h3>Number Value - {{ valueAsNumber }}</h3>
    <p>[type=date] <date-input v-model="valueAsNumber" /></p>
    <p>[type=time] <date-input v-model="valueAsNumber" type="time" /></p>
    <p>[type=time][step=30] <date-input v-model="valueAsNumber" type="time" step="30" /></p>
    <p>[type=datetime-local] <date-input v-model="valueAsNumber" type="datetime-local" /></p>

    <h3>Date Value - UTC Date: {{ valueAsDate.toUTCString() }}</h3>
    <p>[type=date] <date-input v-model="valueAsDate" /></p>
    <p>[type=time] <date-input v-model="valueAsDate" type="time" /></p>
    <p>[type=time][step=30] <date-input v-model="valueAsDate" type="time" step="30" /></p>
    <p>[type=datetime-local] <date-input v-model="valueAsDate" type="datetime-local" /></p>

    <h3>String Value - {{ value }}</h3>
    <p><date-input v-model="value" /></p>

    <h3>With Icons</h3>
    <p>
      <button @click="showIcons = !showIcons">Toggle Icons</button>
      <date-input v-model="value">
        <template #left-icon>
          <app-icon v-if="showIcons" icon="search" />
        </template>
        <template #right-icon>
          <app-icon v-if="showIcons" icon="pen-tool" />
        </template>
      </date-input>
    </p>
  </div>
</template>

<script>
import AppIcon from './components/AppIcon';
import DateInput from './components/DateInput';

export default {
  name: 'App',

  components: { AppIcon, DateInput },

  data() {
    return {
      valueAsNumber: +new Date(Date.UTC(2013, 11, 11, 14, 15, 16)),
      value: '2013-12-11',
      showIcons: true,
    };
  },

  computed: {
    valueAsDate: {
      get() {
        return new Date(this.valueAsNumber);
      },

      set(newDate) {
        this.valueAsNumber = +newDate;
      },
    },
  },
};
</script>

<style>
p {
  margin: 1rem auto;
}
</style>
