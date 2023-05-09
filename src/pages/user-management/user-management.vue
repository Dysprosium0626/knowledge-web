<template>
  <a-layout-content
    :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '1080px' }"
  >
    <!-- 增删改查操作 -->
    <div style="margin-bottom: 20px">
      <a-button style="margin-right: 5px" :disabled="!hasSelected" @click="handleDelete"
        >删除</a-button
      >
      <!-- 新增卡片 -->
      <a-popover title="用户信息" trigger="click">
        <template #content>
          <a-form v-bind="layout">
            <a-form-item label="用户名" :rules="[{ required: true }]">
              <a-input v-model:value="userData.add_user.username" />
            </a-form-item>
            <a-form-item label="密码" :rules="[{ required: true }]">
              <a-input v-model:value="userData.add_user.password" type="password" />
            </a-form-item>
            <a-form-item label="Email" :rules="[{ type: 'email' }]">
              <a-input v-model:value="userData.add_user.email" />
            </a-form-item>
            <a-form-item label="Admin">
              <a-radio-group v-model:value="userData.add_user.isAdmin">
                <a-radio :value="0">是</a-radio>
                <a-radio :value="1">否</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="性别">
              <a-radio-group v-model:value="userData.add_user.gender">
                <a-radio :value="0">男</a-radio>
                <a-radio :value="1">女</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="简介">
              <a-input v-model:value="userData.add_user.description" />
            </a-form-item>
          </a-form>
          <a-button @click="handleAddUser" style="margin-left: 70px" type="primary"
            >确定新增</a-button
          >
        </template>
        <a-button style="margin-right: 5px">增加</a-button>
      </a-popover>

      <!-- 修改卡片 -->
      <a-popover title="用户信息" trigger="click">
        <template #content>
          <a-form v-bind="layout">
            <a-form-item label="用户名" :rules="[{ required: true }]">
              <a-input v-model:value="userData.current_user.username" />
            </a-form-item>
            <a-form-item label="密码" :rules="[{ required: true }]">
              <a-input v-model:value="userData.current_user.password" type="password" />
            </a-form-item>
            <a-form-item label="Email" :rules="[{ type: 'email' }]">
              <a-input v-model:value="userData.current_user.email" />
            </a-form-item>
            <a-form-item label="Admin">
              <a-radio-group v-model:value="userData.current_user.isAdmin">
                <a-radio :value="0">是</a-radio>
                <a-radio :value="1">否</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="性别">
              <a-radio-group v-model:value="userData.current_user.gender">
                <a-radio :value="0">男</a-radio>
                <a-radio :value="1">女</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="简介">
              <a-input v-model:value="userData.current_user.description" />
            </a-form-item>
          </a-form>
          <a-button @click="handleUpdateUser" style="margin-left: 70px" type="primary"
            >确定修改</a-button
          >
        </template>
        <a-button style="margin-right: 5px" :disabled="!hasSelected">修改</a-button>
      </a-popover>
    </div>

    <!-- 表格 -->
    <a-table
      :columns="columns"
      :data-source="userData.users"
      :scroll="{ x: 1500, y: 1000 }"
      :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }"
      :row-key="(record) => record.id"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex == 'gender'">{{
          record.gender == 0 ? "男" : "女"
        }}</template>
        <template v-if="column.dataIndex == 'isAdmin'">{{
          record.isAdmin == 0 ? "是" : "否"
        }}</template>
        <template v-else-if="column.dataIndex === 'permission'">
          <a-popover title="用户权限" trigger="click">
            <template #content>
              <a-typography-text style="margin-right: 5px">登录</a-typography-text>
              <a-switch
                style="margin-right: 5px"
                v-model:checked="userData.current_permission.canLogin"
              />
              <a-typography-text style="margin-right: 5px">点赞</a-typography-text>
              <a-switch
                style="margin-right: 5px"
                v-model:checked="userData.current_permission.canLike"
              />
              <a-typography-text style="margin-right: 5px">评论</a-typography-text>
              <a-switch
                style="margin-right: 5px"
                v-model:checked="userData.current_permission.canComment"
              />
              <div></div>
              <a-button class="modify" @click="handleUpdateUserPermission">确定修改</a-button>
            </template>
            <a-button @click="getUserPermission(record.id)">查看权限</a-button>
          </a-popover>
        </template>
      </template>
    </a-table>
  </a-layout-content>
