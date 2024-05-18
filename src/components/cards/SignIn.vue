<template>
  <form @submit.prevent="logIn" class="w-full h-full p-3 md:p-5">
    <div class="text-center text-title1 md:text-title2 text-secondary py-3 md:py-5">
      Log In to Your Account
    </div>
        
    <input
      v-model="user.email"
      type="text"
      class="w-full p-3 text-title md:text-title0 text-secondary placeholder:text-secondary placeholder:opacity-50 placeholder:text-title0 appearance-none outline-none border-b border-secondary mb-5"
      placeholder="Enter your email"
    >

    <div class="relative">
      <input
        v-model="user.password"
        :type="showPass? 'text' : 'password'"
        class="w-full p-3 text-title md:text-title0 text-secondary placeholder:text-secondary placeholder:opacity-50 placeholder:text-title0 appearance-none outline-none border-b border-secondary mb-40"
        placeholder="Enter your password"
      >

      <div class="absolute top-4 right-0">
        <div v-if="!showPass" @click="showPass=true">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 4C4 4 1 12 1 12C1 12 4 20 12 20C20 20 23 12 23 12C23 12 20 4 12 4ZM12 6C17.276 6 19.9446 10.2671 20.8086 11.9961C19.9436 13.7131 17.255 18 12 18C6.724 18 4.05541 13.7329 3.19141 12.0039C4.05741 10.2869 6.745 6 12 6ZM12 8C9.791 8 8 9.791 8 12C8 14.209 9.791 16 12 16C14.209 16 16 14.209 16 12C16 9.791 14.209 8 12 8ZM12 10C13.105 10 14 10.895 14 12C14 13.105 13.105 14 12 14C10.895 14 10 13.105 10 12C10 10.895 10.895 10 12 10Z" fill="#6B7280"/>
          </svg>
        </div>

        <div v-else @click="showPass=false">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4.20703 2.79297L2.79297 4.20703L5.08203 6.49609C2.41519 8.64041 1.16084 11.4162 1.08008 11.6055L0.912109 12L1.08008 12.3945C1.21308 12.7055 4.428 20 12 20C14.0663 20 15.7972 19.4495 17.2383 18.6523L19.793 21.207L21.207 19.793L4.20703 2.79297ZM12 4C10.789 4 9.70003 4.20062 8.70703 4.51562L10.3535 6.16211C10.8745 6.06311 11.419 6 12 6C17.396 6 20.1676 10.5881 20.8906 11.9961C20.5966 12.5591 19.9524 13.652 18.9434 14.752L20.3691 16.1777C22.0491 14.3597 22.8549 12.5455 22.9199 12.3945L23.0879 12L22.9199 11.6055C22.7869 11.2945 19.572 4 12 4ZM6.51172 7.92578L8.5625 9.97656C8.20795 10.5691 8 11.2589 8 12C8 14.206 9.794 16 12 16C12.7411 16 13.4309 15.7921 14.0234 15.4375L15.748 17.1621C14.6743 17.6712 13.4283 18 12 18C6.604 18 3.83238 13.4119 3.10938 12.0039C3.525 11.2079 4.64024 9.36282 6.51172 7.92578ZM12.2129 8.02148L15.9785 11.7871C15.8695 9.75411 14.2459 8.13048 12.2129 8.02148ZM10.0742 11.4883L12.5117 13.9258C12.348 13.9698 12.1779 14 12 14C10.897 14 10 13.103 10 12C10 11.8221 10.0302 11.652 10.0742 11.4883Z" fill="#6B7280"/>
          </svg>
        </div>
      </div>
    </div>

    <button
    type="submit"
    :disabled="!user.email || !user.password"
      class=" w-full py-2 bg-primary text-title text-white rounded-md mb-2 disabled:bg-primary/55"
    >
      Log in
    </button>

    <div class="text-center text-title0 text-secondary mb-3">
      Don't have an account?
    </div>

    <button
      class="w-full py-2 bg-pink text-title text-white rounded-md"
      @click="signUp"
    >
      Sign up
    </button>
  </form>
</template>

<script lang="ts">
  export default {
    emits: ['signup', 'loggedIn'],
    data() {
      return {
        user: {} as user,
        showPass: false as boolean
      }
    },
    methods:{
      logIn(){
        this.$apiPost('/login', this.user).then((res: any) => {
          this.$emit('loggedIn', res, false)
        }).catch((err: any) => {
          this.$emit('loggedIn', err, true)
        })
        this.$apiGet("/refresh-token")
      },
      signUp(){
        this.$emit('signup')
      }
    }
  }
</script>