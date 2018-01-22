<template>
  <div class="c-preview">
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
        <cell title="生产公司" :value="obj.son"></cell>
        <cell title="公司地址" :value="obj.address"></cell>
        <cell title="产品名称" :value="obj.goodsType"></cell>
        <cell title="产品编码" :value="obj.codeName"></cell>
        <cell title="适配车型" :value="obj.carModel"></cell>
        <cell title="生产日期" :value="obj.productionDate"></cell>
        <cell title="批次号" :value="obj.batchNo"></cell>
        <cell title="班组" :value="obj.classes"></cell>
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
  import { XHeader, XButton, Flexbox, FlexboxItem, Group, Cell } from 'vux'
  import { START_CODE } from '@/store/mutation-type'
  export default {
    data() {
      return {
        tabIndex: 0,
        result: null,
        // 0:收起 1:弹出
        status: 1,
        obj: this.$store.state.startCode,
        loading: false
      }
    },
    computed: {
    },
    methods: {
      async sub() {
        if (!this.loading) {
          this.loading = true
          this.$vux.loading.show({
            text: '提交中...'
          })
          await this.$http.put('/update/preview', this.obj).then((response) => {
            this.$store.commit(START_CODE, { obj: { step: 0 } })
            this.$vux.loading.hide()
            this.$vux.toast.show({
              text: '提交成功',
              position: 'middle',
              time: '1400'
            })
            setTimeout(() => {
              this.$router.push({
                name: 'home'
              })
            }, 1400)
          })
        }
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
      Flexbox,
      FlexboxItem,
      Group,
      Cell
    }
  }
</script>
<style lang="less">
@import "../styles/sup.less";
@hide-height: -306px;
.c-preview {
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
