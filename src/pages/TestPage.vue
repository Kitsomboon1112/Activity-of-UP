<template>
  <div style="background: #aaaaaa">
    <q-carousel animated v-model="slide" arrows navigation infinite :autoplay="autoplay">
      <q-carousel-slide :name="1" img-src="/src/assets/2.jpg" />
      <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
      <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
      <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
    </q-carousel>
    <br />

    <div class="row">
      <div class="col"></div>
      <div class="col"></div>

      <div class="col-5">

        <p style="font-size: 24px; color: #ffffff;">
          ปฏิทินกิจกรรม |
          <router-link to="/test">
            <a href="" style="color: #ffffff; font-size: 18px;">ปฏิทินกิจกรรมทั้งหมด</a>
          </router-link>
        </p>

      </div>
    </div>
    <br />
    <div style="background-color: #001e4d">
      <div class="q-pa-md example-row-mix-and-match">
        <p class="text-h5" style="color: #ffffff; text-align: center; line-height: 1">
          กิจกรรมสำคัญของมหาวิทยาลัยพะเยา
          <span style="color: #61ff00; text-align: center; "><br>____________</span>
        </p>
        <br />
        <div>
          <div class="row justify-center items-center">
            <div v-for="item in (importantActivities, limitedItems)" :key="item.id" class="col-12 col-md-6 col-lg-3"
              style="padding: 5px 5px">
              <router-link :to="`/activity/${item.id}`" style="color: #000; text-decoration: none;">
                <q-card class="my-card" @click="showDetails(item.id)">

                  <div class="row">
                    <div class="col-1">
                      <h style="color: #61ff00; font-size: 40px; margin: 0px 0px 0px 10px;">|</h>
                    </div>
                    <div class="col" style="margin: 10px 0px 0px 0px;">
                      {{ item.namegroup }}
                      <br>
                      {{ item.nameactivity }}
                      <div
                        style="display: flex; justify-content: flex-end; align-items: center; font-size: 12px; color: #aaaaaa;">
                        <q-icon name="access_time" /> {{ thaiDate(item.day_timepost) }}
                      </div>
                    </div>
                  </div>

                  <q-img :src="item.image" class="image-size"></q-img>
                  <q-card-section>
                    <p
                      style="overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                      {{ item.details }}</p>
                    <div style="display: flex; justify-content: flex-end;">
                      <p style="margin: 2px 3px 4px 5px;">{{ thaiDate(item.day_month_year) }}</p>
                    </div>
                  </q-card-section>
                </q-card>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="background-color: #aaaaaa">
      <div class="q-pa-md example-row-mix-and-match">
        <p class="text-h5" style="color: #000; line-height: 1; padding-top: 60px; padding-left: 100px;">
          ส่วนงานบริหารมหาวิทยาลัย
          <span style="color: #61ff00; text-align: center">|
            <h style="font-size: 18px;">
              <router-link to="/index" style="color: #000;">กิจกรรมทั้งหมด</router-link>
            </h>
          </span>
        </p>

        <div>
          <div class="row justify-center items-center">
            <div v-for="item in administrativeActivities" :key="item.id" class="col-12 col-md-6 col-lg-3"
              style="padding: 5px 5px">
              <router-link :to="`/activity/${item.id}`" style="color: #000; text-decoration: none;">
                <q-card class="my-card" @click="showDetails(item.id)">

                  <div class="row">
                    <div class="col-1">
                      <h style="color: #61ff00; font-size: 40px; margin: 0px 0px 0px 10px;">|</h>
                    </div>
                    <div class="col" style="margin: 10px 0px 0px 0px;">
                      {{ item.namegroup }}
                      <br>
                      {{ item.nameactivity }}
                      <div
                        style="display: flex; justify-content: flex-end; align-items: center; font-size: 12px; color: #aaaaaa;">
                        <q-icon name="access_time" /> {{ thaiDate(item.day_timepost) }}
                      </div>
                    </div>
                  </div>
                  <q-img :src="item.image" class="image-size"></q-img>
                  <q-card-section>
                    <p
                      style="overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                      {{ item.details }}</p>
                    <div style="display: flex; justify-content: flex-end;">
                      <p style="margin: 2px 3px 4px 5px;">{{ thaiDate(item.day_month_year) }}</p>
                    </div>
                  </q-card-section>
                </q-card>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div style="background-color: #aaaaaa">
        <div class="q-pa-md example-row-mix-and-match">
          <p class="text-h5" style="color: #000; line-height: 1; padding-top: 60px; padding-left: 100px;">
            ส่วนงานวิชาการ
            <span style="color: #61ff00; text-align: center">|
              <h style="font-size: 18px;">
                <router-link to="/index" style="color: #000;">กิจกรรมทั้งหมด</router-link>
              </h>
            </span>
          </p>
          <div>
            <div class="row justify-center items-center">
              <!-- Loop through limited filtered activities -->
              <div v-for="item in limitedFilterActivities" :key="item.id" class="col-12 col-md-6 col-lg-3"
                style="padding: 5px 5px">
                <router-link :to="`/activity/${item.id}`" style="color: #000; text-decoration: none;">
                  <q-card class="my-card" @click="showDetails(item.id)">
                    <!-- Your card content here -->
                    <div class="row">
                      <div class="col-1">
                        <h style="color: #61ff00; font-size: 40px; margin: 0px 0px 0px 10px;">|</h>
                      </div>
                      <div class="col" style="margin: 10px 0px 0px 0px;">
                        {{ item.namegroup }}
                        <br>
                        {{ item.nameactivity }}
                        <div
                          style="display: flex; justify-content: flex-end; align-items: center; font-size: 12px; color: #aaaaaa;">
                          <q-icon name="access_time" /> {{ thaiDate(item.day_timepost) }}
                        </div>
                      </div>
                    </div>
                    <q-img :src="item.image" class="image-size"></q-img>
                    <q-card-section>
                      <p
                        style="overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                        {{ item.details }}
                      </p>
                      <div style="display: flex; justify-content: flex-end;">
                        <p style="margin: 2px 3px 4px 5px;">{{ thaiDate(item.day_month_year) }}</p>
                      </div>
                    </q-card-section>
                  </q-card>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Office Section -->
      <div class="q-pa-md example-row-mix-and-match">
        <p class="text-h5" style="color: #000; line-height: 1; padding-top: 5px; padding-left: 100px;">
          สำนักงาน
          <span style="color: #61ff00; text-align: center">|
            <h style="font-size: 18px;">
              <router-link to="/index" style="color: #000;">กิจกรรมทั้งหมด</router-link>
            </h>
          </span>
        </p>
        <div>
          <div class="row justify-center items-center">
            <div v-for="item in officeItems" :key="item.id" class="col-12 col-md-6 col-lg-3" style="padding: 5px 5px">
              <router-link :to="`/activity/${item.id}`" style="color: #000; text-decoration: none;">
                <q-card class="my-card" @click="showDetails(item.id)">

                  <div class="row">
                    <div class="col-1">
                      <h style="color: #61ff00; font-size: 40px; margin: 0px 0px 0px 10px;">|</h>
                    </div>
                    <div class="col" style="margin: 10px 0px 0px 0px;">
                      {{ item.namegroup }}
                      <br>
                      {{ item.nameactivity }}
                      <div
                        style="display: flex; justify-content: flex-end; align-items: center; font-size: 12px; color: #aaaaaa;">
                        <q-icon name="access_time" /> {{ thaiDate(item.day_timepost) }}
                      </div>
                    </div>
                  </div>
                  <q-img :src="item.image" class="image-size"></q-img>
                  <q-card-section>
                    <p
                      style="overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                      {{ item.details }}</p>
                    <div style="display: flex; justify-content: flex-end;">
                      <p style="margin: 2px 3px 4px 5px;">{{ thaiDate(item.day_month_year) }}</p>
                    </div>
                  </q-card-section>
                </q-card>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="q-pa-md example-row-mix-and-match">
        <p class="text-h5" style="color: #000; line-height: 1; padding-top: 5px; padding-left: 100px;">
          หน่วยงานนิสิต
          <span style="color: #61ff00; text-align: center">|<h style="font-size: 18px;">
              <router-link to="/index" style="color: #000;">กิจกรรมทั้งหมด</router-link>
            </h>
          </span>
        </p>
        <div>
          <div class="row justify-center items-center">
            <div v-for="item in nisidtemsActivities" :key="item.id" class="col-12 col-md-6 col-lg-3"
              style="padding: 5px 5px">

              <router-link :to="`/activity/${item.id}`" style="color: #000; text-decoration: none;">
                <q-card class="my-card" @click="showDetails(item.id)">

                  <div class="row">
                    <div class="col-1">
                      <h style="color: #61ff00; font-size: 40px; margin: 0px 0px 0px 10px;">|</h>
                    </div>
                    <div class="col" style="margin: 10px 0px 0px 0px;">
                      {{ item.namegroup }}
                      <br>
                      {{ item.nameactivity }}
                      <div
                        style="display: flex; justify-content: flex-end; align-items: center; font-size: 12px; color: #aaaaaa;">
                        <q-icon name="access_time" /> {{ thaiDate(item.day_timepost) }}
                      </div>
                    </div>
                  </div>
                  <q-img :src="item.image" class="image-size"></q-img>
                  <q-card-section>
                    <p
                      style="overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                      {{ item.details }}</p>
                    <div style="display: flex; justify-content: flex-end;">
                      <p style="margin: 2px 3px 4px 5px;">{{ thaiDate(item.day_month_year) }}</p>
                    </div>
                  </q-card-section>
                </q-card>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="q-pa-md example-row-mix-and-match">
        <p class="text-h5" style="color: #000; line-height: 1; padding-top: 5px; padding-left: 100px;">
          ชมรม
          <span style="color: #61ff00; text-align: center">|<h style="font-size: 18px;">
              <router-link to="/index" style="color: #000;">กิจกรรมทั้งหมด</router-link>
            </h>
          </span>
        </p>
        <div>
          <div class="row justify-center items-center">
            <div v-for="item in cubitem" :key="item.id" class="col-12 col-md-6 col-lg-3" style="padding: 5px 5px">
              <router-link :to="`/activity/${item.id}`" style="color: #000; text-decoration: none;">
                <q-card class="my-card" @click="showDetails(item.id)">

                  <div class="row">
                    <div class="col-1">
                      <h style="color: #61ff00; font-size: 40px; margin: 0px 0px 0px 10px;">|</h>
                    </div>
                    <div class="col" style="margin: 10px 0px 0px 0px;">
                      {{ item.namegroup }}
                      <br>
                      {{ item.nameactivity }}
                      <div
                        style="display: flex; justify-content: flex-end; align-items: center; font-size: 12px; color: #aaaaaa;">
                        <q-icon name="access_time" /> {{ thaiDate(item.day_timepost) }}
                      </div>
                    </div>
                  </div>
                  <q-img :src="item.image" class="image-size"></q-img>
                  <q-card-section>
                    <p
                      style="overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                      {{ item.details }}</p>
                    <div style="display: flex; justify-content: flex-end;">
                      <p style="margin: 2px 3px 4px 5px;">{{ thaiDate(item.day_month_year) }}</p>
                    </div>
                  </q-card-section>
                </q-card>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue"; // Import computed from vue
