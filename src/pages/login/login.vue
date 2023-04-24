<template>
  <common-layout>
    <div class="top">
      <div class="header">
        <span class="title">Knowledge</span>
      </div>
      <div class="desc">Knowledge后台管理子系统</div>
    </div>
    <div class="login">
      <a-form :model="formState" name="basic" autocomplete="off">
        <a-form-item
          label="Username"
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item name="remember">
          <a-checkbox>Remember me</a-checkbox>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit" @click="onClick">Submit</a-button>
        </a-form-item>
      </a-form>
    </div>
  </common-layout>
</template>

<script setup>
import { message } from "ant-design-vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const formState = reactive({
  username: "",
  password: "",
  remember: true,
});

const onClick = () => {
  console.log(formState.username);
  console.log(formState.password);
  if (formState.username == "123" && formState.password == "123") {
    message.success("successfully login");
    router.push("/main/table");
  } else {
    message.error("invalid username or password");
  }
};

// const onClickButton = () => {
//   // TODO modify the validation into api calls
//   if (formState.username == "123" && formState.password == "123") {
//     message.success("successfully login");
//     router.push("/main/table");
//   } else {
//     message.warn("invalid username or password");
//   }
// };
</script>

<style lang="less" scoped>
.top {
  text-align: center;
  .header {
    height: 44px;
    line-height: 44px;
    a {
      text-decoration: none;
    }

    .title {
      font-size: 48px;
      color: #ad7373;
      font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica, sans-serif;
      font-weight: 600;
      position: relative;
      top: 2px;
    }
  }
  .desc {
    font-size: 20px;
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
}
</style>
