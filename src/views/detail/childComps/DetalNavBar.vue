<template>
  <div>
    <NavBar class="nvabar">
      <div slot="left" class="back" @click="backclick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="centent" class="title">
        <div v-for="(item,i) in title" :key="item.title" class="title-item" :class='{active:i===currentIndex}' @click="itemClick(i)">{{item}}</div>
      </div>
    </NavBar>
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  components:{
    NavBar,
  },
  data(){
    return{
      title:['商品','参数','评论','推荐'],
      currentIndex:0,
    }
  },
  methods:{
    itemClick(i){
      this.currentIndex=i,
      this.$emit('itemClick',i)
    },
    backclick(){
      this.$router.go(-1)
    }
  },
}
</script>
<style scoped>
.nvabar{
  position: relative;
  z-index:9;
}
  .title{
    display: flex;
    padding:0 10px;
  }
  .title-item{
    flex:1;
    font-size:13px;
  }
  .active{
    color: var(--color-high-text)
  }
  .back img {
    margin-top: 12px;
  }
</style>