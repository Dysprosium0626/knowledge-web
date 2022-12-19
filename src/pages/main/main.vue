<template>
  <a-layout theme="light">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" theme="light" collapsible>
      <div class="logo">Insider</div>
      <a-menu v-model:selectedKeys="selectedKeys" mode="inline">
        <a-button type="primary" @click="toPublishNews">发布新闻</a-button>
        <a-menu-item key="sub12" @click="toMainPage">
          <template #icon>
            <MailOutlined />
          </template>
          <span>首页</span>
        </a-menu-item>

        <a-menu-item key="sub1" @click="toUserCenter">
          <template #icon>
            <video-camera-outlined />
          </template>
          <span>个人中心</span>
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
import { VideoCameraOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import HeaderAvatar from "@/layouts/header/header-avatar.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const selectedKeys = ref(["1"]);
const collapsed = ref(false);

const toMainPage = () => {
  router.push("/main/table");
};

const toUserCenter = () => {
  router.push("/main/user-center");
};

const toPublishNews = () => {
  router.push("/main/publish-news");
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
  color: #18ff56;
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
