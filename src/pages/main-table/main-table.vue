<template>
  <a-layout-content
    :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '1080px' }"
  >
    <a-list
      item-layout="vertical"
      size="large"
      :pagination="{ ...pagination }"
      :data-source="newsData.news"
    >
      <template #footer>
        <div>@insider</div>
      </template>
      <template #renderItem="{ item }">
        <a-list-item key="item.title" :pageSizeOptions="[5, 10]">
          <template>
            <span v-for="{ type, text } in actions" :key="type">
              <component :is="type" style="margin-right: 8px" />
              {{ text }}
            </span>
          </template>
          <template #extra>
            <img width="272" height="153" alt="logo" v-if="item.cover != null" :src="item.cover" />
            <img
              width="272"
              height="153"
              alt="default cover"
              v-else-if="item.cover == null"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          </template>
          <a-list-item-meta :description="item.description">
            <template #title>
              <a @click="toNewsDetail(item.id)">{{ item.title }}</a>
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
import { onMounted, reactive } from "vue";
import { listNews } from "@/service/news";
import { useRouter } from "vue-router";

const router = useRouter();
var newsData = reactive({
  news: [],
});

const fetchAllNews = async () => {
  const res = await listNews();
  const news = res.data.data;
  console.log(news);
  news.forEach((news) => {
    newsData.news.unshift({
      id: news.newsInfoVo.id,
      href: "https://www.antdv.com/",
      title: news.newsInfoVo.title,
      avatar: news.userInfoVo.avatar,
      content: formatString(news.newsInfoVo.content),
      cover:
        news.newsInfoVo.cover != null
          ? decodeURIComponent(news.newsInfoVo.cover).slice(
              0,
              decodeURIComponent(news.newsInfoVo.cover).length - 1
            )
          : null,
    });
    console.log(decodeURIComponent(news.newsInfoVo.cover));
  });
  console.log(newsData.news);
};

const toNewsDetail = (newsId) => {
  router.push({ name: "news-detail", params: { id: newsId } });
};

const formatString = (str) => {
  str = str.replace(/^#+[^\n]*/gm, "");
  let regex = /!\[[^\]]*\]\([^)]*\)/g;
  str = str.replace(regex, "");
  if (str.indexOf("\n") > 0 && str.indexOf("\n") < 100) {
    str = str.slice(0, str.indexOf("\n"));
  } else if (str.length >= 100) {
    str = str.slice(0, 100) + "...";
  }
  console.log(str);
  return str;
};

onMounted(fetchAllNews);
</script>

<style lang="less" scoped></style>
