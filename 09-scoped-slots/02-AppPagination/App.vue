<template>
  <div id="app" style="width: 250px; margin: 2rem auto">
    <div style="display: flex; justify-content: space-between">
      <button v-for="i in 5" :key="i" :class="{ active: page === i }" @click="page = i">
        {{ i }}
      </button>
    </div>

    <hr />

    <app-pagination v-slot="{ item }" :page="page" :per-page="5" :items="cards">
      <!-- item - параметр слота с данными одного элемента данных  -->
      <!-- Вы можете использовать другое имя параметра слота -->
      <fieldset :key="item.id">
        <legend>Card #{{ item.id }}</legend>
        {{ item.text }}
      </fieldset>
    </app-pagination>
  </div>
</template>

<script>
import AppPagination from './components/AppPagination';

export default {
  name: 'App',
  components: { AppPagination },

  data() {
    return {
      page: 1,
      cards: Array.from(Array(22), (_, i) => ({
        id: i + 1,
        text: 'Body',
      })),
    };
  },
};
</script>

<style scoped>
.active {
  transform: scale(1.25);
}
</style>
