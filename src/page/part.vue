<template>
  <div class="c-part">
    <search @on-focus="showIndex = 1" placeholder="零件号 零件名 适用车型 产品品牌" @on-cancel="showIndex = 0" @on-change="search" :autoFixed="false"></search>
    <div class="c-body" v-show="showIndex === 0">
      <div class="c-title">
        <p style="color:black;">请选择需要绑定的产品</p>
        <p style="font-size:12px;">您可以通过搜索框进行搜索,以便您快速定位产品</p>
      </div>
      <group :gutter="0">
        <cell title="3abc def ghi">
          <div slot="inline-desc">
            <p>仄仄仄仄仄仄仄在</p>
            <p>广汽丰田-凯美瑞</p>
          </div>
          <check-icon></check-icon>
        </cell>
        <cell title="3abc def ghi">
          <div slot="inline-desc">
            <p>仄仄仄仄仄仄仄在</p>
            <p>广汽丰田-凯美瑞</p>
          </div>
          <check-icon></check-icon>
        </cell>
      </group>
    </div>
    <flexbox class="c-bottom">
      <flexbox-item style="text-align:center;">
        <x-button mini style="width:80%;">预览</x-button>
      </flexbox-item>
      <flexbox-item style="text-align:center;">
        <x-button type="primary" mini style="width:80%;"  @click.native="next">下一步</x-button>
      </flexbox-item>
    </flexbox>
  </div>
</template>
<script>
  import { XHeader, XButton, ButtonTab, ButtonTabItem, Flexbox, FlexboxItem, Divider, Group, Cell, XInput, Search, CheckIcon } from 'vux'
  export default {
    data() {
      return {
        showIndex: 0,
        result: null,
        show1: false,
        menus1: {
          menu1: 'aaaaa',
          menu2: 'bbbbbb'
        }
      }
    },
    created() {
    },
    computed: {
    },
    methods: {
      changeTab() {
      },
      back() {
        window.history.go(-1)
      },
      search() {
      },
      next() {
        this.$router.push({ name: 'partA' })
      }
    },
    components: {
      XHeader,
      XButton,
      ButtonTab,
      ButtonTabItem,
      Flexbox,
      FlexboxItem,
      Divider,
      Group,
      Cell,
      XInput,
      Search,
      CheckIcon
    }
  }
</script>
<style lang="less">
@import "../styles/sup.less";
.c-part {
  background-color: #fff;
  height: 100%;
  .c-body {
    .c-title {
      background-color: @s-background-color;
      padding: 3px 10px;
      color: #777;
    }
  }
  .c-bottom {
    border-top: 1px solid @s-hr-color;
    position: fixed;
    bottom: 0px;
    height: 50px;
  }
}
</style>
