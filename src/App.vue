<template>
  <div id="app">
    <loading :show="isLoading"></loading>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <tabbar v-show="$route.meta.showTabbar" class="tabbar">
      <tabbar-item :selected="changeTabBar('home')" link="/">
        <i slot="icon" class="fa fa-qrcode"></i>
        <span slot="label">条码管理</span>
      </tabbar-item>
      <tabbar-item :selected="changeTabBar('orders')">
        <i slot="icon" class="fa fa-database"></i>
        <span slot="label">数据中心</span>
      </tabbar-item>
      <tabbar-item :selected="changeTabBar('shop')">
        <i slot="icon" class="fa fa-user-o"></i>
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import { Loading, Tabbar, TabbarItem } from 'vux'
  import { mapState } from 'vuex'
  export default {
    name: 'app',
    components: {
      Loading,
      Tabbar,
      TabbarItem
    },
    data() {
      return {
        showMenus: false
      }
    },
    computed: {
      ...mapState(['isLoading'])
    },
    methods: {
      changeTabBar(name) {
        return this.$route.name === name
      }
    }
  }
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
@import "~vux/src/styles/1px.less";
@import "./styles/sup.less";
#app,body,html {
  height: 100%;
  background-color: @s-background-color;
}

body,html {
  margin: 0;
  padding: 0;
}
.tabbar {
  background-color: #fff;
  .fa {
    font-size: 18px;
  }
  .weui-tabbar__icon {
    height: 20px;
  }
  p {
    padding: 0;
  }
}
</style>