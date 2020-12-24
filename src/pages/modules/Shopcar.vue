<template>
  <div>
    <div v-for="(item,i) in getshopcarlist" :key="i">
      <h3>
        {{ item.name }}
        ￥：{{ item.price * item.count }}
        <button
          @click="clickChangeCount(-1, item.name)"
        >-</button>
        <label>{{ item.count }}</label>
        <button @click="clickChangeCount(1, item.name)">+</button>
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    // console.log(this.$store.state.goodslist)
    // console.log(this.$store.getters.getAdult)
  },
  methods: {
    clickChangeCount(count, name) {
      this.$store.commit("changeGoodsCount", { count, name });
    }
  },
  computed: {
    getshopcarlist() {
      return this.$store.getters.getshopcarlist;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>