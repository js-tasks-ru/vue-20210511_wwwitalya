<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="$emit('remove')">
      <app-icon icon="trash" />
    </button>

    <form-group>
      <select v-model="localAgendaItem.type" class="form-control" title="Тип">
        <option v-for="option in $options.agendaItemTypes" :key="option.value" :value="option.value">
          {{ option.text }}
        </option>
      </select>
    </form-group>

    <div class="form__row">
      <div class="form__col">
        <form-group inline label="Начало">
          <date-input v-model="localAgendaItem.startsAt" type="time" placeholder="00:00" />
        </form-group>
      </div>
      <div class="form__col">
        <form-group inline label="Окончание">
          <date-input v-model="localAgendaItem.endsAt" type="time" placeholder="00:00" />
        </form-group>
      </div>
    </div>

    <template v-if="localAgendaItem.type === 'talk'">
      <form-group label="Тема">
        <app-input v-model="localAgendaItem.title" />
      </form-group>
      <form-group label="Докладчик">
        <app-input v-model="localAgendaItem.speaker" />
      </form-group>
      <form-group label="Описание">
        <app-input v-model="localAgendaItem.description" multiline />
      </form-group>
      <form-group label="Язык">
        <select v-model="localAgendaItem.language" class="form-control">
          <option v-for="option in $options.talkLanguages" :key="option.value" :value="option.value">
            {{ option.text }}
          </option>
        </select>
      </form-group>
    </template>

    <template v-else-if="localAgendaItem.type === 'other'">
      <form-group label="Заголовок">
        <app-input v-model="localAgendaItem.title" />
      </form-group>
      <form-group label="Описание">
        <app-input v-model="localAgendaItem.description" multiline />
      </form-group>
    </template>

    <template v-else>
      <form-group label="Нестандартный текст (необязательно)">
        <app-input v-model="localAgendaItem.title" />
      </form-group>
    </template>
  </div>
</template>

<script>
import FormGroup from './FormGroup';
import AppInput from './AppInput';
import DateInput from './DateInput';
import AppIcon from './AppIcon';

const getAgendaItemTypes = () => [
  { value: 'registration', text: 'Регистрация' },
  { value: 'opening', text: 'Открытие' },
  { value: 'break', text: 'Перерыв' },
  { value: 'coffee', text: 'Coffee Break' },
  { value: 'closing', text: 'Закрытие' },
  { value: 'afterparty', text: 'Afterparty' },
  { value: 'talk', text: 'Доклад' },
  { value: 'other', text: 'Другое' },
];

const getTalkLanguages = () => [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export default {
  name: 'MeetupAgendaItemForm',
  components: { AppIcon, DateInput, AppInput, FormGroup },
  agendaItemTypes: getAgendaItemTypes(),
  talkLanguages: getTalkLanguages(),

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
