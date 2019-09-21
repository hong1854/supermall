<template>
  <div id="home">
    <navbar class="home-nav">
      <div slot="centent">购物街</div>
    </navbar>
    <HomeSwiper :banner="banner"></HomeSwiper>
    <RecommendView :recommends='recommend'></RecommendView>
    <FeatureView></FeatureView>
    <TabControl :title="['流行','新款','精选']" class="tab-control"></TabControl>
    <ul>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
    </ul>
  </div>
</template>
<script>

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'


import navbar from "components/common/navbar/NavBar";
import TabControl from 'components/content/tabControl/TabControl'


import { getHomeMultidata } from "network/home";

export default {
  data() {
    return {
      banner: [],
      dkeyword: [],
      keywords: [],
      recommend: []
    };
  },
  components: {
    navbar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
  },
  created() {
    getHomeMultidata().then(res => {
      this.banner = res.data.banner.list;
      this.dkeyword = res.data.dkeyword;
      this.keywords = res.data.keywords.list;
      this.recommend = res.data.recommend.list;
    });
  }
};
</script>
<style>
#home{
  padding-top:44px;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  right:0;
  top:0;
  left:0;
  z-index: 9;
}
.tab-control{
  position: sticky;
  top:44px;
}
</style>