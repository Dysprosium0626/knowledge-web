<template>
  <div class="login">
    <a-form
      ref="formRef"
      name="custom-validation"
      class="login-form"
      :model="formState"
      :rules="rules"
      v-bind="layout"
      @finish="handleFinish"
      @validate="handleValidate"
      @finishFailed="handleFinishFailed"
    >
      <h3 class="title">文物管理系统注册页面</h3>
      <div class="reg-input">
        <a-form-item
          :labelCol="{ span: 8 }"
          :wrapperCol="{ span: 12, offset: 3 }"
          label="Username"
          name="username"
          :rules="[{ required: true, message: 'Please enter your username!' }]"
        >
          <a-input v-model:value="formState.username"></a-input>
        </a-form-item>
        <a-form-item
          :labelCol="{ span: 8 }"
          :wrapperCol="{ span: 12, offset: 3 }"
          has-feedback
          label="Password"
          name="pass"
          :rules="[{ required: true, message: 'Please enter your password!' }]"
        >
          <a-input v-model:value="formState.pass" type="password" autocomplete="off" />
        </a-form-item>
        <a-form-item
          :labelCol="{ span: 8 }"
          :wrapperCol="{ span: 12, offset: 3 }"
          has-feedback
          label="Confirm"
          name="checkPass"
          :rules="[{ required: true, message: 'Please enter your password again!' }]"
        >
          <a-input v-model:value="formState.checkPass" type="password" autocomplete="off" />
        </a-form-item>
        <a-form-item
          has-feedback
          :wrapperCol="{ span: 12, offset: 3 }"
          :labelCol="{ span: 8 }"
          label="Email"
          name="email"
          :rules="[{ type: 'email' }]"
        >
          <a-input v-model:value="formState.email"></a-input>
        </a-form-item>
      </div>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <div class="reg-button">
          <a-button type="primary" html-type="submit" @click="handleRegister">Submit</a-button>
          <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
        </div>
      </a-form-item>
      Or
      <router-link :to="'/login'">login now!</router-link>
    </a-form>
  </div>
</template>
<script>
import { defineComponent, reactive, ref, toRaw } from "vue";
import { resgistry } from "@/service/user";
import router from "@/router";
import { message } from "ant-design-vue";

export default defineComponent({
  setup() {
    const formRef = ref();
    const visible = ref(false);
    const formState = reactive({
      username: "",
      pass: "",
      checkPass: "",
      email: "",
    });
    let checkAge = async (_rule, value) => {
      if (!value) {
        return Promise.reject("Please input the age");
      }
      if (!Number.isInteger(value)) {
        return Promise.reject("Please input digits");
      } else {
        if (value < 18) {
          return Promise.reject("Age must be greater than 18");
        } else {
          return Promise.resolve();
        }
      }
    };
    let validatePass = async (_rule, value) => {
      if (value === "") {
        return Promise.reject("Please input the password");
      } else {
        if (formState.checkPass !== "") {
          formRef.value.validateFields("checkPass");
        }
        return Promise.resolve();
      }
    };
    let validatePass2 = async (_rule, value) => {
      if (value === "") {
        return Promise.reject("Please input the password again");
      } else if (value !== formState.pass) {
        return Promise.reject("Two inputs don't match!");
      } else {
        return Promise.resolve();
      }
    };
    const rules = {
      pass: [
        {
          required: true,
          validator: validatePass,
          trigger: "change",
        },
      ],
      checkPass: [
        {
          validator: validatePass2,
          trigger: "change",
        },
      ],
      age: [
        {
          validator: checkAge,
          trigger: "change",
        },
      ],
    };
    const layout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
    };
    const handleFinish = (values) => {
      console.log(values, formState);
    };
    const handleFinishFailed = (errors) => {
      console.log(errors);
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };
    const handleValidate = (...args) => {
      console.log(args);
    };
    const onOk = () => {
      formRef.value
        .validateFields()
        .then((values) => {
          console.log("Received values of form: ", values);
          console.log("formState: ", toRaw(formState));
          visible.value = false;
          formRef.value.resetFields();
          console.log("reset formState: ", toRaw(formState));
        })
        .catch((info) => {
          console.log("Validate Failed:", info);
        });
    };

    const handleRegister = async () => {
      console.log(formState.username);
      console.log(formState.pass);
      console.log(formState.checkPass);
      console.log(formState.email);
      if (formState.pass != formState.checkPass) {
        message.warn("两次输入的密码不一致");
      } else if (formState.username.length <= 6 || formState.username.length >= 32) {
        message.warn("用户名长度为6-32个字符");
      } else {
        let res = await resgistry(formState.username, formState.pass, formState.email);
        let code = res.data.code;
        if (code == 200) {
          message.success("注册成功");
          router.push("/login");
        } else {
          message.error("注册失败");
        }
      }
    };

    const validateMessages = {
      required: "${label} is required!",
      types: {
        email: "${label} is not a valid email!",
        number: "${label} is not a valid number!",
      },
      number: {
        range: "${label} must be between ${min} and ${max}",
      },
    };

    return {
      formState,
      formRef,
      rules,
      layout,
      visible,
      onOk,
      handleFinishFailed,
      handleFinish,
      resetForm,
      handleValidate,
      handleRegister,
      validateMessages,
    };
  },
});
</script>
<style lang="scss">
.login {
  height: 100%;
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  // background-color:black;
  background-image: url("../../../public/login-background.jpg");
  background-size: cover;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}
.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 450px;
  padding: 25px 25px 5px 25px;
  .a-input {
    height: 38px;

    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-form-forgot {
  float: right;
}
.reg-input {
  align-items: center;
}
.reg-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: -20px;
}
.new-button {
  // float: right;
  width: 40%;
  margin-left: 90px;
}
</style>
<!-- export default defineComponent({
    components: {
      UserOutlined,
      LockOutlined,
    },
    setup() {
      const formState = reactive({
        username: "",
        password: "",
        remember: true,
      });
      const onFinish = (values) => {
        console.log("Success:", values);
      };
      const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
      };
      const disabled = computed(() => {
        return !(formState.username && formState.password);
      });
      return {
        formState,
        onFinish,
        onFinishFailed,
        disabled,
      };
    },
  });
</script>
<style lang="scss">
    .login {
        height: 100%;
        width: 100%;
        position: fixed; 
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        // background-color:black;
        background-image: url('../../../public/login-background.jpg');
        background-size: cover;
    }
    .title {
        margin: 0px auto 30px auto;
        text-align: center;
        color: #707070;
    }
    .login-form {
        border-radius: 6px;
        background: #ffffff;
        width: 400px;
        padding: 25px 25px 5px 25px;
        .a-input {
            height: 38px;
            input {
            height: 38px;
            }
        }
        .input-icon {
            height: 39px;
            width: 14px;
            margin-left: 2px;
        }
    }
    .login-form-forgot
    {
        float: right;
    }
    .login-form-button{
        width: 100%;
    }
</style>

  <style>
  #components-form-demo-normal-login .login-form {
    max-width: 300px;
  }
  #components-form-demo-normal-login .login-form-forgot {
    float: right;
  }
  #components-form-demo-normal-login .login-form-button {
    width: 100%;
  }
  </style> -->
