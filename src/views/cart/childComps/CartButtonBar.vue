<template>
  <div class="bottom-bar">
    <div class="check-content">
      <CheckButton class="check-btn" :isChecked="isSelectAll" @click.native="allcheck"></CheckButton>
      <span>全选</span>
    </div>
    <div class="price">合计:{{totalPrice}}</div>
    <div class="calculte" @click="calcClick">去结算({{calculte}})</div>
  </div>
</template>
<script>
import CheckButton from "components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";
import { log } from "util";
export default {
  computed: {
    ...mapGetters(["cartlist"]),
    totalPrice() {
      return (
        "￥" +
        this.cartlist
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    calculte() {
      return this.cartlist.filter(item => item.checked).length;
    },
    isSelectAll() {
      //  return !(this.cartlist.filter(item=>!item.checked).length)
      if (this.cartlist.length === 0) return false;
      return !this.cartlist.find(item => !item.checked);
    }
  },
  methods: {
    allcheck() {
      if (this.isSelectAll) {
        this.cartlist.forEach(item => item.checked = false);
      } else {
        this.cartlist.forEach(item => item.checked = true);
      }
    },
    calcClick(){
      if(!this.isSelectAll){
        this.$toast.show('请选择您要购买的商品')
      }
    }
  },
  components: {
    CheckButton
  }
};
</script>
<style scoped>
.bottom-bar {
  background-color: #eee;
  position: relative;
  line-height: 40px;
  display: flex;
}
.check-content {
  align-items: center;
  display: flex;
  margin-left: 10px;
}
.check-btn {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 20px;
  flex: 1;
}
.calculte {
  width: 80px;
  background-color: red;
  color: #fff;
  text-align: center;
  font-size: 13px;
}
</style>