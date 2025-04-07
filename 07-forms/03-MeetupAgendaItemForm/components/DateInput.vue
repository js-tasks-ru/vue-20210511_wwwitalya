<template>
  <app-input v-bind="$attrs" :value="inputValue" :type="type" v-on="listeners" @input.native="handleUpdate">
    <template v-for="slot of Object.keys($slots)" #[slot]>
      <slot :name="slot" />
    </template>
  </app-input>
</template>

<script>
import AppInput from './AppInput';

export default {
  name: 'DateInput',

  components: { AppInput },

  inheritAttrs: false,

  model: {
    prop: 'value',
    event: 'change',
  },

  props: {
    type: {
      type: String,
      default: 'date',
      validator: (type) => ['date', 'datetime-local', 'time'].includes(type),
    },

    value: [String, Date, Number],
  },

  computed: {
    listeners() {
      const listeners = { ...this.$listeners };
      delete listeners.input;
      delete listeners.change;
      return listeners;
    },

    inputValue() {
      // Если строка - передадим, как есть
      if (typeof this.value === 'string') {
        return this.value;
      }

      // Получим Date для значения
      let date;
      if (Number.isFinite(this.value)) {
        date = new Date(this.value);
      } else if (this.value instanceof Date) {
        date = this.value;
      } else {
        // Не строка, и не число, и не Date - это какая-то ошибка. Можно вернуть пустую строку
        return '';
      }

      // Соберём строку в нужном формате
      const yyyymmdd = date.toISOString().substring(0, 10);
      const hhmm = date.toISOString().substring(11, 16);
      const hhmmss = date.toISOString().substring(11, 19);
      const yyyymmddThhmm = date.toISOString().substring(0, 16);

      // И вернём строку в нужном формате, в зависимости от тиап и атрибутов
      if (this.type === 'date') {
        return yyyymmdd;
      } else if (this.type === 'time') {
        return this.$attrs['step'] && this.$attrs['step'] % 60 !== 0 ? hhmmss : hhmm;
      } else if (this.type === 'datetime-local') {
        return yyyymmddThhmm;
      }

      return '';
    },
  },

  methods: {
    handleUpdate($event) {
      let value = $event.target.value;

      if (value === '') {
        this.$emit('change', null);
        this.$emit('input', null);
        return;
      }

      if (Number.isFinite(this.value)) {
        value = $event.target.valueAsNumber;
      } else if (this.value instanceof Date) {
        value = new Date($event.target.valueAsNumber);
      }

      this.$emit('change', value);
      this.$emit('input', value);
    },
  },
};
</script>
