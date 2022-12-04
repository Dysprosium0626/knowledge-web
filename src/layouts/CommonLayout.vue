<template>
  <div class="common-layout">
    <div class="content"><slot></slot></div>
  </div>
</template>

<script></script>

<style scoped lang="less">
.common-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background-color: #f0f2f5;
  background-image: url("https://img-blog.csdnimg.cn/20210615083912766.png");
  background-repeat: repeat;
  background-position-x: center;
  background-position-y: 10px;
  background-size: 120%;
  .content {
    padding: 32px 0;
    flex: 1;
    @media (min-width: 768px) {
      padding: 112px 0 24px;
    }
  }
}
</style>
