<script>
export default {
  name: 'NodesPagination',

  props: {
    page: Number,
    perPage: Number,
  },

  render() {
    const start = (this.page - 1) * this.perPage;
    const end = this.page * this.perPage;

    const content = this.$slots.default ?? [];

    return <div>{content.slice(start, end)}</div>;
  },

  /* Или без JSX
  render(h) {
    const start = (this.page - 1) * this.perPage;
    const end = this.page * this.perPage;

    const content = this.$slots.default ?? [];

    return h('div', content.slice(start, end));
  },
  */
};
</script>
