<template>
  <DIV class="form-section form-section_inner">
    <button type="button" class="remove-button">
      <app-icon icon="trash" />
    </button>

    <form-group>
      <dropdown-button title="Тип" :options="$options.agendaItemTypeOptions" />
    </form-group>

    <div class="form__row">
      <div class="form__col">
        <form-group label="Начало">
          <app-input type="time" placeholder="00:00" />
        </form-group>
      </div>
      <div class="form__col">
        <form-group label="Окончание">
          <app-input type="time" placeholder="00:00" />
        </form-group>
      </div>
    </div>

    <form-group label="Заголовок">
      <app-input />
    </form-group>
    <form-group label="Описание">
      <app-input multiline />
    </form-group>
    <form-group>
      <dropdown-button title="Язык" :options="$options.languageOptions" />
    </form-group>
  </DIV>
</template>

<script>
import AppInput from './AppInput';
import DropdownButton from './DropdownButton';
import AppIcon from './AppIcon';
import FormGroup from './FormGroup';
import {
  getAgendaItemsFieldSpecifications,
  getAgendaItemTypeOptions,
  getAgendaItemLanguageOptions,
} from '../MeetupService';

export default {
  name: 'MeetupAgendaItemForm',

  components: { FormGroup, AppIcon, AppInput, DropdownButton },

  agendaItemTypeOptions: getAgendaItemTypeOptions(),
  fieldSpecifications: getAgendaItemsFieldSpecifications(),
  languageOptions: getAgendaItemLanguageOptions(),
};
</script>

<style></style>
