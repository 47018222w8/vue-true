<template>
  <div class="c-map">
    <div class="c-body" :class="status?'c-down':'c-up'">
      <group :gutter="0" class="c-group">
        <cell title="生产公司" value="abdfkajldkf" is-link></cell>
        <cell title="产品类别" value="abdfkajldkf" is-link></cell>
        <cell title="具体产品" value="abdfkajldkf" is-link></cell>
      </group>
      <div class="c-bottom" @click="upDown">
        <i slot="icon" class="fa" :class="status?'fa-angle-double-up':' fa-angle-double-down'"></i>
      </div>
    </div>
    <baidu-map class="c-container" center="长春">
    </baidu-map>
  </div>
</template>
<script>
  import { XHeader, XButton, ButtonTab, ButtonTabItem, Flexbox, FlexboxItem, Divider, Group, Cell, XInput, CheckIcon } from 'vux'
  export default {
    data() {
      return {
        tabIndex: 0,
        result: null,
        // 0:收起 1:弹出
        status: 0
      }
    },
    computed: {
    },
    methods: {
      changeTab() {
      },
      back() {
        window.history.go(-1)
      },
      upDown() {
        this.status ? this.status = 0 : this.status = 1
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
@hide-height: -142px;
.c-map {
  height: 100%;
  .c-container {
    width: 100%;
    height: 100%;
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
      top: 0;
    }
  }
  .c-up {
    animation: 1s up forwards;
  }
  @keyframes up {
    0% {
      top: 0;
    }
    100% {
      top: @hide-height;
    }
  }
}
</style>
