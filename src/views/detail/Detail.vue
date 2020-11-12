<template>
  <div id="detail">
    <DatailNarBar class="detail-bar" @itemClick="itemClick" ref="nav"></DatailNarBar>
    <scroll class="content-D" ref="scroll" :probe-type="3" @scroll="detailScaroll">
      <DetailSwiper :topImages="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo :detailInfo="detailInfo" @imgeLoad="imgeLoad"></DetailGoodsInfo>
      <DetailParamInfo :paramInfo="paramInfo" ref="param"></DetailParamInfo>
      <DetailRate :commentInfo="commentInfo" ref="comment"></DetailRate>
      <GoodsList :goods="recommend" ref="goodsList"></GoodsList>
    </scroll>
    <DetailBottomBar @cart="addcart"></DetailBottomBar>
    <BackTop @click.native="backclick" v-show="isshow" />
    <Toast :message="message" :show="show"></Toast>
  </div>
</template>
<script>
import DatailNarBar from "./childComps/DetalNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailRate from "./childComps/DetailRate";
import DetailBottomBar from "./childComps/DetailBottomBar"


import {
  getDetail,
  GoodsInfo,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";

import scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import Toast from "components/common/toast/Toast"
// import BackTop from "components/content/backTop/BackTop";
import {itemListenerMixin ,backToMixin} from 'common/mixin'
import { log } from "util";

export default {
mixins: [itemListenerMixin,backToMixin],
  name: "Detail",
  
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      themeTopY: [],
      indexY: null,
      show:false,
      message:'',
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then(res => {
      //获取顶部的图片
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      this.goods = new GoodsInfo(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      this.shop = new Shop(data.shopInfo);
      this.detailInfo = data.detailInfo;
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    getRecommend().then(res => {
      this.recommend = res.data.list;
    });
  },
  components: {
    DatailNarBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailRate,
    GoodsList,
    DetailBottomBar,
    Toast,
    scroll
  },
  methods: {
    imgeLoad() {
      this.newRefresh();
      this.$nextTick(() => {
        this.themeTopY = [];
        this.themeTopY.push(0);
        this.themeTopY.push(this.$refs.param.$el.offsetTop);
        this.themeTopY.push(this.$refs.comment.$el.offsetTop);
        this.themeTopY.push(this.$refs.goodsList.$el.offsetTop);
      });
    },
    itemClick(i) {
      this.$refs.scroll.scrollTo(0, -this.themeTopY[i], 100);
    },
    detailScaroll(position) {
      const positionY = -position.y;
      const length = this.themeTopY.length;
      for (let i = 1; i < length; i++) {
        if(this.indexY!==i &&(i<length-1&&positionY>=this.themeTopY[i]&&positionY<this.themeTopY[i+1])||(i===length-1&&positionY>=this.themeTopY[i])){
            this.indexY =i;
            this.$refs.nav.currentIndex =this.indexY
        } 
      }
      this.isshow = -position.y > 1000;
    },
    addcart(){
      const product = {};
      product.image=this.topImages[0];
      product.title=this.goods.title;
      product.desc =this.goods.desc;
      product.price=this.goods.lowNowPrice;
      product.iid =this.iid;
      product.count =1;
      // this.$store.commit('add',product)
      this.$store.dispatch('add',product).then(res=>{
       this.$toast.show(res)
        
      })
    },
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  
};
</script>
<style>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-bar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content-D {
  height: 600px;
}
</style>