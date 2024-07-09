<template>
  <div class="outer-container">
    <br />
    <div class="row">
      <div class="col"></div>
      <div class="col-9 user-info-container">
        <div style="font-size: 30px; margin-left: 10px;">
          <p style="padding: 5px;">ข้อมูลของผู้ใช้งาน</p>
        </div>
        <div class="row">
          <div class="col-2"
            style="margin: 30px; color: #aaaaaa; display: flex; flex-direction: column; justify-content: center;">
            รูปโปรไฟล์
          </div>
          <div class="col-6"
            style="text-align: center; margin: 30px; font-size: 16px; display: flex; flex-direction: column; justify-content: center;">
            รูปภาพของผู้ใช้งาน
          </div>
          <div class="col-2" style="padding: 30px; margin: 10px;">
            <div style="display: flex; flex-direction: column; align-items: center;">
              <img v-if="user && user.image" :src="user.image" alt="Profile Image"
                style="border-radius: 50%; width: 130px; height: 130px;">
              <canvas ref="profileCanvas" width="130" height="130" style="display: none;"></canvas>
              <q-btn v-if="user" @click="showDialog = true" style="margin-top: 10px; background-color: #ffe2ae;">
                <q-icon name="camera" style="color: #dfa006;" />
              </q-btn>
            </div>
          </div>
        </div>
        <hr />
        <div class="row">
          <div class="col-2" style="margin: 30px; color: #aaaaaa;">
            ชื่อผู้ใช้งาน
          </div>
          <div class="col-6" style="text-align: center; margin: 30px; font-size: 16px; color: #000;">
            {{ user && user.name }}
          </div>
          <div class="col-2"></div>
        </div>
        <hr />
        <div class="row">
          <div class="col-2" style="margin: 30px; color: #aaaaaa;">
            ชื่อหน่วยงาน
          </div>
          <div class="col-6" style="text-align: center; margin: 30px; font-size: 16px;">
            {{ user && user.name }}
          </div>
          <div class="col-2"></div>
        </div>
        <hr />
        <div class="row">
          <div class="col-2" style="margin: 30px; color: #aaaaaa;">
            อีเมล
          </div>
          <div class="col-6" style="text-align: center; margin: 30px; font-size: 16px;">
            {{ user && user.username }}
          </div>
          <div class="col-2"></div>
        </div>
      </div>
      <div class="col"></div>
    </div>
    <q-dialog v-model="showDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">อัพโหลดรูปโปรไฟล์ใหม่</div>
        </q-card-section>
        <q-card-section>
          <q-uploader @added="handleUpload" label="เลือกไฟล์" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="ยกเลิก" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const router = useRouter();
    const user = ref(null);
    const showDialog = ref(false);

    const fetchUserData = async () => {
      const id = sessionStorage.getItem("id");
      if (id) {
        try {
          const response = await axios.get(`http://localhost:3000/user/${id}`);
          user.value = response.data;
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        router.push("/login");
      }
    };

    const handleUpload = async (files) => {
      if (files.length > 0) {
        const file = files[0];
        const formData = new FormData();
        formData.append("image", file);

        try {
          const response = await axios.post(`http://localhost:3000/user/${sessionStorage.getItem("id")}/upload-image`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.status === 200 && response.data.image) {
            user.value.image = response.data.image;
            showDialog.value = false;
          } else {
            console.error("Unexpected response:", response);
          }
        } catch (error) {
          console.error("Error uploading file:", error.response ? error.response.data : error);
        }
      }
    };

    onMounted(fetchUserData);

    return {
      user,
      showDialog,
      handleUpload,
    };
  }
};
</script>

<style>
.outer-container {
  background-image: url("/src/assets/fotor-ai-20240429145530.jpg");
  min-height: 100vh;
}

.user-info-container {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  background-color: aliceblue;
  box-shadow: 20px 20px 20px 20px rgba(0, 0, 0, 0.1);
}
</style>
