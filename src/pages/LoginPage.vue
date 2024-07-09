<template>
  <div class="bg">
    <div class="column">
      <div class="row">
        <q-card class="pp q-pa-lg">
          <q-card-section>
            <img class="logo" src="/src/assets/University_of_Phayao_Logo.svg.png" />
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-lg">
              <q-input color="red-1" style="font-size: 16px;" v-model="username" type="username" label="ชื่อผู้ใช้">
                <template v-slot:append>
                  <q-avatar>
                    <img src="https://www.emergentconnect.com/wp-content/uploads/2016/09/user.png" />
                  </q-avatar>
                </template>
              </q-input>
              <q-input color="red-1" style="font-size: 16px;" v-model="password" type="password" label="รหัสผ่าน">
                <template v-slot:append>
                  <q-avatar>
                    <img
                      src="https://cdn4.iconfinder.com/data/icons/adjusting-the-interface/256/Ui_glyphs_key-512.png" />
                  </q-avatar>
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <br />
          <q-card-actions class="q-px-md">
            <div class="cocustom-button full-width">
              <q-btn class="custom-button full-width" size="lg" rounded outlined label="เข้าสู่ระบบ" @click="login" />
            </div>
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
            <p class="text-red-1">Not registered? Create an Account</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import Swal from 'sweetalert2'



export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
    };
  },

  methods: {

    login() {
      let data = {
        username: this.username,
        password: this.password,
      };

      // ส่วนนี้คือส่วนที่คุณควรกำหนดค่า token ก่อนที่คุณจะส่งคำขอ
      let token = ""; // ให้กำหนดค่า token โดยเรียกใช้งานฟังก์ชันหรือตัวแปรที่เก็บ token จากการล็อกอิน

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:3000/login",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ตอนนี้ค่า token ถูกกำหนดแล้ว
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          Swal.fire({
            title: "ยินดีต้อนรับ",
            width: 500,
            padding: "3em",
            color: "#716add",
            showConfirmButton: false,
            timer: 1500,
            icon: "success",
            background: "#fff url(/images/trees.png)",
            backdrop: `
rgba(0,0,123,0.4)
url("https://24.media.tumblr.com/8210fd413c5ce209678ef82d65731443/tumblr_mjphnqLpNy1s5jjtzo1_400.gif")
left bottom
no-repeat
`
          });

          this.$router.push("/list");
          // Handle successful login response
          sessionStorage.setItem("username", response.data.username);
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("name", response.data.name);
          sessionStorage.setItem("id", response.data.id);
        })
        .catch((error) => {
          console.log(error);
          if (error.response && error.response.status === 401) {
            Swal.fire({
              title: "กรุณาตรวจสอบอีเมลและรหัสผ่าน",
              icon: "error",

            });
          } else {
            // Handle other errors
            alert("An error occurred. Please try again later.");
          }
          // Handle error
        });
    },

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

.q-card {
  width: 360px;
}

.logo {
  width: 100px;
  margin: auto auto;
  display: block;
}

.bg {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;

  background: url("/src/assets/2.jpg") repeat;
  background-position: center;
  background-size: cover;
}

.pp {
  position: relative;
  width: 380px;
  height: 480px;
  background: transparent;
  border: 3px solid rgba(255, 255, 255, 0.5);
  border-radius: 40px;
  backdrop-filter: blur(30px);
  justify-content: center;
  align-items: center;
}
</style>

<style scoped>
.custom-button {
  background: linear-gradient(80deg,
      #593f6c 4%,
      #593f6c 5%,
      #593f6c 20%,
      #fbc938 100%);
  color: #ffffff;
}

.custom-button:hover {
  /* เมื่อโฮเวอร์ */
  background: linear-gradient(80deg,
      #fbc938 6%,
      #fdc938 5%,
      #fbc938 20%,
      #593f6c 100%);
}
</style>
