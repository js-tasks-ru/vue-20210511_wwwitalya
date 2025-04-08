<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="$emit('remove')">
      <app-icon icon="trash" />
    </button>

    <form-group>
      <dropdown-button v-model="localAgendaItem.type" title="Тип" :options="$options.agendaItemTypeOptions" />
    </form-group>

    <div class="form__row">
      <div class="form__col">
        <form-group label="Начало">
          <app-input v-model="localAgendaItem.startsAt" type="time" placeholder="00:00" />
        </form-group>
      </div>
      <div class="form__col">
        <form-group label="Окончание">
          <app-input v-model="localAgendaItem.endsAt" type="time" placeholder="00:00" />
        </form-group>
      </div>
    </div>

    <form-group
      v-for="specification in $options.fieldSpecifications[localAgendaItem.type]"
      :key="specification.field"
      :label="specification.title"
    >
      <component
        :is="specification.component"
        :[specification.model.prop]="localAgendaItem[specification.field]"
        v-bind="specification.props"
        @[specification.model.event]="localAgendaItem[specification.field] = $event"
      />
    </form-group>
  </div>
</template>

<script>
import FormGroup from './FormGroup';
import AppInput from './AppInput';
import DropdownButton from './DropdownButton';
import AppIcon from './AppIcon';
import { getAgendaItemsFieldSpecifications, getAgendaItemTypeOptions } from '../MeetupService';

export default {
  name: 'MeetupAgendaItemForm',

  components: { AppIcon, FormGroup, AppInput, DropdownButton },

  agendaItemTypeOptions: getAgendaItemTypeOptions(),
  fieldSpecifications: getAgendaItemsFieldSpecifications(),

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      localAgendaItem: { ...this.agendaItem },
    };
  },

  computed: {
    startsAt() {
      return this.localAgendaItem.startsAt;
    },
  },

  watch: {
    localAgendaItem: {
      deep: true,
      handler() {
        this.$emit('update:agendaItem', { ...this.localAgendaItem });
      },
    },

    startsAt(newValue, oldValue) {
      // Если время не введено или введено не до конца, браузер вернёт пустую строку (при поддержке time)
      // Но Safari не поддерживает input[type=time] :(
      // Придётся проверять
      if (!/([0-1]\d|2[0-3]):[0-5]\d/.test(newValue)) {
        return;
      }
      // Разделяем время на часы и минуты и переводим в минуты
      const timeToMinutes = (time) => {
        const [h, m] = time.split(':').map((x) => parseInt(x, 10));
        return h * 60 + m;
      };
      const newMinutes = timeToMinutes(newValue);
      const oldMinutes = timeToMinutes(oldValue);
      const oldEndsAtMinutes = timeToMinutes(this.localAgendaItem.endsAt);
      // Считаем изменение времени в минутах
      const deltaMinutes = newMinutes - oldMinutes;
      // Считаем новое значение
      const newEndsAtMinutes = (oldEndsAtMinutes + deltaMinutes + 24 * 60) % (24 * 60);
      // Пересчитываем обратно в часы и минуты
      const hours = Math.floor(newEndsAtMinutes / 60)
        .toString()
        .padStart(2, '0');
      const minutes = Math.floor(newEndsAtMinutes % 60)
        .toString()
        .padStart(2, '0');
      this.localAgendaItem.endsAt = `${hours}:${minutes}`;
    },
  },
};
</script>
