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
          <router-link :to="`/activity/${item.id}`" class="col" style="color: black; text-decoration: none;">
            <q-card style="margin: 10px;">
              <div class="row">
                <div class="col-3">
                  <div>
                    <img :src="item.image" alt="" class="img1"
                      style="width: 280px; height: 200px; margin: 10px 0px 0px 0px;">
                  </div>
                </div>
                <div class="col" style="margin: 0px 0px 0px 50px; ">
                  <p style="font-size: 18px;">{{ item.namegroup }}</p>
                  <p style="font-size: 24px;">{{ item.nameactivity }}</p>
                  <p
                    style="overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">
                    {{ item.details }}</p>
                  <p style="margin-right: auto;">{{ item.type }}</p>
                  <div style="justify-content:end;display: flex;">
                    <p>{{ item.day_month_year }}<span>&nbsp;&nbsp;</span>{{ item.time }}</p>
                  </div>
                </div>
              </div>
            </q-card>
          </router-link>
        </div>
      </div>
      <div class="col-2" style="background-color: aqua;"></div>
    </div>
    <!-- ส่วนปุ่มเลื่อนหน้า -->
    <div style="
        display: flex;
        justify-content: center;
        margin-top: 20px;
        margin-bottom: 60px;
      ">
      <!-- ปุ่มกลับหน้า -->
      <q-btn v-if="currentPage > 1" color="primary" label="<" @click="goToPage(currentPage - 1)"
        style="margin-right: 10px" />
      <!-- ปุ่มหน้า -->
      <q-btn v-for="page in totalPages" :key="page" color="primary" :label="page" @click="goToPage(page)"
        style="margin-right: 10px" />
      <!-- ปุ่มหน้าถัดไป -->
      <q-btn v-if="currentPage < totalPages" color="primary" label=">" @click="goToPage(currentPage + 1)" />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

export default {
  name: "IndexPage",
  setup() {
    const search = ref("");
    const itemsPerPage = 10; // จำนวนรายการต่อหน้า
    const currentPage = ref(1); // หน้าปัจจุบัน
    const items = ref([]); // เก็บข้อมูลกิจกรรมทั้งหมด

    onMounted(() => {
      // เมื่อคอมโพเนนต์ถูกโหลด เรียก API เพื่อดึงข้อมูลกิจกรรม
      axios
        .get("http://localhost:3000/activities") // เรียกใช้งาน API ใหม่ที่มี endpoint ชื่อว่า /activities
        .then((response) => {
          items.value = response.data.map((item) => ({
            ...item,
            // แปลงรูปแบบวันที่ให้เหลือเพียง วัน เดือน ปี
            day_month_year: new Date(item.day_month_year).toLocaleDateString(
              "th-TH",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            ),
          }));
        })
        .catch((error) => {
          console.error("Error fetching activity data:", error);
        });
    });

    function addFunction() {
      // Implement your add functionality here
    }

    const totalPages = computed(() =>
      Math.ceil(items.value.length / itemsPerPage)
    );

    const displayedItems = computed(() => {
      const sortedItems = [...items.value].sort((a, b) => b.id - a.id); // จัดเรียง items ตาม id จากมากไปน้อย
      const startIndex = (currentPage.value - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return sortedItems.slice(startIndex, endIndex);
    });

    function goToPage(page) {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth", // เลือก behavior เป็น 'smooth' เพื่อให้การเลื่อนเป็นไปอย่างนุ่มนวล
        });
      }
    }

    return {
      search,
      displayedItems,
      currentPage,
      totalPages,
      addFunction,
      goToPage,
    };
  },
};
</script>

<style>
.img1 {
  padding: 5px;
  width: 280px;
  height: 200px;
  background-size: cover;
}
</style>
