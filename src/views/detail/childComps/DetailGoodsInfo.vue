<template>
  <div v-if="Object.keys(detailInfo).length !==0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img
        :src="item"
        alt
        @load="imgLoad"
        v-for="(item , index) in detailInfo.detailImage[0].list"
        :key="index"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    detailInfo: {
      type: Object
    }
  },
  data() {
    return {
      counter: 0,
      imgesLength: 0
    };
  },
  methods: {
    imgLoad() {
      if (++this.cunter === this.imgesLength) {
        this.$emit("imgeLoad");
      }
    }
  },
  watch: {
    detailInfo() {
      this.imgesLength = this.detailInfo.detailImage[0].list.length;
    }
  }
};
</script>
<style scoped>
.goods-info {
  padding: 20px 0;
}
.desc{
  font-size:14px;
  color:#222;
}
.info-key {
  color: #eb4868;
}
.info-list img {
  width: 100%;
}
</style>