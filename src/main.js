import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//import { globalRegister } from "./global";
import Antd from "ant-design-vue";
import * as Icons from "@ant-design/icons-vue";
import "ant-design-vue/dist/antd.css";

import VueMarkdownEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/preview.css";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";
import Prism from "prismjs";
import hljs from "highlight.js";

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

const app = createApp(App);
// 开始使用全局图标导入
const icons = Icons;
for (const i in icons) {
  app.component(i, icons[i]); // 全局注册组件
}

app.use(Antd);
app.use(store).use(router).mount("#app");
app.use(VueMarkdownEditor);
app.use(VMdPreview);
