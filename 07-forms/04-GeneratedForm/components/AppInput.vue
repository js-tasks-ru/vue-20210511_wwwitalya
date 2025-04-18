<template>
  <div class="input-group" :class="{ 'input-group_icon': hasIcon, 'input-group_icon-left': hasIcon }">
    <slot name="left-icon"></slot>
    <textarea v-if="multiline" class="form-control" :value="value" v-bind="$attrs" v-on="listeners"></textarea>
    <input v-else class="form-control" :value="value" v-bind="$attrs" v-on="listeners" />
  </div>
</template>

<script>
export default {
  name: 'AppInput',

  inheritAttrs: false,

  model: {
    prop: 'value',
    event: 'input',
  },

  props: {
    value: {},
    multiline: Boolean,
  },

  data() {
    return {
      hasIcon: false,
    };
  },

  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: ($event) => this.$emit('input', $event.target.value),
        change: ($event) => this.$emit('change', $event.target.value),
      };
    },
  },

  mounted() {
    this.updateHasIcon();
  },

  updated() {
    this.updateHasIcon();
  },

  methods: {
    updateHasIcon() {
      this.hasIcon = !!this.$slots['left-icon'];
    },
  },
};
</script>

<style scoped>
.form-control {
  padding: 12px 16px;
  height: 52px;
  border-radius: 8px;
  border: 2px solid var(--blue-light);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  transition: 0.2s all;
  background-color: var(--white);
  outline: none;
  box-shadow: none;
}

.form-control::placeholder {
  font-weight: 400;
  color: var(--blue-2);
}

.form-control:focus {
  border-color: var(--blue);
}

textarea.form-control {
  width: 100%;
  min-height: 211px;
}

.form-control.form-control_rounded {
  border-radius: 26px;
}

.form-control.form-control_sm.form-control_rounded {
  border-radius: 22px;
}

.form-control.form-control_sm {
  padding: 8px 16px;
  height: 44px;
  border-radius: 4px;
}

.input-group {
  position: relative;
}

.input-group .form-control {
  width: 100%;
}

.input-group.input-group_icon .form-control {
  padding-left: 50px;
}

.input-group.input-group_icon .icon {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}

.input-group.input-group_icon.input-group_icon-left .icon:first-child {
  left: 16px;
}

.input-group.input-group_icon.input-group_icon-right .icon:last-child {
  right: 16px;
}
</style>
