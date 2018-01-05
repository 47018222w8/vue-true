<template>
  <div class="c-code-info">
    <x-header class="c-header" :left-options="{preventGoBack:true,showBack:false}" :right-options="{showMore:false}" @on-click-more="showMenus = true" title="报价">
      <div slot="overwrite-left" @click="back" class="c-left">
        <i slot="icon" class="fa fa-angle-left fa-lg" style="font-size:24px;"></i>&nbsp;返回
      </div>
      <div slot="right" @click="clear" class="c-right">
        <p >预览</p>
      </div>
    </x-header>
    <div class="c-body">
      <checklist title="条码设置信息" disabled v-model="result" :options="list" label-position="left"></checklist>
    </div>
  </div>
</template>
<script>
  import { XHeader, XButton, ButtonTab, ButtonTabItem, Flexbox, FlexboxItem, Divider, Group, Cell, XInput, Checklist } from 'vux'
  export default {
    data() {
      return {
        result: ['1', '2'],
        list: [
          {
            key: '1',
            value: '集团信息',
            inlineDesc: '长春一汽富维汽车零部件股份有限公司'
          },
          {
            key: '2',
            value: '公司信息',
            inlineDesc: '长春一汽富维汽车零部件股份有限公司'
          },
          {
            key: '3',
            value: '类别信息',
            inlineDesc: '轮胎'
          },
          {
            key: '4',
            value: '产品信息',
            inlineDesc: 'fdeasfdasfa'
          },
          {
            key: '5',
            value: '批次信息',
            inlineDesc: '未设置'
          }
        ]
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
      Checklist
    }
  }
</script>
<style lang="less">
@import "../styles/sup.less";
.c-code-info {
  overflow: hidden;
  height: 100%;
  .vux-header .vux-header-left,
  .vux-header .vux-header-right {
    top: 10px;
  }
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
    height: calc(~"100vh - @{vux-header-height}");
    overflow: auto;
    .weui-cell__bd {
      p {
        color: #777;
        font-size: 12px;
      }
    }
    .vux-label-desc {
      color: black;
    }
  }
}
</style>
