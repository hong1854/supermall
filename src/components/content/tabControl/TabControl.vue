<template>
  <div class="tab-control">
    <div
      v-for="(item,i) in title"
      class="tab-control-item"
      :class="{active:i===currentIndex}"
      @click="itemclick(i)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    itemclick(i) {
      this.currentIndex = i;
    }
  },
  props: {
    title: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>
<style>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span {
  padding: 5px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 1.5px solid var(--color-tint);
}
</style>