<template>
  <div class="c-home">
    <div class="c-title">
      <swiper auto height="150px">
        <swiper-item>
          <img src="http://192.168.1.136:9008/img/1.jpg" width="100%" alt="">
        </swiper-item>
        <swiper-item>
          <img src="http://192.168.1.136:9008/img/2.jpg" width="100%" alt="">
        </swiper-item>
      </swiper>
    </div>
    <flexbox :gutter="0" class="c-four-btn">
      <flexbox-item class="c-btn">
        <div class="c-fa-div" style="background-color: #66cdee;"  @click="$router.push({name:'codeA'})">
          <div class="c-fa-border">
            <i class="fa fa-unlock-alt fa-lg"></i>
          </div>
        </div>
        <p>条码启用</p>
      </flexbox-item>
      <flexbox-item class="c-btn">
        <div class="c-fa-div" style="background-color:#4fd3be;" >
          <a class="c-fa-border" href="http://www.gamersky.com/ent/201712/997111_2.shtml">
            <i class="fa fa-rmb fa-lg"></i>
          </a>
        </div>
        <p>条码购买</p>
      </flexbox-item>
      <flexbox-item class="c-btn">
        <div class="c-fa-div" style="background-color:#fe9fb5;"  @click="$router.push({name:'map'})">
          <div class="c-fa-border">
            <i class="fa fa-map-marker fa-lg"></i>
          </div>
        </div>
        <p>扫码分布</p>
      </flexbox-item>
      <flexbox-item class="c-btn">
        <div class="c-fa-div" style="background-color:#a0bdf5;"  @click="$router.push({name:'codeList'})">
          <div class="c-fa-border">
            <i class="fa fa-home fa-lg"></i>
          </div>
        </div>
        <p>条码库存</p>
      </flexbox-item>
    </flexbox>
    <div class="c-data">
      <p class="c-title">数据看板</p>
      <timeline>
        <timeline-item v-show="false"></timeline-item>
        <timeline-item>
          <p>&nbsp;2018-1-2 18:49:01</p>
          <flexbox :gutter="0" align="start">
            <flexbox-item :span="1" class="c-item">
              <div class="c-triangle"></div>
            </flexbox-item>
            <flexbox-item>
              <group :gutter="-1">
                <cell>
                  <p slot="after-title" class="c-p-a">未启用数据</p>
                  <p class="c-p-a">120个</p>
                </cell>
                <cell>
                  <p slot="after-title" class="c-p-b">已启用数据</p>
                  <p class="c-p-b">120个</p>
                </cell>
              </group>
            </flexbox-item>
          </flexbox>
        </timeline-item>
        <timeline-item>
          <p>&nbsp;2018-1-2 18:49:01</p>
          <flexbox :gutter="0" align="start">
            <flexbox-item :span="1" class="c-item">
              <div class="c-triangle"></div>
            </flexbox-item>
            <flexbox-item>
              <group :gutter="-1">
                <cell>
                  <p slot="after-title" class="c-p-a">未启用数据</p>
                  <p class="c-p-a">120个</p>
                </cell>
                <cell>
                  <p slot="after-title" class="c-p-b">已启用数据</p>
                  <p class="c-p-b">120个</p>
                </cell>
              </group>
            </flexbox-item>
          </flexbox>
        </timeline-item>
      </timeline>

    </div>
  </div>
</template>

<script>
  import { Timeline, TimelineItem, XHeader, XButton, ButtonTab, ButtonTabItem, Tabbar, TabbarItem, Card, Flexbox, FlexboxItem, Divider, Swiper, SwiperItem, Group, Cell } from 'vux'
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
      SwiperItem,
      Group,
      Cell,
      Timeline,
      TimelineItem
    }
  }
</script>

<style lang="less">
@import "../styles/sup.less";
.c-home {
  overflow: hidden;
  .c-four-btn {
    padding-top: 10px;
    background-color: #fff;
    padding-bottom: 10px;
    .c-btn {
      text-align: center;
      p {
        padding-top: 10px;
      }
      .fa {
        color: #fff;
      }
      .c-fa-div {
        margin: 0 auto;
        .display-flex;
        .align-items(center);
        .justify-content(center);
        height: 50px;
        width: 50px;
        border-radius: 25px;
        .c-fa-border {
          .display-flex;
          .align-items(center);
          .justify-content(center);
          height: 30px;
          width: 30px;
          border-radius: 17px;
          border: 2px solid #fff;
        }
      }
    }
  }
  .c-data {
    max-height: 280px;
    overflow: auto;
    .vux-timeline {
      padding-top:0;
    }
    .c-title {
      padding:5px 0 0 16px;
    }
    .c-p-a {
      color: red;
    }
    .c-p-b {
      color: green;
    }
    .c-item {
      .display-flex;
      .justify-content(flex-end);
      .c-triangle {
        width: 0;
        height: 0;
        display: block;
        border-style: solid;
        border-width: 6px;
        border-color: #fff #fff transparent transparent;
      }
    }
  }
}
</style>