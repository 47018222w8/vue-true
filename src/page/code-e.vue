<template>
  <div class="c-part-a">
    <x-header class="" :left-options="{preventGoBack:true,showBack:false}" :right-options="{showMore:false}" @on-click-more="showMenus = true" title="条码启用">
      <div slot="overwrite-left" @click="back" class="c-left">
        <i slot="icon" class="fa fa-angle-left fa-lg" style="font-size:24px;"></i>&nbsp;返回
      </div>
    </x-header>
    <div class="c-body">
      <p class="c-title">请选择需要绑定的公司信息</p>
      <group :gutter="0">
        <datetime title="生产日期" v-model="productionDate"></datetime>
        <x-input title="班组" v-model="classes" placeholder="请填写班组" text-align="right" required></x-input>
        <x-input title="批次号" v-model="batchNo" placeholder="请填写批次号" text-align="right" required></x-input>
      </group>
    </div>
    <div class="c-bottom">
      <x-button type="primary" mini style="width:80%;margin-top:10px;" @click.native="next">完成并预览</x-button>
    </div>
  </div>
</template>
<script>
  import { XHeader, XButton, Group, Cell, XInput, Datetime } from 'vux'
  import { START_CODE } from '@/store/mutation-type'
  export default {
    data() {
      return {
        classes: this.$store.state.startCode.classes,
        productionDate: this.$store.state.startCode.productionDate,
        batchNo: this.$store.state.startCode.batchNo
      }
    },
    created() {
    },
    computed: {
    },
    methods: {
      back() {
        window.history.go(-1)
      },
      next() {
        if (!this.classes) {
          this.$vux.toast.show({
            text: '请输入班组',
            position: 'middle',
            type: 'text'
          })
          return
        }
        if (!this.productionDate) {
          this.$vux.toast.show({
            text: '请选择生成日期',
            position: 'middle',
            type: 'text'
          })
          return
        }
        if (!this.batchNo) {
          this.$vux.toast.show({
            text: '请输入批次号',
            position: 'middle',
            type: 'text'
          })
          return
        }
        let obj = this.$store.state.startCode
        obj.classes = this.classes
        obj.productionDate = this.productionDate
        obj.batchNo = this.batchNo
        obj.step = 5
        this.$store.commit(START_CODE, { obj: obj })
        this.$router.push({ name: 'preview' })
      }
    },
    components: {
      XHeader,
      XButton,
      Group,
      Cell,
      XInput,
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
