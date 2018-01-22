<template>
  <div class="c-part-type">
    <x-header class="" :left-options="{preventGoBack:true,showBack:false}" :right-options="{showMore:false}" @on-click-more="showMenus = true" title="条码启用">
      <div slot="overwrite-left" @click="back" class="c-left">
        <i slot="icon" class="fa fa-angle-left fa-lg" style="font-size:24px;"></i>&nbsp;返回
      </div>
    </x-header>
    <div class="c-body">
      <checklist :max="1" title="条码设置信息" v-model="result" @on-change="changeCheck" :options="list" label-position="left"></checklist>
    </div>
    <flexbox class="c-bottom">
      <flexbox-item style="text-align:center;">
        <x-button mini style="width:80%;" @click.native="next(1)">预览</x-button>
      </flexbox-item>
      <flexbox-item style="text-align:center;">
        <x-button type="primary" mini style="width:80%;" @click.native="next(0)">下一步</x-button>
      </flexbox-item>
    </flexbox>
  </div>
</template>
<script>
  import { XHeader, XButton, Flexbox, FlexboxItem, Divider, Group, Cell, Checklist } from 'vux'
  import { START_CODE } from '@/store/mutation-type'
  export default {
    data() {
      return {
        tabIndex: 0,
        result: [],
        label: '',
        list: []
      }
    },
    created() {
      this._initData()
    },
    computed: {
    },
    methods: {
      async _initData() {
        await this.$http.get('/list/goodsType/' + this.$store.state.startCode.companyId).then((response) => {
          response.data.forEach(item => {
            this.list.push({ key: item.goodsTypeId, value: item.goodsType })
          })
          if (this.$store.state.startCode.goodsTypeId) {
            this.result.push(this.$store.state.startCode.goodsTypeId)
          } else {
            this.result.push(this.list[0].key)
          }
          this.label = this.list[0].value
        })
      },
      changeCheck(value, label) {
        this.lable = label
      },
      showMenu1() {
        this.show1 = true
      },
      back() {
        window.history.go(-1)
      },
      clear() {
      },
      next(type) {
        if (!this.result.length) {
          this.$vux.toast.show({
            text: '请选择一条',
            position: 'middle',
            type: 'text'
          })
          return
        }
        let obj = this.$store.state.startCode
        obj.goodsTypeId = this.result[0]
        obj.goodsType = this.label
        obj.step = 3
        this.$store.commit(START_CODE, { obj: obj })
        type === 0 && this.$router.push({ name: 'codeD' })
        type === 1 && this.$router.push({ name: 'preview' })
      }
    },
    components: {
      XHeader,
      XButton,
      Flexbox,
      FlexboxItem,
      Divider,
      Group,
      Cell,
      Checklist
    }
  }
</script>
<style lang="less">
@import "../styles/sup.less";
.c-part-type {
  height: 100%;
  .c-body {
    height: calc(~"100vh - 50px - @{vux-header-height}");
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
  .c-bottom {
    border-top: 1px solid @s-hr-color;
    position: fixed;
    bottom: 0px;
    height: 50px;
  }
}
</style>
