<template>
  <div class="c-part-a">
    <div class="c-body">
      <p class="c-title">请选择需要绑定的公司信息</p>
      <group :gutter="0">
        <datetime title="生产日期"></datetime>
        <x-input title="班次" text-align="right" required></x-input>
        <x-input title="批次号" text-align="right" required></x-input>
      </group>
    </div>
    <div class="c-bottom">
        <x-button type="primary" mini style="width:80%;margin-top:10px;" @click.native="next">完成并预览</x-button>
    </div>
    <actionsheet v-model="show1" :menus="menus1"></actionsheet>
  </div>
</template>
<script>
  import { XHeader, XButton, ButtonTab, ButtonTabItem, Flexbox, FlexboxItem, Divider, Group, Cell, XInput, Actionsheet, Datetime } from 'vux'
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
      Actionsheet,
      Datetime
    }
  }
</script>
<style lang="less">
@import "../styles/sup.less";
.c-part-a {
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
    width: 100%;
    text-align: center;
  }
}
</style>
