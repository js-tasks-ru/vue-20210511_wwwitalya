<template>
  <button type="button" @click="increment">{{ localCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  model: {
    prop: 'count',
    event: 'increment',
  },

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      localCount: undefined,
    };
  },

  watch: {
    count: {
      immediate: true,
      handler(newValue) {
        this.localCount = newValue;
      },
    },
  },

  methods: {
    increment() {
      this.localCount += 1;
      this.$emit('increment', this.localCount);
    },
  },
};
</script>
