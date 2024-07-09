<template>
  <div>
    <br>
    <!-- แสดงรายละเอียดกิจกรรม -->
    <div class="row">
      <div class="col-2"></div>
      <div class="col-8">
        <!-- แสดงหัวข้อกิจกรรม -->
        <div class="justify-center" v-if="activity">
          <q-card class="text-white" style="background-color: #800080;">
            <q-card-section>
              <div class="text-h6">
                <!-- ใช้ชื่อกิจกรรมและชื่อหน่วยงาน -->
                <p style="font-size: 30px;">{{ activity.nameactivity }}</p>
              </div>
              <div class="text-subtitle2">
                <span style="font-size: 18px;">{{ activity.namegroup }}</span>
              </div>
            </q-card-section>
            <div class="flex items-center justify-end" style="font-size: 14px; color: #fff;">
              <q-icon name="access_time" />
              <span v-if="activity.day_timepost">{{ thaiDate(activity.day_timepost) }}</span>
            </div>
          </q-card>
        </div>
        <div class="row">
          <!-- แสดงภาพ -->
          <div class="col" style="margin: 10px;">
            <q-img v-if="activity" :src="activity.image" style="width: 100%; height: 100%;"
              @click="showImageDialog = true">
            </q-img>
            <p v-if="activity && activity.day_month_year && activity.time"
              style="margin: 10px 20px 20px 0px; font-size: 16px;">
              วันเวลาดำเนินกิจกรรม วันที่ {{ thaiDate(activity.day_month_year) }} {{ activity.time }}น.
            </p>
          </div>
          <!-- แสดงรายละเอียด -->
          <div class="col" style="margin: 10px;">
            <q-card v-if="activity">
              <q-card-section style="padding: 14px;">
                <p style="font-size: 20px;">รายละเอียดกิจกรรม</p>
                <!-- ใช้ข้อมูลรายละเอียดจากกิจกรรม -->
                <p style="font-size: 16px;">{{ activity.details }}</p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <div class="col-2"></div>
    </div>
    <!-- แสดงข้อความ "กำลังโหลด..." หากไม่มีกิจกรรม -->
    <div v-if="!activity">กำลังโหลด...</div>

    <!-- Dialog เพื่อแสดงภาพ -->
    <q-dialog v-model="showImageDialog">
      <q-img :src="activity ? activity.image : ''" style="max-width: 100%; max-height: 100%;"
        @click="showImageDialog = false">
      </q-img>
    </q-dialog>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const activities = ref(JSON.parse(localStorage.getItem('activities')) || []);
    const apiUrl = "http://localhost:3000/activities";
    const router = useRouter();
    const showImageDialog = ref(false);

    const fetchActivities = async () => {
      try {
        const response = await axios.get(apiUrl);
        activities.value = response.data;
        localStorage.setItem('activities', JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    onMounted(() => {
      fetchActivities();
    });

    const thaiDate = (dateString) => {
      const dateObject = new Date(dateString);
      const thaiMonth = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
        "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
        "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
      ][dateObject.getMonth()];

      const thaiDay = dateObject.getDate();
      const thaiYear = (dateObject.getFullYear() + 543).toString();

      return `${thaiDay} ${thaiMonth} ${thaiYear}`;
    };

    const activity = computed(() => {
      const activityId = parseInt(router.currentRoute.value.params.id);
      return activities.value.find((act) => act.id === activityId);
    });

    return {
      activity,
      showImageDialog,
      thaiDate
    };
  }
};
</script>
