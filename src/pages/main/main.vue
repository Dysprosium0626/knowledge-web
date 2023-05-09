<template>
  <a-layout theme="light">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" theme="light" collapsible>
      <div class="logo">Knowledge</div>
      <a-menu v-model:selectedKeys="selectedKeys" mode="inline">
        <a-menu-item key="sub0" @click="toMe">
          <template #icon>
            <MailOutlined />
          </template>
          <span>个人中心</span>
        </a-menu-item>
        <a-menu-item key="sub1" @click="toUserCenter">
          <template #icon>
            <team-outlined />
          </template>
          <span>用户管理</span>
        </a-menu-item>

        <a-menu-item key="sub2" @click="toAudit">
          <template #icon>
            <security-scan-outlined />
          </template>
          <span>审核管理</span>
        </a-menu-item>

        <a-menu-item key="sub3" @click="toArtifact">
          <template #icon>
            <bar-chart-outlined />
          </template>
          <span>数据管理</span>
        </a-menu-item>
        <a-menu-item key="sub4" @click="toBackcup">
          <template #icon>
            <save-outlined />
          </template>
          <span>数据备份</span>
        </a-menu-item>
        <a-menu-item key="sub5" @click="toLog">
          <template #icon>
            <bar-chart-outlined />
          </template>
          <span>日志管理</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" class="a-header">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        <div class="header-avatar"><header-avatar /></div>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', minHeight: '860px' }">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import HeaderAvatar from "@/layouts/header/header-avatar.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const selectedKeys = ref(["1"]);
const collapsed = ref(false);

const toUserCenter = () => {
  router.push("/main/user");
};

const toAudit = () => {
  router.push("/main/audit");
};

const toArtifact = () => {
  router.push("/main/artifact");
};

const toLog = () => {
  router.push("/main/log");
};

const toBackcup = () => {
  router.push("/main/backup");
};

const toMe = () => {
  router.push("/main/me");
};
</script>
<style lang="less" scoped>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #e8ff18;
}

.logo {
  height: 32px;
  margin: 10px;
  margin-left: 10px;
  font-size: 23px;
  color: #ad7373;
  font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 600;
  position: relative;
}

.site-layout .site-layout-background {
  background: rgb(231, 17, 17);
}

.a-header {
  .header-avatar {
    float: right;
    display: flex;
    margin-right: 20px;
  }
}
</style>
