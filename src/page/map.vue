<template>
  <div class="c-map">
    <x-header style="z-index:3" :left-options="{preventGoBack:true,showBack:false}" :right-options="{showMore:false}" @on-click-more="showMenus = true" title="扫码分布">
      <div slot="overwrite-left" @click="back" class="c-left">
        <i slot="icon" class="fa fa-angle-left fa-lg" style="font-size:24px;"></i>&nbsp;返回
      </div>
      <div slot="right" @click="sub">
        提交
      </div>
    </x-header>
    <div class="c-body" :class="status?'c-down':'c-up'">
      <group :gutter="0" class="c-group">
        <cell title="生产公司" :value="cell0" is-link @click.native="show0 = true"></cell>
        <cell title="产品类别" :value="cell1" is-link @click.native="show1 = true"></cell>
        <cell title="具体产品" :value="cell2" is-link @click.native="show2 = true"></cell>
      </group>
      <div class="c-bottom" @click="upDown">
        <i slot="icon" class="fa" :class="status?'fa-angle-double-up':' fa-angle-double-down'"></i>
      </div>
    </div>
    <actionsheet v-model="show0" :menus="menus0" @on-click-menu="choose0"></actionsheet>
    <actionsheet v-model="show1" :menus="menus1" @on-click-menu="choose1"></actionsheet>
    <actionsheet v-model="show2" :menus="menus2" @on-click-menu="choose2"></actionsheet>
    <baidu-map class="c-container" center="长春">
      <bm-point-collection :points="points" shape="BMAP_POINT_SHAPE_STAR" color="red" size="BMAP_POINT_SIZE_SMALL" @click="clickHandler"></bm-point-collection>
      <bm-info-window :position="position" :title="content" :show="infoShow">
      </bm-info-window>
    </baidu-map>
  </div>
</template>
<script>
  import { XHeader, XButton, Group, Cell, Actionsheet, Flexbox, FlexboxItem } from 'vux'
  export default {
    data() {
      return {
        tabIndex: 0,
        result: null,
        // 0:收起 1:弹出
        status: 0,
        param: {
          companyId: null,
          goodsTypeId: null,
          carCodeId: null
        },
        cell0: '',
        cell1: '',
        cell2: '',
        show0: false,
        show1: false,
        show2: false,
        menus0: [],
        menus1: [],
        menus2: [],
        content: '',
        infoShow: false,
        points: [],
        position: {},
        loading: false
      }
    },
    computed: {
    },
    created() {
      this._initData()
    },
    methods: {
      async _initData() {
        await this.$http.get('/distribute/company').then((response) => {
          response.data.forEach(item => {
            this.menus0.push({
              label: item.companyName,
              value: item.companyId
            })
          })
        })
        await this.$http.get('/list/scan/location').then((response) => {
          response.data.forEach(item => {
            this.points.push({ lat: +item.lat, lng: +item.lng, content: item.goodsName })
          })
        })
      },
      sub() {
        this.loading = true
        this.$http.get('/list/scan/location', { params: this.param }).then((response) => {
          this.loading = false
        })
      },
      async choose0(menuKey, menuItem) {
        this.cell0 = menuItem.label
        this.param.companyId = menuItem.value
        await this.$http.get('/list/goodsType/' + menuItem.value).then((response) => {
          response.data.forEach(item => {
            this.menus1.push({
              label: item.goodsType,
              value: item.goodsTypeId
            })
          })
        })
      },
      async choose1(menuKey, menuItem) {
        this.cell1 = menuItem.label
        this.param.goodsTypeId = menuItem.value
        await this.$http.get('/list/goodsCarCode/' + menuItem.value).then((response) => {
          response.data.forEach(item => {
            this.menus2.push({
              label: item.codeName,
              value: item.carCodeId
            })
          })
        })
      },
      choose2(menuKey, menuItem) {
        this.cell2 = menuItem.label
        this.param.carCodeId = menuItem.value
      },
      back() {
        window.history.go(-1)
      },
      upDown() {
        this.status ? this.status = 0 : this.status = 1
      },
      clickHandler(e) {
        this.infoShow = true
        this.position.lng = e.point.lng
        this.position.lat = e.point.lat
        this.content = e.point.content
      }
    },
    components: {
      XHeader,
      XButton,
      Group,
      Cell,
      Actionsheet,
      Flexbox,
      FlexboxItem
    }
  }
</script>
<style lang="less">
@import "../styles/sup.less";
@hide-height: -96px;
.c-map {
  height: 100%;
  .c-container {
    width: 100%;
    height: calc(~"100vh - @{vux-header-height}");
  }
  .c-body {
    position: absolute;
    top: @hide-height;
    width: 100%;
    z-index: 2;
    .c-group {
      padding: 10px 10px 0 10px;
    }
    .c-bottom {
      background-color: #fff;
      margin: 0 10px;
      text-align: center;
    }
  }
  .c-down {
    animation: 1s down forwards;
  }
  @keyframes down {
    100% {
      top: @vux-header-height;
    }
  }
  .c-up {
    animation: 1s up forwards;
  }
  @keyframes up {
    0% {
      top: @vux-header-height;
    }
    100% {
      top: @hide-height;
    }
  }
}
</style>
