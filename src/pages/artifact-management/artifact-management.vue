<template>
  <a-layout-content
    :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '1080px' }"
  >
    <a-table
      :columns="columns"
      :data-source="artifactData.artifacts"
      :scroll="{ x: 1500, y: 1000 }"
      :row-key="(record) => record.id"
    >
      <template #bodyCell="{ column, record, text }">
        <template v-if="column.key === 'web_url'">
          <a :href="record.web_url" target="_blank">{{ record.web_url }}</a>
        </template>
        <template v-if="column.key === 'img_url'">
          <a :href="record.img_url" target="_blank">{{ record.img_url }}</a>
        </template>
        <template v-if="['title', 'dated', 'artist'].includes(column.dataIndex)">
          <div>
            <a-input
              v-if="editableData[record.id]"
              v-model:value="editableData[record.id][column.dataIndex]"
              style="margin: -5px 0"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template v-if="column.key === 'operation'">
          <span v-if="editableData[record.id]">
            <a-button type="primary" @click="save(record.id)">Save</a-button>
            <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.id)">
              <a-button type="primary">Cancel</a-button>
            </a-popconfirm>
          </span>
          <span v-else>
            <a-button type="primary" @click="edit(record.id)">Edit</a-button>
          </span>
          <a-divider type="vertical" />
          <a-popconfirm title="Sure to delete?" @confirm="delete record.id">
            <a-button type="primary">Delete</a-button>
          </a-popconfirm>
        </template>
      </template>
      <template #expandedRowRender="{ record }">
        <span v-if="record.description.length">
          <a-typography-title :level="2">Description</a-typography-title>
          <a-typography-text>{{ record.description }}</a-typography-text>
        </span>
        <a-divider />
        <span v-if="record.comments.length">
          <a-typography-title :level="2" :v-if="record.comments.length != 0">
            Comments
          </a-typography-title>
          <a-typography-text :v-if="record.comments.length != 0">
            {{ record.comments }}
          </a-typography-text>
        </span>
      </template>
    </a-table>
  </a-layout-content>
</template>

<script setup>
import { reactive } from "vue";
import { cloneDeep } from "lodash-es";

var artifactData = reactive({
  artifacts: [
    {
      id: "1",
      title: "“Arms of Liberty” punch bowl",
      dated: "c. 1770",
      artist: "",
      role: "Artist",
      department: "European Art",
      medium: "Porcelain",
      country: "China",
      description:
        "Holiday Traditions, Chas. Drawing Room, 'Wilkes Bowl', decorated in colors and gold a pair of medallions on each side, each forming a satyrical coat of arms, Cat Card Dims H.4-1/4 x Dia. 10 in.",
      comments:
        "This punch bowl's pseudo-armorial was satirically drawn to poke fun at English political figures of the late 1760s for their opposition to John Wilkes (1727-97). A proponent of civil liberties and American independence, Wilkes was elected several times to the House of Commons, but repeatedly expelled for attacking King George III and his loyalists.  Acquired in 1914, this bowl was the first Chinese Export porcelain object to enter the Institute's permanent collection.",
      web_url: "https://collections.artsmia.org/art/51",
      img_url: "https://6.api.artsmia.org/51.jpg",
      submit_time: "2023-04-11 13:08:48",
    },
    {
      id: "2",
      title: "Bottle",
      dated: "16th-17th century",
      artist: "",
      role: "Artist",
      department: "Chinese, South and Southeast Asian Art",
      medium: "Porcelain with black mirror glaze",
      country: "China",
      description: "Bottle, black mirror glaze Kangxi period 1662-1722.",
      comments: "",
      web_url: "https://collections.artsmia.org/art/66",
      img_url: "https://6.api.artsmia.org/66.jpg",
      submit_time: "2023-04-11 13:09:07",
    },
    {
      id: "3",
      title: "Plate",
      dated: "Kangxi period (1662-1722)",
      artist: "",
      role: "Artist",
      department: "Asian Art",
      medium: "Porcelain, famille verte",
      country: "China",
      description: "Plate, famille verte; K'ang Hsi period",
      comments:
        "Unlike the monochrome tradition, this finely executed plate represents a less restrained aspect of Qing ceramic taste. Nevertheless, a technical virtuosity is apparent in the overglaze enamels which create a richly varied design of butterflies and flowers on a green stipple ground. A work such as this, eggshell thin and of flawless brushwork, is the reward of 2,500 years of constant effort by the Chinese to create faultless ceramics. It is natural that such exquisite objects often functioned as purely decorative pieces.",
      web_url: "https://collections.artsmia.org/art/67",
      img_url: "https://6.api.artsmia.org/67.jpg",
      submit_time: "2023-04-11 13:09:08",
    },
    {
      id: "4",
      title: "Bottle",
      dated: "1736-1795",
      artist: "",
      role: "Artist",
      department: "Asian Art",
      medium: "Porcelain with pale celadon glaze",
      country: "China",
      description: "Bottle, pale Celadon glaze",
      comments: "",
      web_url: "https://collections.artsmia.org/art/68",
      img_url: "https://6.api.artsmia.org/68.jpg",
      submit_time: "2023-04-11 13:09:10",
    },
    {
      id: "5",
      title: "Bottle",
      dated: "1736-1795",
      artist: "",
      role: "Artist",
      department: "Asian Art",
      medium: "Porcelain with pea green glaze",
      country: "China",
      description: "Bottle, small, pea green",
      comments: "",
      web_url: "https://collections.artsmia.org/art/69",
      img_url: "https://6.api.artsmia.org/69.jpg",
      submit_time: "2023-04-11 13:09:11",
    },
    {
      id: "6",
      title: "Vase",
      dated: "1723-1735",
      artist: "",
      role: "Artist",
      department: "Asian Art",
      medium: "Porcelain with camellia green glaze",
      country: "China",
      description: "Vase, camelia green",
      comments: "",
      web_url: "https://collections.artsmia.org/art/70",
      img_url: "https://6.api.artsmia.org/70.jpg",
      submit_time: "2023-04-11 13:09:13",
    },
    {
      id: "7",
      title: "Globular Vase with Dragon Decor",
      dated: "1723-1735",
      artist: "",
      role: "Artist",
      department: "Chinese, South and Southeast Asian Art",
      medium: "White porcelain",
      country: "China",
      description: "Vase, white, globular shape, dragon decoration under glaze",
      comments: "",
      web_url: "https://collections.artsmia.org/art/71",
      img_url: "https://6.api.artsmia.org/71.jpg",
      submit_time: "2023-04-11 13:09:14",
    },
    {
      id: "8",
      title: "Paperweight: Deer and Fungus Motif",
      dated: "17th-20th century",
      artist: "",
      role: "Artist",
      department: "Asian Art",
      medium: "Carved jade",
      country: "China",
      description:
        "two reclining goats, apparently eating fungus - symbol of longevity. grey and black jade.",
      comments: "",
      web_url: "https://collections.artsmia.org/art/113",
      img_url: "https://6.api.artsmia.org/113.jpg",
      submit_time: "2023-04-11 13:10:06",
    },
    {
      id: "9",
      title: "Plate",
      dated: "12th-13th century",
      artist: "",
      role: "Artist",
      department: "Asian Art",
      medium: 'Jun ware, Porcelaneous stoneware with "splash" markings on blue glaze',
      country: "China",
      description: "fine sky blue glaze flushing into areas of purple. glazed stoneware",
      comments: "",
      web_url: "https://collections.artsmia.org/art/118",
      img_url: "https://6.api.artsmia.org/118.jpg",
      submit_time: "2023-04-11 13:10:11",
    },
    {
      id: "10",
      title: "Plate",
      dated: "mid 10th-late 13th century",
      artist: "",
      role: "Artist",
      department: "Asian Art",
      medium: "porcelain, copper",
      country: "China",
      description:
        "Pai-Ting-yao Plate shallow circular form; light porcellaneous ware, covered with creamy white glaze; inner surface decorated beneath the glaze with floral design in slight relief; rim mounted with copper band.",
      comments: "",
      web_url: "https://collections.artsmia.org/art/119",
      img_url: "https://6.api.artsmia.org/119.jpg",
      submit_time: "2023-04-11 13:10:12",
    },
  ],
});

