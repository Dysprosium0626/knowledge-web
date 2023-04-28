<template>
  <a-layout-content
    :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '1080px' }"
  >
    <a-table
      :columns="columns"
      :data-source="visibleData"
      :scroll="{ y: 'calc(100vh - 200px)' }"
      @scroll="handleScroll"
    >
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'name'">{{ text.first }} {{ text.last }}</template>
      </template>
    </a-table>
  </a-layout-content>
</template>
<script setup>
import { onMounted, ref, computed } from "vue";
import { getAllUsers } from "@/service/user";
import { reactive } from "vue";

const pageSize = 20;
var userData = reactive({
  users: [],
});

const fetchAllUsers = async () => {
  const res = await getAllUsers();
  console.log(res);
  let userList = res.data.data;
  userList.forEach((user) => {
    console.log(user);
    userData.users.push(user);
  });
};

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    sorter: true,
    width: "20%",
  },
  {
    title: "Username",
    dataIndex: "username",
    width: "20%",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
];

var start = ref(0);
var end = ref(pageSize);

const visibleData = computed(() => {
  return userData.users.slice(start.value, end.value);
});

const handleScroll = (event) => {
  const { target } = event;
  const bottomReached = target.scrollHeight - target.scrollTop === target.clientHeight;
  if (bottomReached) {
    start.value += pageSize;
    end.value += pageSize;
  }
};

onMounted(fetchAllUsers);
</script>
<style lang="less" scoped></style>
