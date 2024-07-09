<template>
  <q-layout view="lHh Lpr fff" class="bg-grey-1">
    <div>

      <q-header elevated height-hint="64"
        style="width: 100%; height: 160px; background: #593f6c; display: flex; justify-content: center; align-items: flex-end;">

        <br />
        <div style="width: 100%;">
          <q-toolbar class="GPL__toolbar"
            style="height: 64px; background: #fbc938; display: flex; justify-content: space-between; align-items: center; width: 100%;">
            <div class="container" style="display: flex; justify-content: space-around; flex: 1;">
              <router-link to="/list"><q-btn class="text-h6 btn underline" flat style="color: #ffffff"
                  label="รายการ" /></router-link>
              <router-link to="/mail" style="color: #ffffff"><q-btn class="text-h6 btn underline" flat
                  style="color: #ffffff" label="กล่องข้อความ" /></router-link>
              <router-link to="/index2" style="color: #ffffff"><q-btn class="text-h6 underline" flat
                  style="color: #ffffff" label="กิจกรรมของหน่วยงาน" /></router-link>
              <router-link to="/index" style="color: #ffffff"><q-btn class="text-h6 underline" flat
                  style="color: #ffffff" label="กิจกรรมทั้งหมด" /></router-link>
            </div>
            <div class="q-pa-md">
              <q-btn-dropdown style="background-color: white; color: black" :label="name"
                dropdown-icon="change_history">
                <q-list>
                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label style="font-size: 16px">แอดมินหน่วยงาน</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="clearid">
                    <q-item-section>
                      <q-item-label style="color: red; font-size: 16px">ออกจากระบบ</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
          </q-toolbar>
        </div>
      </q-header>
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "HomeLayout",
  setup() {
    const leftDrawerOpen = ref(false);
    const search = ref("");
    const storage = ref(0.26);
    const username = ref();
    const name = ref();
    const router = useRouter();

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    const clearid = () => {
      sessionStorage.clear();
      router.push("/");
    };

    onMounted(() => {
      username.value = sessionStorage.getItem("username");
      name.value = sessionStorage.getItem("name");
    });

    return {
      leftDrawerOpen,
      search,
      storage,
      toggleLeftDrawer,
      username,
      name,
      clearid,
    };
  },
};
</script>

<style>
.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.btn {
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  width: 150px;
  height: 70px;
  position: relative;
  text-transform: uppercase;
}

.underline {
  border: 2px solid transparent;
}

.underline:after {
  background-color: #e709c2;
  content: "";
  height: 5px;
  width: 0%;
  bottom: 0;
  left: 30%;
  position: absolute;
  transition: left 0.2s cubic-bezier(0.215, 0.61, 0.355, 1), width 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.underline:hover::after {
  width: 100%;
  background-color: #8f10f0;
  content: "";
  position: absolute;
  left: 0;
}
</style>
