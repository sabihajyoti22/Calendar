<template>
  <div class="w-full h-full shadow-lg bg-white rounded-xl px-4 py-8 md:px-6 md:py-12">
    <div class="text-center py-2 mb-3 text-secondary text-title2 md:text-title3 uppercase tracking-widest">
      {{ currentMonthName }}
    </div>

    <div class="grid grid-cols-7 gap-2">
      <div v-for="week in weeks" :key="week" class="text-center font-semibold text-gray-600">
        {{ week }}
      </div>

      <div class="text-center" v-for="day in startDay" :key="day" />
      <div class="text-center my-2" v-for="day in daysInMonths" :key="day + '%'">
        {{ day }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    year: {
      type: Number,
      default: 0
    },
    month: {
      type: Number,
      default: 0
    },
    selectedDay: {
      type: Number,
      default: 0
    }
  },
  computed: {
    daysInMonths() {
      return new Date(this.year, this.month, 0).getDate()
    },
    startDay() {
      return new Date(this.year, (this.month - 1), 1).getDay()
    },
    currentMonthName() {
      return new Date(this.year, (this.month - 1)).toLocaleString("default", { month: "long" })
    }
  },
  data() {
    return {
      weeks: ["S", "M", "T", "W", "T", "F", "S"]
    }
  }
}
</script>