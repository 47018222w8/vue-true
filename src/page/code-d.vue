<template>
  <div class="c-part">
    <search @on-focus="showIndex = 1" placeholder="零件号 零件名 适用车型 产品品牌" @on-cancel="showIndex = 0" @on-change="search" :autoFixed="false">
      <div slot="left" @click="back">
        <i class="fa fa-angle-left fa-lg" style="font-size:24px;color:#2196f3;"></i>&nbsp;&nbsp;&nbsp;&nbsp;</div>
    </search>
    <div class="c-body" >
      <div class="c-title" v-show="showIndex === 0">
        <p style="color:black;">请选择需要绑定的产品</p>
        <p style="font-size:12px;">您可以通过搜索框进行搜索,以便您快速定位产品</p>
      </div>
      <group :gutter="0" v-show="showIndex === 0">
        <checklist @on-change="changeCheck" :max="1" v-model="result" :options="list" label-position="left"></checklist>
      </group>
      <group :gutter="0" v-show="showIndex === 1">
        <checklist @on-change="changeCheck" :max="1" v-model="result" :options="searchList" label-position="left"></checklist>
      </group>
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
  import { XHeader, XButton, ButtonTab, ButtonTabItem, Flexbox, FlexboxItem, Divider, Group, Cell, XInput, Search, CheckIcon, Checklist } from 'vux'
  import { START_CODE } from '@/store/mutation-type'
  export default {
    data() {
      return {
        list: [],
        searchList: [],
        result: [],
        showIndex: 0,
        label: this.$store.state.startCode.goodsType,
        show1: false
      }
    },
    created() {
      this.label = this.$store.state.startCode.goodsType
      this._initData()
    },
    computed: {
    },
    methods: {
      async _initData() {
        await this.$http.get('/list/goodsCarCode/' + this.$store.state.startCode.goodsTypeId).then((response) => {
          response.data.forEach(item => {
            this.list.push({
              key: item.carCodeId,
              value: item.codeName,
              inlineDesc: this.label + '\n' + item.carModel,
              label: item.label,
              carModel: item.carModel,
              all: item.codeName + this.label + item.carModel
            })
          })
          if (this.$store.state.startCode.carCodeId) {
            this.result.push(this.$store.state.startCode.carCodeId)
          } else {
            this.result.push(this.list[0].key)
          }
        })
      },
      changeCheck(value, label) {
        this.codeName = this.label
      },
      back() {
        window.history.go(-1)
      },
      search(value) {
        this.searchList = []
        value && this.list.forEach((item) => {
          item.all.indexOf(value.toUpperCase()) !== -1 && this.searchList.push(item)
        })
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
        obj.carCodeId = this.result[0]
        obj.step = 4
        for (let i = 0; i < this.list.length; i++) {
          if (this.result[0] === this.list[i].key) {
            obj.codeName = this.list[i].value
            obj.carModel = this.list[i].carModel
            break
          }
        }
        this.$store.commit(START_CODE, { obj: obj })
        type === 0 && this.$router.push({ name: 'codeE' })
        type === 1 && this.$router.push({ name: 'preview' })
      }
    },
    components: {
      Checklist,
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
  .vux-label-desc {
    white-space: pre;
  }
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
