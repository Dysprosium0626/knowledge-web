<template>
  <a-layout-content
    :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '1080px' }"
  >
    <a-table
      :columns="columns"
      :data-source="logData.logs"
      :row-selection="rowSelection"
      :scroll="{ x: 1500, y: 1000 }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'requestMethod'">
          <span>
            <a-tag
              :key="record.requestMethod"
              :color="
                record.requestMethod === 'GET'
                  ? 'green'
                  : record.requestMethod === 'POST'
                  ? 'yellow'
                  : 'blue'
              "
            >
              {{ record.requestMethod.toUpperCase() }}
            </a-tag>
          </span>
        </template>
        <template v-if="column.key === 'logType'">
          <span>
            <a-tag
              :key="record.logType"
              :color="
                record.logType === 'INFO' ? 'green' : record.logType === 'ERROR' ? 'red' : 'blue'
              "
            >
              {{ record.logType.toUpperCase() }}
            </a-tag>
          </span>
        </template>
      </template>
    </a-table>
  </a-layout-content>
</template>

<script setup>
import { onMounted } from "vue";
import { getAllLogs } from "@/service/log";
import { reactive } from "vue";

var logData = reactive({
  logs: [],
});

const fetchAllLogs = async () => {
  const res = await getAllLogs();
  console.log(res);
  let logList = res.data.data.records;
  logList.forEach((logs) => {
    console.log(logs);
    logData.logs.push(logs);
  });
};

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    sorter: true,
    width: 100,
    fixed: "left",
  },
  {
    title: "LogType",
    key: "logType",
    dataIndex: "logType",
    width: 100,
    filters: [
      {
        text: "INFO",
        value: "INFO",
      },
      {
        text: "ERROR",
        value: "ERROR",
      },
    ],
    onFilter: (value, record) => record.logType.indexOf(value) === 0,
  },
  {
    title: "createDate",
    dataIndex: "createDate",
  },
  {
    title: "endTime",
    dataIndex: "endTime",
  },
  {
    title: "exceptionInfo",
    dataIndex: "exceptionInfo",
    ellipsis: true,
  },
  {
    title: "executeTime",
    dataIndex: "executeTime",
  },
  {
    title: "requestIp",
    dataIndex: "requestIp",
  },
  {
    title: "requestMethod",
    dataIndex: "requestMethod",
    key: "requestMethod",
    filters: [
      {
        text: "GET",
        value: "GET",
      },
      {
        text: "POST",
        value: "POST",
      },
      {
        text: "PUT",
        value: "PUT",
      },
      {
        text: "DELETE",
        value: "DELETE",
      },
    ],
    onFilter: (value, record) => record.requestMethod.indexOf(value) === 0,
  },
  {
    title: "requestParams",
    dataIndex: "requestParams",
  },
  {
    title: "requestUri",
    dataIndex: "requestUri",
  },
  {
    title: "serverAddress",
    dataIndex: "serverAddress",
  },
];

onMounted(fetchAllLogs);
</script>

<style lang="less" scoped></style>
