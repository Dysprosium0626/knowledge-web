import "ant-design-vue/dist/antd.css";
import { Button, Form } from "ant-design-vue";

const components = [Button, Form];

export default function (app) {
  for (const component of components) {
    app.component(component.name, component);
  }
}
