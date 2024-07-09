<template>
  <div>
    <!-- ส่วนค้นหาและเพิ่มกิจกรรม -->
    <div style="display: flex; justify-content: center; margin-top: 30px; margin-left: 70px;">
      <!-- ส่วนค้นหา -->
      <q-input class="GPL__toolbar-input" dense standout="bg-light-blue-1" v-model="search" placeholder="Search"
        outlined style="width: 500px">
        <template v-slot:prepend>
          <q-icon v-if="search === ''" name="search" />
          <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
        </template>
      </q-input>
      <!-- ปุ่มเพิ่มกิจกรรม -->
      <router-link to="/post">
        <q-btn class="q-ml-md" color="yellow-8" icon="add" @click="addFunction"
          style="border-radius: 30px; width: 70px" />
      </router-link>
    </div>
    <br />
    <br />
    <!-- ส่วนแสดงรายการกิจกรรม -->
    <div class="row items-start">
      <div class="col-2"></div>
      <div class="col">
        <!-- วนลูปแสดงรายการกิจกรรม -->
        <div class="row" v-for="item in displayedItems" :key="item.id">
          <div class="col" style="color: black; text-decoration: none;">
            <q-card style="margin: 10px; position: relative;">
              <div class="row" @click="openDialog(item)">
                <div class="col-3">
                  <div>
                    <img :src="item.image" alt="" class="img1"
                      style="width: 280px; height: 200px; margin: 10px 0px 0px 0px;">
                  </div>
                </div>
                <div class="col" style="margin: 0px 0px 0px 50px;">
                  <p style="font-size: 18px;">{{ item.namegroup }}</p>
                  <p style="font-size: 24px;">{{ item.nameactivity }}</p>
                  <p
                    style="overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">
                    {{ item.details }}</p>
                  <p style="margin-right: auto;">{{ item.type }}</p>
                  <div>
                    <p>วันเวลาดำเนินกิจกรรม วันที่ {{ item.day_month_year }}<span>&nbsp;&nbsp;</span>เวลา{{ item.time
                      }}น.
                    </p>
                  </div>
                </div>
              </div>
              <div style="position: absolute; bottom: 10px; right: 10px;">
                <q-btn flat icon="download" color="green" @click.stop="downloadActivities(item.nameactivity)" />
                <q-tooltip>ดาวน์โหลด</q-tooltip>
              </div>
            </q-card>
          </div>
        </div>
      </div>

      <div class="col-2" style="background-color: aqua;"></div>
    </div>
    <!-- ส่วนปุ่มเลื่อนหน้า -->
    <div style="display: flex; justify-content: center; margin-top: 20px; margin-bottom: 60px;">
      <!-- ปุ่มกลับหน้า -->
      <q-btn v-if="currentPage > 1" color="primary" label="<" @click="goToPage(currentPage - 1)"
        style="margin-right: 10px" />
      <!-- ปุ่มหน้า -->
      <q-btn v-for="page in totalPages" :key="page" color="primary" :label="page" @click="goToPage(page)"
        style="margin-right: 10px" />
      <!-- ปุ่มหน้าถัดไป -->
      <q-btn v-if="currentPage < totalPages" color="primary" label=">" @click="goToPage(currentPage + 1)" />
    </div>

    <!-- Dialog -->
    <q-dialog v-model="dialogVisible">
      <q-card style="width: 600px;">
        <q-card-section>
          <div class="text-h6">{{ selectedItem.nameactivity }}</div>
        </q-card-section>

        <q-img :src="selectedItem.image" style="width: 100%; height: 300px;"></q-img>

        <q-card-section>
          <div class="text-subtitle1">{{ selectedItem.namegroup }}</div>
          <div>{{ selectedItem.details }}</div>
          <br>
          <div>{{ selectedItem.type }}</div>
          <div>วันเวลาดำเนินกิจกรรม วันที่ {{ selectedItem.day_month_year }} เวลา{{ selectedItem.time }}น.</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="ปิด" color="primary" @click="dialogVisible = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

export default {
  name: "IndexPage",

  setup() {
    const search = ref("");
    const itemsPerPage = 10;
    const currentPage = ref(1);
    const items = ref([]);
    const dialogVisible = ref(false);
    const editDialogVisible = ref(false); // State for the edit dialog
    const deleteDialogVisible = ref(false); // State for the delete dialog
    const selectedItem = ref({});
    const itemToDelete = ref(null); // State for the item to be deleted
    const name = ref();
    onMounted(() => {
      name.value = sessionStorage.getItem("name");
      axios.get("http://localhost:3000/activities").then((response) => {
        const filteredItems = response.data.filter((item) => item.namegroup === name.value);
        // Sort items by id in descending order
        filteredItems.sort((a, b) => b.id - a.id);
        items.value = filteredItems.map((item) => ({
          ...item,
          day_month_year: new Date(item.day_month_year).toLocaleDateString("th-TH", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
        }));
      }).catch((error) => {
        console.error("Error fetching activity data:", error);
      });
    });

    const totalPages = computed(() => Math.ceil(items.value.length / itemsPerPage));
    const displayedItems = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return items.value.slice(startIndex, endIndex);
    });

    function goToPage(page) {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
      }
    }

    function openDialog(item) {
      selectedItem.value = item;
      dialogVisible.value = true;
    }

    function openEditDialog(item) {
      selectedItem.value = { ...item }; // Make a copy of the item
      editDialogVisible.value = true;
    }

    function openDeleteDialog(item) {
      itemToDelete.value = item;
      deleteDialogVisible.value = true;
    }

    function addFunction() {
      // Implement your add function logic here
    }

    async function downloadActivities(selectedActivity) {
      try {
        const response = await axios.get(`http://localhost:3000/download-user-activities?selectedActivity=${selectedActivity}`, {
          responseType: "blob",
        });
        const blob = new Blob([response.data], { type: response.headers["content-type"] });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "user_activities.xlsx");
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (error) {
        console.error("Error downloading activities:", error);
      }
    }

    return {
      search,
      itemsPerPage,
      currentPage,
      items,
      dialogVisible,
      editDialogVisible,
      deleteDialogVisible,
      selectedItem,
      itemToDelete,
      name,
      totalPages,
      displayedItems,
      goToPage,
      openDialog,
      openEditDialog,
      openDeleteDialog,
      addFunction,
      downloadActivities,
    };
  },
};
</script>
