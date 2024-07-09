<template>
  <q-page padding>
    <q-card class=" text-white" style="background: radial-gradient(circle, #e7a9c6 0%, #161854 100%)">
      <q-card-section>
        <div class="text-h5">ปฏิทินกิจกรรมมหาวิทยาลัยพะเยา</div>
      </q-card-section>
    </q-card>
    <q-card>
      <q-card-section>
        <div class="row items-center q-gutter-sm">
          <q-btn flat round icon="chevron_left" @click="prevMonth"></q-btn>
          <q-select v-model="selectedMonth" :options="months" option-value="value" option-label="label"
            @input="onMonthYearChange" dense outlined></q-select>
          <q-select v-model="selectedYear" :options="years" option-value="value" option-label="label" dense outlined
            @input="onMonthYearChange"></q-select>
          <q-btn flat round icon="chevron_right" @click="nextMonth"></q-btn>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="calendar-grid">
          <div class="day-header" style="grid-column: 1 / -1; font-size: 30px;">{{ monthLabel }}</div>
          <div v-for="day in daysOfWeek" :key="day" class="day-header">{{ translateDay(day) }}</div>
          <div v-for="empty in emptyDays" :key="empty" class="day-cell"></div>
          <div v-for="day in daysInMonth" :key="day"
            :class="['day-cell', { 'current-day': isCurrentDayInThaiCalendar(day), 'has-activity': hasActivity(day) && !isPast(day) }]"
            @click="selectDate(day)">
            <div>{{ formatDateToThaiCalendar(day) }}</div>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-table :rows="filteredActivityRows" :columns="activityColumns" row-key="day" class="activity-table" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, getYear, getMonth, getDate, format, isBefore, startOfDay } from 'date-fns';
import { th } from 'date-fns/locale';
import axios from 'axios';

