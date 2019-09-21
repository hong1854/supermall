<template>
  <Swiper>
      <SwiperItem v-for="item in banner">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </SwiperItem>
    </Swiper>
</template>
<script>
import {Swiper, SwiperItem} from "components/common/swiper"
export default {
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
  }
}
</script>
<style>
  
</style>