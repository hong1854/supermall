<template>
  <div class="cart">
      <NavBar class="nav-bar">
        <div slot="centent">购物车({{cartLength}})</div>
      </NavBar>
      <Cartlist></Cartlist>
      <CartButtomBar></CartButtomBar>
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
import Cartlist from './childComps/CartList'
import CartButtomBar from './childComps/CartButtonBar'
import {mapGetters} from "vuex"
export default {
  data(){
    return{}
  },
  components:{
    NavBar,
    Cartlist,
    CartButtomBar,
  },
  computed:{
    ...mapGetters([
      'cartLength'
    ])
  },
}
</script>
<style scoped>
.cart{
  height:100vh;
}
  .cart .nav-bar{
    background-color:var(--color-tint);
    color:#fff;
  }
</style>