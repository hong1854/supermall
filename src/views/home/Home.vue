<template>
  <div id="home" class="wrapper">
    <navbar class="home-nav">
      <div slot="centent">购物街</div>
    </navbar>
    <TabControl
      :title="['流行','新款','精选']"
      @tabclick="tabclick"
      ref="tabControl1"
      class="tabcontrol"
      v-show="isTabFiex"
    ></TabControl>

    <Scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <HomeSwiper :banner="banner" @SwiperImageLoad="loadImage"></HomeSwiper>
      <RecommendView :recommends="recommend"></RecommendView>
      <FeatureView></FeatureView>
      <TabControl
        :title="['流行','新款','精选']"
        @tabclick="tabclick"
        ref="tabControl"
        :class="{fixed:isTabFiex}"
      ></TabControl>
      <GoodsList :goods="showGoods"></GoodsList>
    </Scroll>
    <BackTop @click.native="backclick" v-show="isshow" />
  </div>
</template>
<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import navbar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils/utils";
import {itemListenerMixin ,backToMixin} from 'common/mixin'
import { log } from 'util';

export default {
  mixins:[itemListenerMixin,backToMixin],
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      tabOffsetTop: 0,
      isTabFiex: false,
      saveY:0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  components: {
    navbar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  created() {
    //请求多个数据
    this.getHomeMultidata();
    //请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
    //监听ITEM中图片加载完成
  },
  
  activated(){
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated(){
    this.saveY=this.$refs.scroll.getScrollY()
  },
  methods: {
    /**
     * 事件监听相关的方法
     **/
    tabclick(i) {
      switch (i) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
      }
      this.$refs.tabControl1.currentIndex=i;
      this.$refs.tabControl.currentIndex=i;
    },
    contentScroll(position) {
      //判断BackTop是否显示
      this.isshow = -position.y > 1000;
      //决定TabConscroll是否吸顶
      this.isTabFiex = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    loadImage() {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },
    /**
     * 网络请求相关的方法
     **/
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finisPullup();
      });
    }
  }
};
</script>
<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tabcontrol{
  position: relative;
  z-index: 9;
}
</style>