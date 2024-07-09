<template>
  <div style="margin: 30px 30px 30px 30px;">
    <form @submit.prevent="submitForm" enctype="multipart/form-data">
      <input type="text" :value="user && user.name" name="namegroup" readonly required />
      <input type="text" v-model="nameactivity" name="nameactivity" placeholder="ชื่อกิจกรรม" required />
      <input type="date" v-model="day_month_year" name="day_month_year" required />
      <input type="time" v-model="time" name="time" required />
      <textarea v-model="details" style="width: 550px; height: 300px;" name="details" placeholder="รายละเอียดกิจกรรม"
        required></textarea>
      <select v-model="type" name="type" required>
        <option value="" disabled selected>กิจกรรมเกี่ยวข้องทางด้าน</option>
        <option value="ด้านศิลปวัฒนธรรม">ด้านศิลปวัฒนธรรม</option>
        <option value="ด้านจิตอาสา">ด้านจิตอาสา</option>
        <option value="ด้านส่งเสริมสุขภาพและนันทนาการ">ด้านส่งเสริมสุขภาพและนันทนาการ</option>
        <option value="ด้านคุณธรรมและจริยธรรม">ด้านคุณธรรมและจริยธรรม</option>
        <option value="ด้านวิชาการและทักษะชีวิต">ด้านวิชาการและทักษะชีวิต</option>
      </select>
      <select v-model="importance" name="importance" required>
        <option value="" disabled selected>เลือกความสำคัญของกิจกรรม</option>
        <option value="กิจกรรมสำคัญ">กิจกรรมสำคัญของมหาวิทยาลัย</option>
        <option value="ไม่เป็นกิจกรรมสำคัญ">ไม่เป็นกิจกรรมสำคัญของมหาวิทยาลัย</option>
      </select>
      <select v-model="agency" name="agency" required>
        <option value="" disabled selected>องค์กรของท่าน</option>
        <option value="ส่วนงานบริหารมหาวิทยาลัย">ส่วนงานบริหารมหาวิทยาลัย</option>
        <option value="ส่วนงานวิชาการ">ส่วนงานวิชาการ</option>
        <option value="สำนักงาน">สำนักงาน</option>
        <option value="หน่วยงานนิสิต">หน่วยงานนิสิต</option>
        <option value="ชมรม">ชมรม</option>
      </select>
      <div style="display: flex; align-items: center;">
        <input type="file" @change="handleFileUpload" name="image" required />
        <span style="color: red; margin-left: 10px;">*สามารถรับนามสกุลไฟล์ได้เพียงแค่ jpg หรือ png เท่านั้น</span>
      </div>
      <button style="margin-top: 30px;" type="submit">บันทึกข้อมูล</button>
    </form>
    <!-- แสดงข้อความแจ้งเตือน -->
    <p v-if="message" :style="{ color: messageColor }">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      nameactivity: '',
      day_month_year: '',
      time: '',
      details: '',
      type: '',
      importance: '',
      agency: '',
      image: null,
      message: '',
      messageColor: '',
      user: {}
    };
  },
  created() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      const id = sessionStorage.getItem("id");
      if (id) {
        try {
          const response = await axios.get(`http://localhost:3000/user/${id}`);
          this.user = response.data;
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        this.$router.push("/login");
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) {
        this.message = 'กรุณาเลือกไฟล์';
        this.messageColor = 'red';
        return;
      }

      if (!file.name.toLowerCase().endsWith('.jpg') && !file.name.toLowerCase().endsWith('.png')) {
        this.message = 'ไฟล์ต้องเป็นนามสกุล .jpg หรือ .png เท่านั้น';
        this.messageColor = 'red';
        return;
      }

      this.image = file;
      this.message = '';
    },
    async submitForm() {
      if (!this.image || (!this.image.name.toLowerCase().endsWith('.jpg') && !this.image.name.toLowerCase().endsWith('.png'))) {
        this.message = 'กรุณาอัพโหลดไฟล์ .jpg หรือ .png เท่านั้น';
        this.messageColor = 'red';
        return;
      }

      try {
        const formData = new FormData();
        formData.append('namegroup', this.user.name);  // Use user.name directly here
        formData.append('nameactivity', this.nameactivity);
        formData.append('day_month_year', this.day_month_year);
        formData.append('time', this.time);
        formData.append('details', this.details);
        formData.append('type', this.type);
        formData.append('importance', this.importance);
        formData.append('agency', this.agency);
        formData.append('image', this.image);

        const response = await axios.post('http://localhost:3000/activities', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        this.message = 'บันทึกกิจกรรมของท่านเรียบร้อย';
        this.messageColor = 'green';

        this.clearForm();

        // Wait for 5 seconds and then redirect to /index2
        setTimeout(() => {
          this.$router.push('/index2');
        }, 3000);
        let timerInterval;
        Swal.fire({
          title: "กำลังอัพโหลดข้อมูล รอสักครู่!",
          html: "I will close in <b></b> milliseconds.",
          timer: 3000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
      } catch (error) {
        console.error('Error submitting form:', error);
        this.message = 'Error submitting form';
        this.messageColor = 'red';
      }
    },
    clearForm() {
      this.nameactivity = '';
      this.day_month_year = '';
      this.time = '';
      this.details = '';
      this.type = '';
      this.importance = '';
      this.agency = '';
      this.image = null;
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: auto;
}

input[type="text"],
input[type="date"],
input[type="time"],
textarea,
select,
input[type="file"],
button {
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

input[type="file"] {
  padding: 4px;
}

button {
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

p {
  text-align: center;
  margin-top: 10px;
}
</style>
