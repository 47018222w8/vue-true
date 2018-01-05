<template>
  <div class="c-company">
    <div class="c-body">
      <p class="c-title">请选择需要绑定的公司信息</p>
      <group :gutter="0">
        <cell title="集团信息" value="abdfkajldkf"></cell>
        <cell title="生产公司" value="abdfkajldkf" is-link @click.native="showMenu1"></cell>
        <cell title="公司地址" value="abdfkajldkf"></cell>
      </group>
    </div>
    <flexbox class="c-bottom">
      <flexbox-item style="text-align:center;">
        <x-button mini style="width:80%;">预览</x-button>
      </flexbox-item>
      <flexbox-item style="text-align:center;">
        <x-button type="primary" mini style="width:80%;" @click.native="next">下一步</x-button>
      </flexbox-item>
    </flexbox>
    <actionsheet v-model="show1" :menus="menus1"></actionsheet>
  </div>
</template>
<script>
  import { XHeader, XButton, ButtonTab, ButtonTabItem, Flexbox, FlexboxItem, Divider, Group, Cell, XInput, Actionsheet } from 'vux'
  export default {
    data() {
      return {
        tabIndex: 0,
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
      showMenu1() {
        this.show1 = true
      },
      back() {
        window.history.go(-1)
      },
      clear() {
      },
      next() {
        this.$router.push({ name: 'part' })
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
      Actionsheet
    }
  }
</script>
<style lang="less">
@import "../styles/sup.less";
.c-company {
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
