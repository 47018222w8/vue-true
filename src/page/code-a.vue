<template>
  <div class="c-code">
    <x-header :left-options="{preventGoBack:true,showBack:false}" :right-options="{showMore:false}" @on-click-more="showMenus = true" title="条码启用">
      <div slot="overwrite-left" @click="back" class="c-left">
        <i  class="fa fa-angle-left fa-lg" style="font-size:24px;"></i>&nbsp;返回
      </div>
    </x-header>
    <div class="c-body">
      <group :gutter="0">
        <cell v-for="(item, index) in list" :key="index">
          <flexbox slot="after-title">
            <flexbox-item :span="4">
              <p>组号:#{{item.groupNo}}</p>
            </flexbox-item>
            <flexbox-item :span="2">
              <x-input :show-clear="false" @on-change="cNum" :max="3" style="padding:0;border-bottom:1px solid #eee;" type="tel" v-model="item.startNum"></x-input>
            </flexbox-item>
            <flexbox-item :span="1">
              <p>至</p>
            </flexbox-item>
            <flexbox-item :span="2">
              <x-input :show-clear="false" @on-change="cNum" :max="3" style="padding:0;border-bottom:1px solid #eee;" type="tel" v-model="item.endNum"></x-input>
            </flexbox-item>
            <flexbox-item :span="1">
              <check-icon :value.sync="result[index]"></check-icon>
            </flexbox-item>
          </flexbox>
        </cell>
      </group>
    </div>
    <flexbox class="c-bottom">
      <flexbox-item >
        <p style="text-align:center;" class="s-p-desc">您选择了{{chooseNum}}组,共{{count}}张条码</p>
      </flexbox-item>
      <flexbox-item :span="4" style="text-align:right;">
        <div style="padding-right:10px;">
          <x-button type="primary" mini @click.native="next">开始启用</x-button>
        </div>
      </flexbox-item>
    </flexbox>
  </div>
</template>
<script>
  import { XHeader, XButton, Flexbox, FlexboxItem, Group, Cell, XInput, CheckIcon } from 'vux'
  import { START_CODE } from '@/store/mutation-type'
  export default {
    data() {
      return {
        result: [],
        list: [],
        listCopy: null,
        // 提交对象
        batch: [],
        // 总数
        count: 0
      }
    },
    created() {
      this._initData()
    },
    computed: {
      chooseNum() {
        let num = 0
        this.count = 0
        this.result.forEach((element, index) => {
          if (element) {
            this.count += this.list[index].endNum - this.list[index].startNum
            num++
          }
        })
        return num
      }
    },
    methods: {
      async _initData() {
        await this.$http.get('/list/pre/groupNo').then((response) => {
          this.list = response.data
          this.listCopy = JSON.parse(JSON.stringify(this.list))
          this.list.forEach(element => {
            this.result.push(false)
          })
        })
      },
      back() {
        this.$store.commit(START_CODE, { obj: { step: 0 } })
        this.$router.push({ name: 'home' })
      },
      // 计算共多少条
      cNum() {
        this.count = 0
        this.result.forEach((element, index) => {
          if (element) {
            this.count += this.list[index].endNum - this.list[index].startNum
          }
        })
      },
      next() {
        this.batch = []
        for (let i = 0; i < this.result.length; i++) {
          if (this.result[i]) {
            if (this.list[i].startNum < this.listCopy[i].startNum) {
              this.$vux.alert.show({
                title: '提示',
                content: '组号#' + this.list[i].groupNo + '起始号码不可以小于' + this.listCopy[i].startNum
              })
              return
            }
            if (this.list[i].endNum > this.listCopy[i].endNum) {
              this.$vux.alert.show({
                title: '提示',
                content: '组号#' + this.list[i].groupNo + '结束号码不可以大于' + this.listCopy[i].endNum
              })
              return
            }
            this.batch.push({ startNum: this.list[i].startNum, endNum: this.list[i].endNum, groupNo: this.list[i].groupNo })
          }
        }
        if (!this.batch.length) {
          this.$vux.toast.show({
            text: '请至少选择一组',
            position: 'middle',
            type: 'text'
          })
          return
        }
        this.$store.commit(START_CODE, { obj: { batch: this.batch, step: 1 } })
        this.$router.push({ name: 'codeB' })
      }
    },
    components: {
      XHeader,
      XButton,
      Flexbox,
      FlexboxItem,
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
