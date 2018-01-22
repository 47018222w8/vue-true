<template>
  <div class="c-login">
    <p style="font-size:20px;text-align:center;padding-top:25%;">手机号登录</p>
    <br><br>
    <group :gutter="0">
      <x-input :max="11" placeholder="请输入手机号" type="tel" v-model="formData.mobile"></x-input>
      <x-input :max="4" placeholder="请输入验证码" type="tel" v-model="formData.code">
        <x-button slot="right" :disabled="codeDisabled" mini @click.native="getCode">{{codeText}}</x-button>
      </x-input>
    </group>
    <br>
    <x-button type="primary" class="c-login-btn" :show-loading="loading" :disabled="loading" @click.native="submitForm">登录</x-button>
    <p class="c-bottom">
      <span>紧急冻结</span>|
      <a :href="csTel">联系客服</a>
    </p>
  </div>
</template>

<script>
  import { JWT_TOKEN_HEAD, JWT_HEADER, CUSTOMER_SERVICE_TEL, RE_PHONE } from '@/components/constant'
  import { XInput, Group, XButton, Cell } from 'vux'
  import { QUOTE_LIST_KEEP_ALIVE } from '@/store/mutation-type'
  import axios from 'axios'
  export default {
    name: 'Login',
    components: {
      XInput,
      Group,
      XButton,
      Cell
    },
    data() {
      return {
        formData: {
          mobile: '',
          code: ''
        },
        codeText: '获取验证码',
        codeDisabled: false,
        loading: false,
        seconds: 60,
        tiemer: null,
        csTel: 'tel:' + CUSTOMER_SERVICE_TEL
      }
    },
    created() {
      let openId = localStorage.getItem('openId')
      localStorage.clear()
      if (openId) {
        localStorage.setItem('openId', openId)
        this.formData.openId = openId
      }
      this.$store.commit(QUOTE_LIST_KEEP_ALIVE, { keepAlive: false })
    },
    methods: {
      async submitForm() {
        if (this.validate() && !this.loading) {
          this.loading = true
          await this.$http.post('/noIntercept/sessions/login/' + this.formData.mobile + '/' + this.formData.code).then((response) => {
            localStorage.setItem(JWT_HEADER, JWT_TOKEN_HEAD + response.data.token)
            axios.defaults.headers.common[JWT_HEADER] = JWT_TOKEN_HEAD + response.data.token
            this.$vux.toast.show({
              text: '登录成功',
              position: 'middle',
              time: '1400'
            })
            setTimeout(() => {
              this.$router.push({
                name: 'home'
              })
            }, 1400)
          }).catch((error) => {
            let result = error.response
            result.status === 401 && this.$vux.alert.show({
              title: '提示',
              content: result.data.message
            })
            this.loading = false
          })
        }
      },
      async getCode() {
        if (RE_PHONE.test(this.formData.mobile)) {
          this.codeDisabled = true
          await this.$http.get('/noIntercept/sessions/code/' + this.formData.mobile + '/配件验真').then((response) => {
            this.countDown()
          })
        } else {
          this.$vux.toast.text('请输入正确的手机号', 'middle')
        }
      },
      countDown() {
        this.timer = setTimeout((e) => {
          this.seconds--
          if (this.seconds === 0) {
            clearTimeout(this.timer)
            this.codeDisabled = false
            this.codeText = '获取验证码短信'
            this.seconds = 60
          } else {
            this.codeText = this.seconds + '秒后获取验证码短信'
            this.countDown()
          }
        }, 1000)
      },
      validate() {
        if (!this.formData.mobile.trim()) {
          this.$vux.toast.show({
            text: '请输入手机号',
            type: 'text'
          })
          return false
        } else if (!this.formData.code.trim()) {
          this.$vux.toast.show({
            text: '请输入验证码',
            type: 'text'
          })
          return false
        } else {
          return true
        }
      }
    }

  }
</script>

<style lang="less">
@import "../styles/sup.less";
.c-login {
  height: 100%;
  background-color: #fff;
  .c-login-btn {
    width: 90%;
    border-radius: 21px;
  }
  .c-bottom {
    text-align: center;
    color: @s-primary-color;
    position: absolute;
    bottom: 20px;
    width: 100%;
    span,
    a {
      padding: 0 10px;
      color: @s-primary-color;
    }
  }
}
</style>