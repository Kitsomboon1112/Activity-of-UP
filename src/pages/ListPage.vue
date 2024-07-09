<template>
  <div class="outer-container">
    <div class="row">
      <div class="col-1 col col">
      </div>
      <div class="col col-10 col">
        <div class="row">
          <div class="col col-9 col-md" style="padding: 40px;">
            <router-link to="/post" style="text-decoration: none;">
              <q-card class="my-card text-white click-btn btn-style3 "
                style="background: radial-gradient(circle, #C4996C 0%, #000000 100%); width: 400px; height: 300px;">
                <q-card-section
                  style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%;">
                  <div style="flex-grow: 1;"></div>
                  <q-img src="/src/assets/8256444.jpg" style="width: 200px;"></q-img>
                  <p style="font-size: 24px;">โพสต์กิจกรรม&ข่าวสาร</p>
                  <div style="flex-grow: 1;"></div>
                </q-card-section>
              </q-card>
            </router-link>
          </div>

          <div class="col col-10 col-md" style="padding: 40px;">
            <router-link to="/download" style="text-decoration: none;">
              <q-card class="my-card text-white click-btn btn-style3"
                style="background: radial-gradient(circle, #593F6C 0%, #000000 100%); width: 400px; height: 300px;">
                <q-card-section
                  style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%;">
                  <div style="flex-grow: 1;"></div>
                  <q-img src="/src/assets/microsoft-excel-icon-png-logo-5.png" style="width: 200px;"></q-img>
                  <p style="font-size: 24px;">ดาวน์โหลดรายชื่อผู้เข้าร่วมกิจกรรม</p>
                  <div style="flex-grow: 1;"></div>
                </q-card-section>
              </q-card>
            </router-link>
          </div>

          <div class="col col-5 col-md" style="padding: 40px;">
            <router-link to="/profile" style="text-decoration: none;">
              <q-card class="my-card text-white click-btn btn-style3"
                style="background: radial-gradient(circle, #001E4D 0%, #000000 100%); width: 400px; height: 300px; ">
                <q-card-section
                  style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%;">

                  <q-img src="/src/assets/4686599.jpg" style="width: 200px;"></q-img>
                  <p style="font-size: 24px;">ข้อมูลของผู้ใช้งาน</p>
                </q-card-section>
              </q-card>
            </router-link>
          </div>
        </div>
      </div>
      <div class="col-2 col col">
      </div>
    </div>

  </div>
</template>

<script>
export default {
  setup() {
    return {
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  }
}
</script>


<style>
.outer-container {
  background-image: url("/src/assets/fotor-ai-20240429145530.jpg");
  min-height: 100vh;
}

.my-card {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  background-color: aliceblue;
  box-shadow: 20px 20px 20px 20px rgba(0, 0, 0, 0.1);
}

.click-btn {
  width: 120px;
  height: 40px;
  align-items: center;
  margin: 0.5rem;
  line-height: 35px;
  border: 1px solid;

  text-align: center;

  text-decoration: none;
  transition: all 0.75s;
  box-sizing: border-box;
}

.btn-style3:hover {
  transform: translateY(-0.50em);
  box-shadow: 0 0 0.5em 0em #1d164e;
  border-color: #1d164e;
  color: #1d164e;
}
</style>