</template>

<script setup>
import { onMounted, computed } from "vue";
import {
  getAllUsers,
  getUserPermissionById,
  updateUserPermission,
  deleteUserById,
  updateUser,
  addUser,
} from "@/service/user";
import { reactive } from "vue";
import { message } from "ant-design-vue";

// 静态数据端
var userData = reactive({
  users: [],
  current_permission: {
    userId: "3",
    canLogin: false,
    canLike: false,
    canComment: false,
  },
  current_user: {
    id: "7",
    username: "b",
    password: "",
    email: "b",
    isAdmin: 0,
    description: "Please change the default description...",
    gender: 0,
  },
  add_user: {
    username: "",
    password: "",
    email: "",
    isAdmin: 0,
    description: "",
    gender: 0,
  },
});

const fetchAllUsers = async () => {
  const res = await getAllUsers();
  let userList = res.data.data;
  userList.forEach((user) => {
    userData.users.push(user);
  });
};

const getUserPermission = async (id) => {
  let res = await getUserPermissionById(id);
  let data = res.data.data;
  userData.current_permission.userId = data.userId;
  userData.current_permission.canLogin = data.canLogin == 0 ? false : true;
  userData.current_permission.canLike = data.canLike == 0 ? false : true;
  userData.current_permission.canComment = data.canComment == 0 ? false : true;
};

const handleUpdateUserPermission = async () => {
  let res = await updateUserPermission(userData.current_permission);
  let code = res.data.code;
  if (code == 200) {
    message.success("更新用户权限成功");
  } else {
    message.error("更新用户权限失败");
  }
};

const handleDelete = async () => {
  let result = true;
  state.selectedRowKeys.forEach(async (item) => {
    console.log(item);
    let res = await deleteUserById(item);

    let code = res.data.code;
    if (code != 200) {
      result = false;
    }
  });
  if (result != false) {
    message.success("删除用户成功");
    window.location.reload();
  } else {
    message.error("删除用户失败");
  }
};

const handleUpdateUser = async () => {
  let res = await updateUser(userData.current_user);
  let code = res.data.code;
  if (code == 200) {
    message.success("更新用户成功");
  } else {
    message.error("更新用户失败");
  }
};

const handleAddUser = async () => {
  let res = await addUser(userData.add_user);
  let code = res.data.code;
  if (code == 200) {
    message.success("新增用户成功");
  } else {
    message.error("新增用户失败");
  }
};

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    fixed: "left",
    sorter: (a, b) => a.id - b.id,
    width: 100,
  },
  {
    title: "用户名",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "邮箱",
    dataIndex: "email",
    key: "email",
    width: 300,
  },
  {
    title: "是否为管理员",
    dataIndex: "isAdmin",
    key: "isAdmin",
    width: 150,
  },
  {
    title: "性别",
    dataIndex: "gender",
    key: "gender",
    width: 100,
  },
  {
    title: "创建时间",
    dataIndex: "created_time",
    key: "created_time",
  },
  {
    title: "更新时间",
    dataIndex: "updated_time",
    key: "updated_time",
  },
  {
    title: "权限",
    dataIndex: "permission",
    key: "permission",
    width: "10%",
  },
  {
    title: "选择",
    dataIndex: "checkbox",
    key: "checkbox",
    width: "20%",
  },
];

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const state = reactive({
  selectedRowKeys: [],
  // Check here to configure the default column
  loading: false,
});

const hasSelected = computed(() => state.selectedRowKeys.length > 0);

const onSelectChange = (selectedRowKeys) => {
  console.log("selectedRowKeys changed: ", selectedRowKeys);
  state.selectedRowKeys = selectedRowKeys;
  userData.users.forEach((user) => {
    if (user.id == parseInt(selectedRowKeys[0])) {
      userData.current_user = user;
    }
  });
  console.log(userData.current_user);
};

onMounted(fetchAllUsers);
</script>

<style lang="less" scoped>
.modify {
  margin-top: 20px;
  margin-left: 70px;
}
</style>
