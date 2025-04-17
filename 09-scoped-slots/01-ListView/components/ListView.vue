<template>
  <div class="meetups-list">
    <slot v-for="(item, index) in items" :item="item" :index="index" />
  </div>
</template>

<script>
export default {
  name: 'ListView',

  props: {
    items: {
      type: Array,
      required: false,
    },
  },
};
</script>

<style scoped>
.meetups-list {
}
</style>
