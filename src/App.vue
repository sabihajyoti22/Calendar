<template>
  <div class="w-full min-h-screen bg-background1 flex justify-center">
    <div class="w-full min-h-full md:w-[1000px] mx-5 p-6 bg-primary1">
      <Navbar />
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
  import Navbar from "../src/components/Navbar.vue"

  export default {
    components: {
      Navbar
    }
  }
</script>