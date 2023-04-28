<template>
  <a-layout-content
    :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '1080px' }"
  >
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="Backup list">
        <a-table
          :columns="columns"
          :data-source="backupData.backups"
          :row-key="(record) => record.id"
          :scroll="{ x: 1500, y: 1000 }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'operation'">
              <a-popconfirm title="Sure to recover?" @confirm="rollback(record.id)">
                <a>Recover</a>
              </a-popconfirm>
            </template>
          </template>
        </a-table>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Backup database" force-render>
        <a-button type="primary" @click="handleBackupDatabase">Backup</a-button>
      </a-tab-pane>
    </a-tabs>
  </a-layout-content>
</template>

<script setup>
import { onMounted } from "vue";
import { getAllBackups, rollbackBackup, backupDatabase } from "@/service/backup";
import { reactive } from "vue";
import { message } from "ant-design-vue";

var backupData = reactive({
  backups: [],
});

const fetchAllBackups = async () => {
  const res = await getAllBackups();
  let backupList = res.data.data;
  backupList.forEach((backup) => {
    backupData.backups.push(backup);
  });
};

// const onRecover = (id) => {
//   backupData.backups = backupData.backups.filter((item) => item.id !== id);
// };

const rollback = async (id) => {
  let res = await rollbackBackup(id);
  console.log(res);
  if (res.data.code == 200) {
    message.success("Rollback successfully");
  } else {
    message.error("Rollback failed");
  }
};

const handleBackupDatabase = async () => {
  let res = await backupDatabase();
  if (res.data.code == 200) {
    message.success("Rollback successfully");
    window.location.reload();
  } else {
    message.error("Rollback failed");
  }
};

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    sorter: true,
    width: 50,
    fixed: "left",
  },
  {
    title: "backupsName",
    key: "backupsName",
    dataIndex: "backupsName",
  },
  {
    title: "backupsName",
    key: "backupsName",
    dataIndex: "backupsName",
  },
  {
    title: "createTime",
    key: "createTime",
    dataIndex: "createTime",
  },
  {
    title: "databaseName",
    key: "databaseName",
    dataIndex: "databaseName",
  },
  {
    title: "operation",
    dataIndex: "operation",
    fixed: "right",
    width: 100,
  },
];

onMounted(fetchAllBackups);
</script>

<style lang="less" scoped></style>
