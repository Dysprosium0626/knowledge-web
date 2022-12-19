<template>
  <div>
    <a-layout-content
      :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '1080px' }"
    >
      <a-form>
        <a-form-item :name="['user', 'title']" label="标题">
          <a-input v-model:value="formState.news.title" />
        </a-form-item>
      </a-form>
      <v-md-editor
        v-model="formState.text"
        height="400px"
        left-toolbar="undo redo | image"
        :disabled-menus="[]"
        @upload-image="handleUploadImage"
      ></v-md-editor>
      <a-form-item>
        <a-button type="primary" html-type="submit" @click="publishNewNews">发布</a-button>
      </a-form-item>
    </a-layout-content>
  </div>
</template>

<script setup>
import { message } from "ant-design-vue";
import { onMounted, reactive } from "vue";
import { publishNews, uploadFile, updateNewsCover } from "@/service/news";
import { getUserDetail } from "@/service/user";
import { insertFile } from "@/service/file";
import { useRouter } from "vue-router";

const router = useRouter();
const formState = reactive({
  news: {
    id: "",
    title: "",
    content: "",
  },
  user: {
    id: "",
    username: "",
    description: "",
    email: "",
    gender: 0,
    birthday: "",
    avatar: "",
    isVerified: 0,
    fansCount: 0,
    subscriberCount: 0,
  },
  activeKey: "1",
  text: "",
  firstPic: "",
  firstPicFlag: true,
});

const error = (msg) => {
  message.error(msg);
};

const getUserDetailFunction = async () => {
  const res = await getUserDetail();
  const user = res.data.data;
  user.birthday = `${user.birthday.slice(0, 9)}${parseInt(user.birthday[9]) + 1}`;
  formState.user = user;
};

const publishNewNews = async () => {
  if (formState.text == "" || formState.news.title == "") {
    error("请输入新闻标题和正文");
    return;
  }
  let res = await publishNews(formState.news.title, formState.text);
  const news = res.data.data;
  console.log(news);
  if (formState.firstPicFlag === false) {
    await updateNewsCover(news.id, formState.firstPic);
  }
  router.push("/main/table");
};

const handleUploadImage = async (event, insertImage, files) => {
  // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
  let form = new FormData();
  form.append("files", files[0]);
  let res = await uploadFile(form);
  console.log(res.data.data);
  let fileMeta = await insertFile(res.data.data);
  if (formState.firstPicFlag === true) {
    formState.firstPic = fileMeta.data.data.id;
    formState.firstPicFlag = false;
  }
  console.log(formState.firstPic);
  // 此处只做示例
  insertImage({
    url: res.data.data,
    // width: 'auto',
    // height: 'auto',
  });
};

onMounted(getUserDetailFunction);
</script>

<style></style>
