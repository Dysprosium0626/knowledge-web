<template>
  <a-dropdown>
    <div class="header-avatar" style="cursor: pointer">
      <a-avatar
        class="avatar"
        size="small"
        shape="circle"
        src="https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png"
      />
      <span class="name">test user</span>
    </div>
    <template #overlay>
      <a-menu :class="['avatar-menu']">
        <a-menu-item>
          <span>个人中心</span>
        </a-menu-item>
        <a-menu-item>
          <span>设置</span>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item @click="logout">
          <span>退出登录</span>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup>
import Cookies from "js-cookie";
import { useRouter } from "vue-router";
const router = useRouter();
const logout = () => {
  Cookies.remove("insider-token");
  router.push("/login");
};
</script>

<style lang="less" scoped>
.header-avatar {
  display: inline-flex;
  .avatar,
  .name {
    align-self: center;
  }
  .avatar {
    margin-right: 8px;
  }
  .name {
    font-weight: 500;
  }
}
.avatar-menu {
  width: 150px;
}
</style>