// const fetchAllUsers = async () => {
//   const res = await getAllUsers();
//   console.log(res);
//   let userList = res.data.data;
//   userList.forEach((user) => {
//     console.log(user);
//     userData.users.push(user);
//   });
// };

const columns = [
  {
    title: "id",
    dataIndex: "id",
    width: 100,
    fixed: "left",
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: "title",
    dataIndex: "title",
    key: "title",
    width: 300,
  },
  {
    title: "dated",
    dataIndex: "dated",
    key: "dated",
    width: 150,
  },
  {
    title: "artist",
    dataIndex: "artist",
    key: "artist",
    width: 150,
  },
  {
    title: "role",
    dataIndex: "role",
    key: "role",
    width: 150,
  },
  {
    title: "department",
    dataIndex: "department",
    key: "department",
    width: 150,
  },
  {
    title: "medium",
    dataIndex: "medium",
    key: "medium",
    width: 150,
  },
  {
    title: "country",
    dataIndex: "country",
    key: "country",
    width: 150,
  },
  {
    title: "description",
    dataIndex: "description",
    key: "description",
    ellipsis: true,
    width: 200,
  },
  {
    title: "comments",
    dataIndex: "comments",
    key: "comments",
    ellipsis: true,
    width: 200,
  },
  {
    title: "web_url",
    dataIndex: "web_url",
    key: "web_url",
    width: 300,
  },
  {
    title: "img_url",
    dataIndex: "img_url",
    key: "img_url",
    width: 300,
  },
  {
    title: "submit_time",
    dataIndex: "submit_time",
    key: "submit_time",
    width: 200,
  },
  {
    title: "operation",
    dataIndex: "operation",
    key: "operation",
    fixed: "right",
    width: 300,
  },
];

const editableData = reactive({});

const edit = (id) => {
  editableData[id] = cloneDeep(artifactData.artifacts.filter((item) => id === item.id)[0]);
  console.log(editableData);
};
const save = (id) => {
  Object.assign(artifactData.artifacts.filter((item) => id === item.id)[0], editableData[id]);
  delete editableData[id];
};
const cancel = (id) => {
  delete editableData[id];
};

// onMounted(fetchAllUsers);
</script>

<style lang="less" scoped></style>
