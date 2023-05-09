<template>
  <div>
    <a-layout-content
      :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '1080px' }"
    >
      <a-descriptions title="User Info">
        <a-descriptions-item label="UserName">{{ userData.user.username }}</a-descriptions-item>
        <a-descriptions-item label="Email">{{ userData.user.email }}</a-descriptions-item>
        <a-descriptions-item label="Gender">{{ userData.user.gender }}</a-descriptions-item>
        <a-descriptions-item label="IsAdmin">{{ userData.user.isAdmin }}</a-descriptions-item>
        <a-descriptions-item label="Description">
          {{ userData.user.description }}
        </a-descriptions-item>
      </a-descriptions>
    </a-layout-content>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { getUserById } from "@/service/user";
import { reactive } from "vue";

const router = useRouter();

var userData = reactive({
  user: {
    description: "",
    email: "1119493091@qq.com",
    gender: 0,
    id: "3",
    isAdmin: 0,
    username: "dy",
  },
});

const getUserByIdFromRouter = async () => {
  let id = router.currentRoute.value.params.id;
  console.log(id);
  let res = await getUserById(id);
  console.log(res.data.data);
};

onMounted(getUserByIdFromRouter);
</script>

<style></style>
