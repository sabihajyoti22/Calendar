<template>
  <div class="w-full h-full shadow-lg bg-white rounded-xl">
    {{ month }}
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
  }
}
</script>