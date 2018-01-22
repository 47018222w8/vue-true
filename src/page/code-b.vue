<template>
  <div class="c-company" v-if="company">
    <x-header class="" :left-options="{preventGoBack:true,showBack:false}" :right-options="{showMore:false}" @on-click-more="showMenus = true" title="条码启用">
      <div slot="overwrite-left" @click="back" class="c-left">
        <i slot="icon" class="fa fa-angle-left fa-lg" style="font-size:24px;"></i>&nbsp;返回
      </div>
    </x-header>
    <div class="c-body">
      <p class="c-title">请选择需要绑定的公司信息</p>
      <group :gutter="0">
        <cell title="集团信息" :value="company.companyName"></cell>
        <cell title="生产公司" :value="son" is-link @click.native="show1 = true"></cell>
        <cell title="公司地址" :value="company.address"></cell>
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
    <actionsheet v-model="show1" :menus="menus" @on-click-menu="chooseSon"></actionsheet>
  </div>
</template>
<script>
  import { XHeader, XButton, ButtonTab, ButtonTabItem, Flexbox, FlexboxItem, Divider, Group, Cell, XInput, Actionsheet } from 'vux'
  import { START_CODE } from '@/store/mutation-type'
  export default {
    data() {
      return {
        company: null,
        companyId: null,
        show1: false,
        son: this.$store.state.startCode.son,
        menus: []
      }
    },
    created() {
      this._initData()
    },
    computed: {
    },
    methods: {
      async _initData() {
        await this.$http.get('/infos/company').then((response) => {
          this.company = response.data
          this.company.subCompany.forEach(item => {
            this.menus.push({
              label: item.companyName,
              value: item.companyId
            })
          })
          this.companyId = this.menus[0].value
          !this.$store.state.startCode.son ? this.son = this.menus[0].label : this.son = this.$store.state.startCode.son
        })
      },
      chooseSon(menuKey, menuItem) {
        this.son = menuItem.label
      },
      back() {
        window.history.go(-1)
      },
      next(type) {
        let obj = this.$store.state.startCode
        obj.companyId = this.companyId
        obj.companyName = this.company.companyName
        obj.address = this.company.address
        obj.son = this.son
        obj.step = 2
        this.$store.commit(START_CODE, { obj: obj })
        type === 0 && this.$router.push({ name: 'codeC' })
        type === 1 && this.$router.push({ name: 'preview' })
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
