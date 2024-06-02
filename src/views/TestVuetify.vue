<template>
  <div class="bg-white">
    <input class="w-full p-4 mb-3 test" type="text" placeholder="Enter here.......">

    <v-select label="Select" :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
      variant="outlined"></v-select>
  </div>
</template>

<script lang="ts">
import { VSelect } from 'vuetify/lib/components/index.mjs'
export default {
  components: {
    VSelect,
  }
}
</script>
<style>
.test {
  border: 2px solid red;
}
</style>
