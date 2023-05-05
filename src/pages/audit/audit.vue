<template>
  <a-layout-content
    :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '1080px' }"
  >
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="Upload Images">
        <a-upload-dragger
          v-model:fileList="fileList"
          name="files"
          :multiple="true"
          action="http://101.43.245.160:8081/audit/upload"
          @change="handleChange"
        >
          <p class="ant-upload-drag-icon">
            <inbox-outlined></inbox-outlined>
          </p>
          <p class="ant-upload-text">Click or drag file to this area to upload</p>
          <p class="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or
            other band files
          </p>
        </a-upload-dragger>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Audition" force-render>
        <a-list item-layout="horizontal" :data-source="auditData.audits">
          <template #renderItem="{ item }">
            <a-list-item>
              <template #actions>
                <a-button type="primary" @click="verify(item.id, 1)">通过</a-button>
                <a-button type="primary" danger @click="verify(item.id, 0)">不通过</a-button>
              </template>
              <a-list-item-meta>
                <template #title>
                  <p>id: {{ item.id }}</p>
                </template>
                <template #avatar>
                  <a-image :width="100" :src="item.url" />
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>
      </a-tab-pane>
    </a-tabs>
  </a-layout-content>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { message } from "ant-design-vue";
import { getAllAudits, verifyImage } from "@/service/audit";

var auditData = reactive({
  audits: [],
});

const listAudits = async () => {
  let res = await getAllAudits();
  let data = res.data.data;
  data.forEach((audit) => {
    console.log(audit);
    auditData.audits.push(audit);
  });
};

const verify = async (id, verify) => {
  let res = await verifyImage(id, verify);
  console.log(res);
  if (res.data.code == 200) {
    message.success("审核成功");
  } else {
    message.error("审核失败");
  }
  window.location.reload();
};

const handleChange = (info) => {
  const status = info.file.status;
  if (status !== "uploading") {
    console.log(info.file, info.fileList);
  }
  if (status === "done") {
    message.success(`${info.file.name} file uploaded successfully.`);
  } else if (status === "error") {
    message.error(`${info.file.name} file upload failed.`);
  }
};

onMounted(listAudits);
</script>

<style lang="less" scoped></style>
