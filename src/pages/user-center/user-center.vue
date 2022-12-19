<template>
  <div>
    <a-layout-content
      :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '1080px' }"
    >
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="我的信息">
          <a-avatar :size="64" :src="userInfo.avatar" />

          <a-upload
            name="files"
            :multiple="false"
            :action="`http://110.42.187.29:8081/files/avatars/${userInfo.id}`"
            :headers="headers"
            @change="handleChange"
            method="post"
          >
            <a-button>
              <upload-outlined></upload-outlined>
              Click to Upload
            </a-button>
          </a-upload>
          <a-row>
            <a-col :span="12">
              <a-statistic title="粉丝数" :value="userInfo.fansCount" style="margin-right: 50px" />
            </a-col>
            <a-col :span="12">
              <a-statistic title="关注数" :value="userInfo.subscriberCount" />
            </a-col>
          </a-row>
          <a-divider />
          <a-descriptions title="用户详情">
            <a-descriptions-item label="用户名">{{ userInfo.username }}</a-descriptions-item>
            <a-descriptions-item label="电子邮件">{{ userInfo.email }}</a-descriptions-item>
            <a-descriptions-item label="性别" v-if="userInfo.gender">男</a-descriptions-item>
            <a-descriptions-item label="性别" v-if="!userInfo.gender">女</a-descriptions-item>
            <a-descriptions-item label="生日">{{ userInfo.birthday }}</a-descriptions-item>
          </a-descriptions>
          <a-button type="Primary" @click="showDrawer">更新信息</a-button>
        </a-tab-pane>
        <a-tab-pane key="2" tab="我的新闻" force-render>
          <a-list
            item-layout="vertical"
            size="large"
            :pagination="{ ...pagination }"
            :data-source="userData.news"
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
                    height="153"
                    alt="logo"
                    v-if="item.cover != null"
                    :src="item.cover"
                  />
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
                    <a :href="item.href">{{ item.title }}</a>
                  </template>
                  <template #avatar><a-avatar :src="item.avatar" /></template>
                </a-list-item-meta>
                {{ item.content }}
              </a-list-item>
            </template>
          </a-list>
        </a-tab-pane>

        <a-tab-pane key="3" tab="个人认证">
          <CheckCircleTwoTone twoToneColor="#52c41a" v-if="userInfo.isVerified" />
          <span v-if="userInfo.isVerified"> 个人认证成功 </span>
          <CheckCircleTwoTone twoToneColor="#eb2f96" v-if="!userInfo.isVerified" />
          <span v-if="!userInfo.isVerified"> 个人认证未成功 </span>
          <a-button :disabled="userInfo.isVerified">个人认证</a-button>
          <a-form>
            <a-form-item>
              <a-input placeholder="姓名">
                <template><UserOutlined /></template>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input placeholder="证件号码">
                <template><LockOutlined /></template>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit"> 提交个人认证 </a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
      </a-tabs>
      <a-drawer
        title="更新用户信息"
        :width="720"
        :visible="visible"
        :body-style="{ paddingBottom: '80px' }"
        @close="onClose"
      >
        <a-form :model="form" :rules="rules" layout="vertical">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="用户名" name="name">
                <a-input
                  placeholder="请输入用户名"
                  :defaultValue="userInfo.username"
                  v-model="userInfo.username"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="电子邮件" name="email">
                <a-input
                  style="width: 100%"
                  placeholder="请输入电子邮件"
                  :defaultValue="userInfo.email"
                  v-model="userInfo.email"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="性别" name="gender">
                <a-select
                  placeholder="请选择性别"
                  :defaultValue="String(userInfo.gender)"
                  v-model="userInfo.gender"
                >
                  <a-select-option value="1">男</a-select-option>
                  <a-select-option value="0">女</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="生日" name="dateTime">
                <a-date-picker
                  style="width: 100%"
                  :get-popup-container="(trigger) => trigger.parentNode"
                  :defaultValue="moment(userInfo.birthday)"
                  v-model="userInfo.birthday"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item label="个人签名" name="description">
                <a-textarea :rows="4" placeholder="请输入个人签名" v-model="userInfo.description" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-button type="Primary" @click="handleUpdateUserInfo">确认</a-button>
        </a-form>
        <div
          :style="{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right',
            zIndex: 1,
          }"
        >
          <a-button style="margin-right: 8px" @click="onClose">Cancel</a-button>
          <a-button type="primary" @click="onClose">Submit</a-button>
        </div>
      </a-drawer>
    </a-layout-content>
  </div>
</template>

<script setup>
import { message } from "ant-design-vue";
import { onMounted, reactive, ref } from "vue";
import { getUserDetail, updateUserInfo } from "@/service/user";
import { listNews } from "@/service/news";
import moment from "moment";
var userData = reactive({
  news: [],
  fileList: [],
});

let userInfo = ref({
  id: "",
  username: "",
  description: "",
  email: "",
  gender: 0,
  birthday: moment(),
  avatar: "",
  isVerified: 0,
  fansCount: 0,
  subscriberCount: 0,
});

const visible = ref(false);

const showDrawer = () => {
  visible.value = true;
};

const onClose = () => {
  visible.value = false;
};

const getUserDetailFunction = async () => {
  const res = await getUserDetail();
  const user = res.data.data;
  user.birthday = moment(user.birthday).format("YYYY-MM-DD");
  userInfo.value.id = user.id;
  userInfo.value.username = user.username;
  userInfo.value.description = user.description;
  userInfo.value.email = user.email;
  userInfo.value.gender = user.gender;
  userInfo.value.birthday = user.birthday;
  userInfo.value.avatar = user.avatar;
  userInfo.value.isVerified = user.isVerified;
  userInfo.value.fansCount = user.fansCount;
  userInfo.value.subscriberCount = user.subscriberCount;
  console.log(user);
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
  return str;
};

// const uploadFile = (fileInfo) => {
//   console.log(fileInfo);
//   const formData = new FormData();
//   formData.append("files", fileInfo.file);
//   updateUserAvatar(userInfo.id, formData);
// };

const fetchAllNews = async () => {
  const res = await listNews();
  const news = res.data.data;
  news.forEach((news) => {
    console.log(news);
    userData.news.unshift({
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
  });
};

const handleUpdateUserInfo = async () => {
  console.log(userInfo.value);
  let req = {
    id: userInfo.value.id,
    username: userInfo.value.username,
    description: userInfo.value.description,
    email: userInfo.value.email,
    gender: userInfo.value.gender,
    birthday: userInfo.value.birthday,
  };
  console.log(req);
  let res = await updateUserInfo(2, req);
  console.log(res);
  // if (res.status == 200) {
  //   window.location.reload();
  //   success();
  // } else {
  //   error();
  // }
};

const handleChange = (info) => {
  if (info.file.status !== "uploading") {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === "done") {
    message.success(`${info.file.name} file uploaded successfully`);
  } else if (info.file.status === "error") {
    message.error(`${info.file.name} file upload failed.`);
  }
};

// const success = () => {
//   message.success("This is a success message");
// };
// const error = () => {
//   message.error("This is an error message");
// };
// const warning = () => {
//   message.warning("This is a warning message");
// };

onMounted(fetchAllNews);
onMounted(getUserDetailFunction);
</script>

<style></style>
