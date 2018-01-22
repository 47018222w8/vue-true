<template>
  <div class="c-code-list">
    <x-header class="c-header" :left-options="{preventGoBack:true,showBack:false}" :right-options="{showMore:false}" @on-click-more="showMenus = true" title="报价">
      <div slot="overwrite-left" @click="back" class="c-left">
        <i slot="icon" class="fa fa-angle-left fa-lg" style="font-size:24px;"></i>&nbsp;返回
      </div>
      <div style="margin-top: 5px;" slot="overwrite-title">
        <button-tab style="width:100%" v-model="tabIndex">
          <button-tab-item @on-item-click="changeTab">&nbsp;未启用条码&nbsp;</button-tab-item>
          <button-tab-item @on-item-click="changeTab">&nbsp;已启用条码&nbsp;</button-tab-item>
        </button-tab>
      </div>
      <p slot="right" @click="clear" class="c-right">清除</p>
    </x-header>
    <div class="c-body">
      <group :title="bodyTitle">
        <cell v-for="(item, index) in list" :key="index">
          <flexbox slot="after-title">
            <flexbox-item :span="4">
              <p>组号:#{{item.groupNo}}</p>
            </flexbox-item>
            <flexbox-item>
              <p>{{item.startNum}}</p>
            </flexbox-item>
            <flexbox-item>
              <p>至</p>
            </flexbox-item>
            <flexbox-item>
              <p>{{item.endNum}}</p>
            </flexbox-item>
          </flexbox>
        </cell>
      </group>
    </div>
  </div>
</template>

<script>
  import { XHeader, XButton, ButtonTab, ButtonTabItem, Flexbox, FlexboxItem, Divider, Group, Cell } from 'vux'
  export default {
    data() {
      return {
        tabIndex: 0,
        list: []
      }
    },
    created() {
      this.getTab0()
    },
    computed: {
      bodyTitle() {
        if (this.tabIndex === 0) {
          return '已启用条码'
        }
        if (this.tabIndex === 1) {
          return '未启用条码'
        }
      }
    },
    methods: {
      async getTab0() {
        await this.$http.get('/list/pre/groupNo').then((response) => {
          this.list = response.data
        })
      },
      async getTab1() {
        await this.$http.get('/list/done/groupNo').then((response) => {
          this.list = response.data
        })
      },
      changeTab() {
        if (this.tabIndex) {
          this.getTab1()
        } else {
          this.getTab0()
        }
      },
      back() {
        window.history.go(-1)
      },
      clear() {
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
      Cell
    }
  }
</script>

<style lang="less">
@import "../styles/sup.less";
.c-code-list {
  overflow: hidden;
  .c-header {
    .vux-header-title-area {
      width: 50%;
    }
    background-color: #fff;
    .c-left {
      color: @s-primary-color;
    }
    .c-right {
      color: @s-primary-color;
    }
  }
  .c-body {
    height: calc(~"100vh - @{vux-header-height}");
    overflow: auto;
  }
}
</style>