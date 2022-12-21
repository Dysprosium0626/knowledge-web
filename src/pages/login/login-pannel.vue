<template>
  <common-layout>
    <div class="top">
      <div class="header">
        <span class="title">Insider</span>
      </div>
      <div class="desc">Insider 是人人喜用的工具</div>
    </div>
    <div class="login">
      <a-form :form="form">
        <a-tabs size="large" centered style="padding: 0 2px">
          <a-tab-pane tab="账户密码登录">
            <a-alert
              type="error"
              :closable="true"
              v-show="error"
              :message="error"
              showIcon
              style="margin-bottom: 24px"
            />
            <a-form-item>
              <a-input size="large" v-model:value="loginParam.username"> </a-input>
            </a-form-item>
            <a-form-item>
              <a-input-password size="large" type="password" v-model:value="loginParam.password">
              </a-input-password>
            </a-form-item>
          </a-tab-pane>
        </a-tabs>
        <a-form-item>
          <a-button
            style="width: 100%; margin-top: 24px"
            size="large"
            htmlType="submit"
            type="primary"
            @click="submitLogin"
            >登录</a-button
          >
        </a-form-item>
      </a-form>
    </div>
  </common-layout>
</template>

<script setup>
import CommonLayout from "@/layouts/CommonLayout";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { reactive } from "vue";
import Cookies from "js-cookie";
import { login } from "@/service/user";

const router = useRouter();
const loginParam = reactive({
  username: "",
  password: "",
});
const submitLogin = async () => {
  const res = await login(loginParam.username, loginParam.password);
  console.log(res.data);
  if (res.data.code == 200) {
    router.push("/main/table");
    Cookies.set("insider-token", "123123");
  } else {
    message.warn("登陆信息错误");
  }
};
</script>

<style lang="less" scoped>
.common-layout {
  .top {
    text-align: center;
    .header {
      height: 44px;
      line-height: 44px;
      a {
        text-decoration: none;
      }
      .logo {
        height: 44px;
        vertical-align: top;
        margin-right: 16px;
      }
      .title {
        font-size: 33px;
        color: #ad7373;
        font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica, sans-serif;
        font-weight: 600;
        position: relative;
        top: 2px;
      }
    }
    .desc {
      font-size: 14px;
      color: #ad7373;
      margin-top: 12px;
      margin-bottom: 40px;
    }
  }
  .login {
    width: 368px;
    margin: 0 auto;
    @media screen and (max-width: 576px) {
      width: 95%;
    }
    @media screen and (max-width: 320px) {
      .captcha-button {
        font-size: 14px;
      }
    }
    .icon {
      font-size: 24px;
      color: #ad7373;
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #ad7373;
      }
    }
  }
}
</style>
