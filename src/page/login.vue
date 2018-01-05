<template>
  <div class="c-login">
    <p style="font-size:20px;text-align:center;padding-top:25%;">手机号登录</p>
    <br><br>
    <group :gutter="0">
      <x-input :max="11" placeholder="请输入手机号" type="text" v-model="formData.uname"></x-input>
      <x-input :max="4" placeholder="请输入验证码" :type="pwdShow?'text':'password'" v-model="formData.password">
        <x-button slot="right" mini>获取验证码</x-button>
      </x-input>
    </group>
    <br>
    <x-button type="primary" class="c-login-btn">登录</x-button>
    <p class="c-bottom"><span>紧急冻结</span>|<span>联系客服</span></p>
  </div>
</template>

<script>
  import { JWT_TOKEN_HEAD, JWT_HEADER, CUSTOMER_SERVICE_TEL } from '@/components/constant'
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
          uname: '',
          password: '',
          openId: ''
        },
        loading: false,
        pwdShow: false,
        message: '',
        toast: false,
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
          await this.$http.post('/noIntercept/sessions', this.formData).then((response) => {
            localStorage.setItem(JWT_HEADER, JWT_TOKEN_HEAD + response.data.token)
            axios.defaults.headers.common[JWT_HEADER] = JWT_TOKEN_HEAD + response.data.token
            this.$vux.toast.show({
              text: '登录成功',
              position: 'middle',
              time: '1400'
            })
            setTimeout(() => {
              this.$router.push({
                name: 'quoteList'
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
      showPwd() {
        this.pwdShow ? this.pwdShow = false : this.pwdShow = true
      },
      validate() {
        if (this.formData.uname.trim() === '') {
          this.$vux.toast.show({
            text: '请输入用户名',
            type: 'text'
          })
          return false
        } else if (this.formData.password.trim() === '') {
          this.$vux.toast.show({
            text: '请输入密码',
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
    span {
      padding:0 10px;
    }
  }
}
</style>