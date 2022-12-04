<template>
  <a-config-provider :locale="zhCN">
    <div class="app">
      <router-view></router-view>
    </div>
  </a-config-provider>
</template>

<script setup>
import zhCN from "ant-design-vue/es/locale/zh_CN";
</script>
<style lang="less"></style>
