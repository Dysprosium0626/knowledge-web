import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//import { globalRegister } from "./global";
import Antd from "ant-design-vue";
import * as Icons from "@ant-design/icons-vue";
import "ant-design-vue/dist/antd.css";
const app = createApp(App);
// 开始使用全局图标导入
const icons = Icons;
for (const i in icons) {
  app.component(i, icons[i]); // 全局注册组件
}

app.use(Antd);
app.use(store).use(router).mount("#app");
