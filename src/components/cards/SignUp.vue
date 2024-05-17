<template>
    <div class="w-full h-full p-3 md:p-5">
        <div class="text-center text-title1 md:text-title2 text-secondary py-3 md:py-5">Create Account</div>
        
        <div class="flex flex-col ">
            <div>
                <input type="text" v-model="email" class="w-full p-3 text-title md:text-title0 text-secondary placeholder:text-secondary placeholder:opacity-50 placeholder:text-title0 appearance-none outline-none border-b border-secondary mb-5"
      placeholder="Enter your email">

      <input type="password" v-model="password"
      class="w-full p-3 text-title md:text-title0 text-secondary placeholder:text-secondary placeholder:opacity-50 placeholder:text-title0 appearance-none outline-none border-b border-secondary"
      placeholder="Enter your password">
            </div>

            <div>
                <button
          class=" w-full py-1 bg-primary text-title text-white rounded-md mb-2 disabled:bg-primary/55">Save</button>
        <button @click="closeButton" class="w-full py-1 bg-pink text-title text-white rounded-md">Close</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
       data() {
        return {
            email: '',
            password: ''
        }
       }, 
    }
</script>