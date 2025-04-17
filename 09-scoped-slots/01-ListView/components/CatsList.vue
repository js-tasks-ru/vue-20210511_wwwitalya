<template>
  <list-view v-slot="{ item }" :items="cats">
    <list-view-card :key="item.id" tag="article" :title="item.title" :cover="item.cover">
      <ul class="info-list">
        <li>{{ item.description }}</li>
        <li>Cute cat</li>
        <li>Cats are always cute</li>
      </ul>
    </list-view-card>
  </list-view>
</template>

<script>
import ListView from './ListView';
import ListViewCard from './ListViewCard';

export default {
  name: 'CatsList',

  components: { ListViewCard, ListView },

  data() {
    return {
      cats: Array.from(Array(7), (_, id) => ({
        id: id,
        title: `Cat ${id}`,
        cover: `https://cataas.com/cat?height=218&id=${id}`,
        description: `Cat Number ${id}`,
      })),
    };
  },
};
</script>

<style scoped>
.info-list {
  margin: 0;
  padding: 0;
}

.info-list li {
  list-style-type: none;
  position: relative;
  padding-left: 0;
  font-size: 18px;
  line-height: 28px;
  margin: 0 0 8px;
}

.info-list li:last-child {
  margin: 0;
}
</style>
