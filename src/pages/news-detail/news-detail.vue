<template>
  <div>
    <a-layout-content
      :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '1080px' }"
    >
      <a-typography-title>{{ newsData.news.title }}</a-typography-title>
      <v-md-preview :text="newsData.news.content"></v-md-preview>
      <span key="comment-basic-like">
        <a-tooltip title="Like">
          <template v-if="action === 'liked'">
            <LikeFilled @click="like" />
          </template>
          <template v-else>
            <LikeOutlined @click="like" />
          </template>
        </a-tooltip>
        <span style="padding-left: 8px; cursor: auto">
          {{ likes }}
        </span>
      </span>
      <span key="comment-basic-dislike">
        <a-tooltip title="Dislike">
          <template v-if="action === 'disliked'">
            <DislikeFilled @click="dislike" />
          </template>
          <template v-else>
            <DislikeOutlined @click="dislike" />
          </template>
        </a-tooltip>
      </span>
      <a-list
        v-if="newsData.comments.length"
        :data-source="newsData.comments"
        :header="`${newsData.comments.length} ${
          newsData.comments.length > 1 ? 'replies' : 'reply'
        }`"
        item-layout="horizontal"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <a-comment
              :author="item.username"
              :avatar="item.avatar"
              :content="item.content"
              :datetime="item.createdTime"
            />
          </a-list-item>
        </template>
      </a-list>
      <a-comment>
        <template #avatar>
          <a-avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        </template>
        <template #content>
          <a-form-item>
            <a-textarea :rows="4" v-model:value="newsData.addCommentContent" />
          </a-form-item>
          <a-form-item>
            <a-button
              html-type="submit"
              :loading="submitting"
              type="primary"
              @click="submitComment"
            >
              发表评论
            </a-button>
          </a-form-item>
        </template>
      </a-comment>
    </a-layout-content>
  </div>
</template>

<script setup>
import { LikeFilled, LikeOutlined, DislikeFilled, DislikeOutlined } from "@ant-design/icons-vue";
import { onMounted, reactive, ref } from "vue";
import { getNewsDetail, getNewsComments, likeNews, addComment } from "@/service/news";
import { useRouter } from "vue-router";
const router = useRouter();

var newsData = reactive({
  news: {
    title: "",
    content: "",
    likesCount: 0,
  },
  comments: [],
  addCommentContent: "",
});

let likes = ref(0);
let dislikes = ref(0);
let action = ref();

const getNews = async () => {
  const res = await getNewsDetail(router.currentRoute.value.params.id);
  const news = res.data.data;
  console.log(news);
  newsData.news.title = news.newsInfoVo.title;
  newsData.news.content = news.newsInfoVo.content;
  newsData.news.likesCount = news.newsInfoVo.likesCount;
  likes = newsData.news.likesCount;
};

const listNewsComments = async () => {
  const res = await getNewsComments(router.currentRoute.value.params.id);
  const comments = res.data.data;
  comments.forEach((comment) => {
    newsData.comments.push({
      username: comment.userInfoVo.username,
      avatar: comment.userInfoVo.avatar,
      content: comment.commentInfoVo.commentContent,
      createdTime: comment.commentInfoVo.createdTime.slice(0, 10),
    });
  });
};

const like = async () => {
  likes.value = newsData.news.likesCount + 1;
  await likeNews(2, router.currentRoute.value.params.id);
  action.value = "liked";
};

const dislike = () => {
  likes.value = newsData.news.likesCount;
  dislikes.value = 1;
  action.value = "disliked";
};

const submitComment = async () => {
  await addComment(2, router.currentRoute.value.params.id, newsData.addCommentContent);
  window.location.reload();
};

onMounted(listNewsComments);
onMounted(getNews);
</script>

<style></style>