import axios from 'axios';

export default {
  props: ['activity'],
  setup() {
    const items = ref([]);
    const shuffledItems = ref([]);
    const slide = ref(1);
    const autoplay = ref(true);
    const date = ref("");

    onMounted(() => {
      axios.get('http://localhost:3000/activities')
        .then(response => {
          console.log('Activities data:', response.data);
          items.value = response.data; // Assign response data to the items ref
          shuffleItems(); // Initial shuffle
          setInterval(shuffleItems, 5000);

        })
        .catch(error => {
          console.error('Error fetching activities:', error);
        });
    });

    // Function to shuffle items
    const shuffleItems = () => {
      shuffledItems.value = [...items.value].sort(() => 0.5 - Math.random());
    };

    const limitedFilterActivities = computed(() => {
      return shuffledItems.value.filter(item => item.agency === 'ส่วนงานวิชาการ').slice(0, 3);
    });
    const administrativeActivities = computed(() => {
      return shuffledItems.value.filter(item => item.agency === 'ส่วนงานบริหารมหาวิทยาลัย').slice(0, 3);
    });
    const nisidtemsActivities = computed(() => {
      return shuffledItems.value.filter(item => item.agency === 'หน่วยงานนิสิต').slice(0, 3);
    });
    // Function to convert date to Thai format
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

    // Computed properties for different sections
    const limitedItems = computed(() => {
      return shuffledItems.value.slice(0, 4);
    });

    const importantActivities = computed(() => {
      return items.value.filter(item => item.importance === 'กิจกรรมสำคัญ');
    });

    const administrativeItems = computed(() => {
      return items.value.filter(item => item.agency === 'ส่วนงานบริหารมหาวิทยาลัย');
    });

    const officeItems = computed(() => {
      return items.value.filter(item => item.agency === 'สำนักงาน');
    });

    const filterActivities = computed(() => {
      return items.value.filter(item => item.agency === 'ส่วนงานวิชาการ');
    });

    const nisidtems = computed(() => {
      return items.value.filter(item => item.agency === 'หน่วยงานนิสิต');
    });

    const cubitem = computed(() => {
      return items.value.filter(item => item.agency === 'ชมรม');
    });

    // Function to show details of the selected item
    const showDetails = (itemId) => {
      console.log('Show details of item with ID:', itemId);
      // Implement your logic to show details here
    };

    return {
      items,
      shuffledItems,
      slide,
      autoplay,
      date,
      showDetails,
      limitedItems,
      administrativeItems,
      officeItems,
      filterActivities,
      nisidtems,
      cubitem,
      importantActivities,
      thaiDate,
      limitedFilterActivities,
      administrativeActivities,
      nisidtemsActivities,
    };
  },
};


</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Itim&family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

* {
  font-family: "Itim", cursive;
  font-weight: 400;
  font-style: normal;
}

.my-card {
  border-radius: 30px;
  height: 320px;
  width: 330px;
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.image-size {
  width: 330px;
  height: 150px;
}
</style>
