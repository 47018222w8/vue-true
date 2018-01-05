<template>
  <div class="c-code">
    <x-header class="c-header" :left-options="{preventGoBack:true,showBack:false}" :right-options="{showMore:false}" @on-click-more="showMenus = true" title="报价">
      <div slot="overwrite-left" @click="back" class="c-left">
        <i slot="icon" class="fa fa-angle-left fa-lg" style="font-size:24px;"></i>&nbsp;返回
      </div>
      <div slot="right" @click="clear" class="c-right">
        <p>条码启用</p>
      </div>
    </x-header>
    <div class="c-body">
      <group :gutter="0">
        <cell>
          <flexbox slot="after-title">
            <flexbox-item :span="4">
              <p>组号:#0903</p>
            </flexbox-item>
            <flexbox-item :span="2">
              <x-input style="padding:0;border-bottom:1px solid #eee;" type="number"></x-input>
            </flexbox-item>
            <flexbox-item :span="1">
              <p>至</p>
            </flexbox-item>
            <flexbox-item :span="2">
              <x-input style="padding:0;border-bottom:1px solid #eee;" type="number"></x-input>
            </flexbox-item>
            <flexbox-item :span="1">
              <check-icon :value.sync="result"></check-icon>
            </flexbox-item>
          </flexbox>
        </cell>
      </group>
    </div>
    <flexbox class="c-bottom">
      <flexbox-item>
        <p style="text-align:center;" class="s-p-desc">您选择了71张条码</p>
      </flexbox-item>
      <flexbox-item style="text-align:right;" >
        <div style="padding-right:10px;">
          <x-button type="primary" mini>开始启用</x-button>
        </div>
      </flexbox-item>
    </flexbox>
  </div>
</template>
<script>
  import { XHeader, XButton, ButtonTab, ButtonTabItem, Flexbox, FlexboxItem, Divider, Group, Cell, XInput, CheckIcon } from 'vux'
  export default {
    data() {
      return {
        tabIndex: 0,
        result: null
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
      Cell,
      XInput,
      CheckIcon
    }
  }
</script>
<style lang="less">
@import "../styles/sup.less";
.c-code {
  overflow: hidden;
  .vux-header .vux-header-left,
  .vux-header .vux-header-right {
    top: 10px;
  }
  height: 100%;
  background-color: #fff;
  .c-header {
    background-color: #fff;
    .c-left {
      color: @s-primary-color;
    }
    .c-right {
      color: @s-primary-color;
      border: 1px solid @s-primary-color;
      border-radius: 6px;
      p {
        padding: 0px 6px;
      }
    }
  }
  .c-body {
    height: calc(~"100vh - @{vux-header-height} - @{vux-button-div-height}");
    overflow: auto;
    border-bottom: 1px solid @s-hr-color;
  }
  .c-bottom {
    height: @vux-button-div-height;
  }
}
</style>
