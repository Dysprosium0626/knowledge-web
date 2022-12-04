import { createStore, useStore as useVuexStore } from "vuex";

const store = createStore({
  state() {
    return {
      name: "coderwhy",
      userInfo: {},
    };
  },
  getters: {},
  mutations: {
    changeUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
  },
  actions: {},
  modules: {},
});
export function useStore() {
  return useVuexStore();
}
export default store;
