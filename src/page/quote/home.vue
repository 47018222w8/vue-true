<template>
  <div class="c-home">
    <div class="c-title">
      <img class="c-img" src="http://img1.gamersky.com/image2017/12/20171223_zl_91_1/gamersky_02small_04_201712231822516.jpg" width="100%" alt="">
    </div>
    <flexbox :gutter="0" class="c-four-btn">
      <flexbox-item class="c-btn">
        <i class="fa fa-power-off fa-lg"></i>
        <p>条码启用</p>
      </flexbox-item>
      <flexbox-item class="c-btn">
        <i class="fa fa-credit-card fa-lg"></i>
        <p>条码购买</p>
      </flexbox-item>
      <flexbox-item class="c-btn">
        <i class="fa fa-arrows-alt fa-lg"></i>
        <p>条码购买</p>
      </flexbox-item>
      <flexbox-item class="c-btn">
        <i class="fa fa-bar-chart fa-lg"></i>
        <p>条码购买</p>
      </flexbox-item>
    </flexbox>
    <p class="s-div-top-border"></p>
    <h2 style="padding-top:10px;">数据看板</h2>
    <swiper auto height="100px" class="c-data">
      <swiper-item>
        <div class="c-item">
          <p>未启用条码&nbsp;&nbsp;120个</p>
          <p>已启用条码&nbsp;&nbsp;330个</p>
        </div>
      </swiper-item>
      <swiper-item>
        <div class="c-item">
          <p>未启用条码&nbsp;&nbsp;120个</p>
          <p>已启用条码&nbsp;&nbsp;330个</p>
        </div>
      </swiper-item>
    </swiper>
    <div class="c-bottom">
      <flexbox :gutter="0">
        <flexbox-item>
          <div class="c-btn-home">
            <i class="fa fa-home fa-2x" style="color:#fff;"></i>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="c-btn-man">
            <i class="fa fa-user fa-lg"></i>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
  import { XHeader, XButton, ButtonTab, ButtonTabItem, Tabbar, TabbarItem, Card, Flexbox, FlexboxItem, Divider, Swiper, SwiperItem } from 'vux'
  export default {
    data() {
      return {
      }
    },
    created() {
    },
    methods: {
    },
    components: {
      scroll,
      XHeader,
      XButton,
      ButtonTab,
      ButtonTabItem,
      Tabbar,
      TabbarItem,
      Card,
      Flexbox,
      FlexboxItem,
      Divider,
      Swiper,
      SwiperItem
    }
  }
</script>

<style lang="less">
@import "../../styles/sup.less";
.c-home {
  padding: 0 10px;
  .c-title {
    padding: 20px 20px;
    .c-img {
      border-radius: 10px;
    }
  }
  .c-four-btn {
    padding-bottom: 10px;
    .c-btn {
      text-align: center;
    }
  }
  .c-data {
    padding-top: 10px;
    .c-item {
      p {
        padding: 10px 0 5px 0;
      }
      text-align: center;
      border: 1px solid #eee;
    }
  }
  .c-bottom {
    width: 60%;
    margin: 0 auto;
    .c-btn-home {
      width: 60px;
      height: 60px;
      border-radius: 30px;
      background-color: @s-primary-color;
      .display-flex;
      .align-items(center);
      .justify-content(center);
      margin: 0 auto;
    }
    .c-btn-man {
      margin: 0 auto;
      width: 40px;
      height: 40px;
      border-radius: 20px;
      border: 1px solid #666;
      .display-flex;
      .align-items(center);
      .justify-content(center);
    }
  }
}
</style>