export default {
  setup() {
    const currentDate = ref(new Date());
    const selectedDate = ref(currentDate.value);

    const months = ref([
      { label: 'มกราคม', value: 0 },
      { label: 'กุมภาพันธ์', value: 1 },
      { label: 'มีนาคม', value: 2 },
      { label: 'เมษายน', value: 3 },
      { label: 'พฤษภาคม', value: 4 },
      { label: 'มิถุนายน', value: 5 },
      { label: 'กรกฎาคม', value: 6 },
      { label: 'สิงหาคม', value: 7 },
      { label: 'กันยายน', value: 8 },
      { label: 'ตุลาคม', value: 9 },
      { label: 'พฤศจิกายน', value: 10 },
      { label: 'ธันวาคม', value: 11 },
    ]);

    const years = ref(
      Array.from({ length: 50 }, (_, i) => {
        const year = getYear(currentDate.value) - 25 + i + 543;
        return { label: year.toString(), value: year };
      })
    );

    const selectedMonth = ref(months.value.find(month => month.value === getMonth(currentDate.value)));
    const selectedYear = ref(years.value.find(year => year.value === getYear(currentDate.value) + 543));

    const daysOfWeek = ref(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);

    const daysInMonth = computed(() => {
      const start = startOfMonth(new Date(selectedYear.value.value - 543, selectedMonth.value.value));
      const end = endOfMonth(new Date(selectedYear.value.value - 543, selectedMonth.value.value));
      return eachDayOfInterval({ start, end });
    });

    const emptyDays = computed(() => {
      const start = startOfMonth(new Date(selectedYear.value.value - 543, selectedMonth.value.value));
      return new Array(start.getDay()).fill(null);
    });

    const formatDateToThaiCalendar = (date) => {
      return format(date, 'd', { locale: th });
    };

    const isCurrentDayInThaiCalendar = (day) => {
      const today = new Date();
      const currentThaiYear = today.getFullYear() + 543;
      return (
        getDate(day) === today.getDate() &&
        selectedMonth.value.value === today.getMonth() &&
        selectedYear.value.value === currentThaiYear
      );
    };

    const onMonthYearChange = () => {
      selectedDate.value = new Date(selectedYear.value.value - 543, selectedMonth.value.value);
      filterActivities();
    };

    const prevMonth = () => {
      const prevDate = subMonths(selectedDate.value, 1);
      selectedYear.value = years.value.find(year => year.value === getYear(prevDate) + 543);
      selectedMonth.value = months.value.find(month => month.value === getMonth(prevDate));
      onMonthYearChange();
    };

    const nextMonth = () => {
      const nextDate = addMonths(selectedDate.value, 1);
      selectedYear.value = years.value.find(year => year.value === getYear(nextDate) + 543);
      selectedMonth.value = months.value.find(month => month.value === getMonth(nextDate));
      onMonthYearChange();
    };

    const monthLabel = computed(() => {
      return selectedMonth.value.label;
    });

    const translateDay = (day) => {
      switch (day) {
        case 'Sun':
          return 'อาทิตย์';
        case 'Mon':
          return 'จันทร์';
        case 'Tue':
          return 'อังคาร';
        case 'Wed':
          return 'พุธ';
        case 'Thu':
          return 'พฤหัสบดี';
        case 'Fri':
          return 'ศุกร์';
        case 'Sat':
          return 'เสาร์';
        default:
          return day;
      }
    };

    const selectDate = (day) => {
      console.log('Selected date:', day);
    };

    // Activity table columns and rows
    const activityColumns = ref([
      { name: 'day', align: 'center', label: 'วัน', field: 'day' },
      { name: 'activity', align: 'left', label: 'กิจกรรม', field: 'activity' },
    ]);

    const activityRows = ref([]);
    const filteredActivityRows = ref([]);
    const activitiesByDate = ref({});

    // Fetch activities from the backend
    const fetchActivities = async () => {
      try {
        const response = await axios.get('http://localhost:3000/activities');
        const activities = response.data;

        // Transform the response data to map activities by date
        const activityMap = {};
        activities.forEach(activity => {
          const date = new Date(activity.day_month_year);
          const formattedDate = format(date, 'yyyy-MM-dd');
          if (!activityMap[formattedDate]) {
            activityMap[formattedDate] = [];
          }
          activityMap[formattedDate].push({
            day: format(date, 'd', { locale: th }),
            activity: activity.nameactivity,
            date: formattedDate,
          });
        });

        activitiesByDate.value = activityMap;

        // Flatten the activity map and sort by date
        activityRows.value = Object.values(activityMap)
          .flat()
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        // Filter activities for the selected month
        filterActivities();
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    const filterActivities = () => {
      const selectedMonthYear = `${selectedYear.value.value - 543}-${String(selectedMonth.value.value + 1).padStart(2, '0')}`;
      filteredActivityRows.value = activityRows.value.filter(activity => activity.date.startsWith(selectedMonthYear));
    };

    const isPast = (day) => {
      const today = startOfDay(new Date());
      return isBefore(day, today);
    };

    onMounted(() => {
      fetchActivities();
    });

    watch([selectedMonth, selectedYear], filterActivities);

    const hasActivity = (day) => {
      const dateStr = format(day, 'yyyy-MM-dd');
      return activitiesByDate.value[dateStr] !== undefined;
    };

    return {
      selectedMonth,
      selectedYear,
      months,
      years,
      daysOfWeek,
      daysInMonth,
      emptyDays,
      prevMonth,
      nextMonth,
      monthLabel,
      translateDay,
      formatDateToThaiCalendar,
      isCurrentDayInThaiCalendar,
      selectDate,
      activityColumns,
      filteredActivityRows,
      fetchActivities,
      hasActivity,
      isPast,
    };
  },
};
</script>

<style scoped>
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.day-header {
  font-weight: bold;
  text-align: center;
}

.day-cell {
  text-align: center;
  padding: 10px;
  border: 1px solid #dcd4eb;
}

.current-day {
  background-color: #918809;
  color: white;
  border-radius: 50%;
}

.has-activity {
  background-color: #ffcccc;
}

.activity-table {
  margin-top: 20px;
}
</style>
