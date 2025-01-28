<template>
  <div id="app" class="page container">
    <button type="button" @click="$refs['firstInput'].$refs['input'].focus()">Focus first input</button>
    <span v-if="focused"> Focused</span>
    <p><app-input ref="firstInput" v-model="value" @focus="focused = true" @blur="focused = false" /></p>
    <p>Small <app-input v-model="value" small /></p>
    <p>Rounded <app-input v-model="value" rounded /></p>
    <p>Password <app-input v-model="value" type="password" /></p>
    <p>Textarea <app-input v-model="value" multiline /></p>
    <p>
      With Icons <button @click="showIcons = !showIcons">Toggle Icons</button>
      <app-input v-model="value">
        <template v-if="showIcons" #left-icon>
          <app-icon icon="search" />
        </template>
        <template v-if="showIcons" #right-icon>
          <app-icon icon="pen-tool" />
        </template>
      </app-input>
    </p>
    <p>
      Value + Input
      <app-input :value="value" @input="value = $event" />
    </p>
    <p>
      Value + Change
      <app-input :value="value" @change="value = $event" />
    </p>
  </div>
</template>

<script>
import AppInput from './components/AppInput';
import AppIcon from './components/AppIcon';

export default {
  name: 'App',

  components: { AppIcon, AppInput },

  data() {
    return {
      value: 'value',
      showIcons: true,
      focused: false,
    };
  },
};
</script>

<style>
p {
  margin: 1rem auto;
}
</style>
