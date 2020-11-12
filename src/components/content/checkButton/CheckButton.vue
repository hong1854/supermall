<template>
  <div class="check-button" :class="{check:isChecked}">
    <img src="~assets/img/cart/gen.svg" alt />
  </div>
</template>
<script>
export default {
  props:{
    isChecked:{
      type:Boolean,
      default(){
        return false
      }
    }
  }
};
</script>
<style scoped>
.check-button {
  background-color: #ccc;
  border-radius: 50px;
  
}
.check-button img {
  width: 20px;
  height: 20px;
}
.check{
  background-color:red;
}
</style>