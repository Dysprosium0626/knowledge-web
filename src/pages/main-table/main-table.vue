<template>
  <a-layout-content
    :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '1080px' }"
  >
    <a-list
      item-layout="vertical"
      size="large"
      :pagination="{ ...pagination }"
      :data-source="listData"
    >
      <template #footer>
        <div>@insider</div>
      </template>
      <template #renderItem="{ item }">
        <a-list-item key="item.title" :pageSizeOptions="[5, 10]">
          <template #actions>
            <span v-for="{ type, text } in actions" :key="type">
              <component :is="type" style="margin-right: 8px" />
              {{ text }}
            </span>
          </template>
          <template #extra>
            <img
              width="272"
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          </template>
          <a-list-item-meta :description="item.description">
            <template #title>
              <a :href="item.href">{{ item.title }}</a>
            </template>
            <template #avatar><a-avatar :src="item.avatar" /></template>
          </a-list-item-meta>
          {{ item.content }}
        </a-list-item>
      </template>
    </a-list>
  </a-layout-content>
</template>

<script setup>
//import { StarOutlined, LikeOutlined, MessageOutlined } from "@ant-design/icons-vue";

const listData = [];

for (let i = 0; i < 23; i++) {
  listData.push({
    href: "https://www.antdv.com/",
    title: `这是咱们的一篇文章 ${i}`,
    avatar: "https://gitlab.userly.cn/uploads/-/system/user/avatar/6/avatar.png",
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  });
}

const pagination = {
  onChange: (page) => {
    console.log(page);
  },
  pageSize: 10,
};
const actions = [{ type: "LikeOutlined", text: "156" }];
</script>

<style lang="less" scoped></style>
