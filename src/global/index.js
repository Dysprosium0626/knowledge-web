import registerElement from "./register-ant-design";

export function globalRegister(app) {
  app.use(registerElement);
}
