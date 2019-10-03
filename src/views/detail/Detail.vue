<template>
  <div id="detail">
    <DatailNarBar class="detail-bar"></DatailNarBar>
    <scroll class="content-D" ref="scroll">
      <DetailSwiper :topImages="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo :detailInfo="detailInfo" @imgeLoad='imgeLoad'></DetailGoodsInfo>
      <DetailParamInfo :paramInfo="paramInfo"></DetailParamInfo>
    </scroll>
  </div>
</template>
<script>
import DatailNarBar from "./childComps/DetalNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from './childComps/DetailGoodsInfo';
import DetailParamInfo from './childComps/DetailParamInfo';

import { getDetail, GoodsInfo, Shop, GoodsParam } from "network/detail";

import scroll from "components/common/scroll/Scroll";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo:{},
      paramInfo:{},
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then(res => {
      //获取顶部的图片
      console.log(res);
      
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      this.goods = new GoodsInfo(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      this.shop = new Shop(data.shopInfo);
      this.detailInfo =data.detailInfo;
      this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
    });
  },
  components: {
    DatailNarBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    scroll
  },
  methods:{
    imgeLoad(){
      this.$refs.scroll.refresh()
    }
  }
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