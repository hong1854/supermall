<template>
  <Swiper>
      <SwiperItem v-for="item in banner" :key="item.title">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </SwiperItem>
    </Swiper>
</template>
<script>
import {Swiper, SwiperItem} from "components/common/swiper"
export default {
  data(){
    return {
      isLoad:false
    }
  },
  components:{
    Swiper, 
    SwiperItem,
  },
  props:{
    banner:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    imageLoad(){
      if(!this.isLoad){
        this.$emit('SwiperImageLoad')
        this.isLoad=true
      }
      
    }
  },
}
</script>
<style>
  
</style>