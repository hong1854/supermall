import { debounce } from "./utils/utils";
import BackTop from "components/content/backTop/BackTop";
export const itemListenerMixin ={
  data(){
    return {
      itemImgListener:null,
      newRefresh:null,
    }
  },
  mounted() {
    this.newRefresh =debounce(this.$refs.scroll.refresh, 100);
    this.itemImgListener=()=>{
      this.newRefresh()
    }
    this.$bus.$on('itemImgLoad',this.itemImgListener) 
  },
}
export const backToMixin = {
  components:{
    BackTop
  },
  data(){
    return {
      isshow: false,
    }
  },
  methods:{
    backclick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
  }
}