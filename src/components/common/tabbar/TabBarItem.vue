<template>
  <div class="tabbar-item" @click="itemclick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activestyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red',
    }
  },
  data() {
    return {
      
    };
  },
  methods:{
    itemclick(){
      this.$router.replace(this.path)
    }
  },
  computed: {
    isActive(){
      return this.$route.path.indexOf(this.path) !==-1
    },
    activestyle(){
      return this.isActive?{color : this.activeColor}:{}
    }
  },
};
</script>
<style>
.tabbar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tabbar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
.active {
  color: red;
}
</style>