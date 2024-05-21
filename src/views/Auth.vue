<template>
  <div class="flex justify-center items-center">
    <div class="w-full md:w-[450px] h-[500px] md:h-[550px] bg-white rounded-md">
      <SignUp v-if="!switched" @login="switched = true" @signedUp="signedUp" />
      <SignIn v-else @signup="switched = false" @loggedIn="loggedIn" />
    </div>

    <Transition>
      <div v-if="showPopUp" :class="error ? 'text-red-500' : 'text-green-500'"
        class="fixed bottom-1 w-[450px] bg-white flex items-center gap-3 rounded-md p-3 md:p-5 text-title">
        <div v-if="!error" class="w-6 h-6">
          <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"
            fill="none">
            <path
              d="M44 24C44 35.045 35.045 44 24 44C12.955 44 4 35.045 4 24C4 12.955 12.955 4 24 4C35.045 4 44 12.955 44 24Z"
              fill="url(#paint0_linear_3237_14079)" />
            <path opacity="0.05"
              d="M32.1718 16.1717L21.9997 26.3437L16.8277 21.1717C16.0467 20.3907 14.7807 20.3907 13.9997 21.1717L12.5857 22.5857C11.8047 23.3667 11.8047 24.6327 12.5857 25.4137L20.5857 33.4137C21.3667 34.1947 22.6327 34.1947 23.4137 33.4137L36.4138 20.4137C37.1948 19.6327 37.1948 18.3667 36.4138 17.5857L34.9998 16.1717C34.2188 15.3907 32.9528 15.3907 32.1718 16.1717Z"
              fill="black" />
            <path opacity="0.07"
              d="M20.9395 33.0604L12.9395 25.0604C12.3535 24.4744 12.3535 23.5244 12.9395 22.9394L14.3535 21.5254C14.9395 20.9394 15.8895 20.9394 16.4745 21.5254L22.0005 27.0504L32.5255 16.5254C33.1115 15.9394 34.0615 15.9394 34.6465 16.5254L36.0605 17.9394C36.6465 18.5254 36.6465 19.4754 36.0605 20.0604L23.0605 33.0604C22.4755 33.6454 21.5255 33.6454 20.9395 33.0604Z"
              fill="black" />
            <path
              d="M21.2933 32.7072L13.2933 24.7072C12.9022 24.3162 12.9022 23.6832 13.2933 23.2932L14.7072 21.8792C15.0982 21.4882 15.7313 21.4882 16.1213 21.8792L22.0003 27.7582L32.8793 16.8792C33.2703 16.4882 33.9033 16.4882 34.2933 16.8792L35.7073 18.2932C36.0983 18.6842 36.0983 19.3172 35.7073 19.7072L22.7073 32.7072C22.3173 33.0982 21.6833 33.0982 21.2933 32.7072Z"
              fill="white" />
            <defs>
              <linearGradient id="paint0_linear_3237_14079" x1="9.858" y1="9.858" x2="38.142" y2="38.142"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#21AD64" />
                <stop offset="1" stop-color="#088242" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div v-else class="w-6 h-6">
          <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"
            fill="none">
            <path
              d="M44 24C44 35.045 35.045 44 24 44C12.955 44 4 35.045 4 24C4 12.955 12.955 4 24 4C35.045 4 44 12.955 44 24Z"
              fill="url(#paint0_linear_3237_14078)" />
            <path opacity="0.05"
              d="M33.1885 28.9475L28.2395 23.9975L33.1895 19.0475C33.9705 18.2665 33.9705 17.0005 33.1895 16.2195L31.7755 14.8055C30.9945 14.0245 29.7285 14.0245 28.9475 14.8055L23.9965 19.7545L19.0465 14.8045C18.2655 14.0235 16.9995 14.0235 16.2185 14.8045L14.8045 16.2185C14.0235 16.9995 14.0235 18.2655 14.8045 19.0465L19.7545 23.9965L14.8045 28.9465C14.0235 29.7275 14.0235 30.9935 14.8045 31.7745L16.2185 33.1885C16.9995 33.9695 18.2655 33.9695 19.0465 33.1885L23.9965 28.2385L28.9465 33.1885C29.7275 33.9695 30.9935 33.9695 31.7745 33.1885L33.1885 31.7745C33.9695 30.9945 33.9695 29.7285 33.1885 28.9475Z"
              fill="black" />
            <path opacity="0.07"
              d="M32.8362 29.3002L27.5332 23.9972L32.8362 18.6942C33.4222 18.1082 33.4222 17.1582 32.8362 16.5732L31.4222 15.1592C30.8362 14.5732 29.8862 14.5732 29.3012 15.1592L23.9972 20.4612L18.6942 15.1582C18.1082 14.5723 17.1582 14.5723 16.5732 15.1582L15.1592 16.5723C14.5732 17.1583 14.5732 18.1082 15.1592 18.6932L20.4612 23.9972L15.1582 29.3002C14.5723 29.8862 14.5723 30.8362 15.1582 31.4212L16.5723 32.8352C17.1583 33.4212 18.1082 33.4212 18.6932 32.8352L23.9972 27.5332L29.3002 32.8362C29.8862 33.4222 30.8362 33.4222 31.4212 32.8362L32.8352 31.4222C33.4222 30.8362 33.4222 29.8862 32.8362 29.3002Z"
              fill="black" />
            <path
              d="M31.068 15.512L32.482 16.926C32.873 17.317 32.873 17.95 32.482 18.34L18.34 32.482C17.949 32.873 17.316 32.873 16.926 32.482L15.512 31.068C15.121 30.677 15.121 30.044 15.512 29.654L29.654 15.512C30.044 15.121 30.678 15.121 31.068 15.512Z"
              fill="white" />
            <path
              d="M32.482 31.068L31.068 32.482C30.677 32.873 30.044 32.873 29.654 32.482L15.512 18.34C15.121 17.949 15.121 17.316 15.512 16.926L16.926 15.512C17.317 15.121 17.95 15.121 18.34 15.512L32.482 29.654C32.873 30.044 32.873 30.678 32.482 31.068Z"
              fill="white" />
            <defs>
              <linearGradient id="paint0_linear_3237_14078" x1="9.858" y1="9.858" x2="38.142" y2="38.142"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#F44F5A" />
                <stop offset="0.443" stop-color="#EE3D4A" />
                <stop offset="1" stop-color="#E52030" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div>{{ message }}</div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import SignUp from "../components/cards/SignUp.vue"
import SignIn from "../components/cards/SignIn.vue"

export default {
  components: {
    SignUp,
    SignIn
  },
  data() {
    return {
      switched: false as boolean,
      error: false as boolean,
      message: '' as string,
      showPopUp: false as boolean,
      w: undefined as any,
    }
  },
  mounted() {
    this.getRefreshToken()
  },
  methods: {
    getRefreshToken() {
      let headers = {
        "Content-Type": "application/json"
      } as any

      if (typeof (this.w) == "undefined") {
        this.w = new Worker("/worker/refreshTokenWorker.js");
      }

      this.w.postMessage({
        url: import.meta.env.VITE_BASE_URL,
        headers: headers
      })

      this.w.onmessage = function (event: any) {
        // that.$setAxiosHader(event.data.accessToken)
        console.log(event)
      }

      this.w.onerror = () => {
        console.log("There is an error with cart worker!");
      }
    },
    signedUp(res: any, error: boolean) {
      this.showPopUp = true
      this.error = error
      if (error) {
        this.message = res.response.data.message
      } else {
        this.message = res.data.message
      }
      setTimeout(() => {
        this.showPopUp = false
      }, 5000)
    },
    loggedIn(res: any, error: boolean) {
      this.showPopUp = true
      this.error = error
      if (error) {
        this.message = res.response.data.message
      } else {
        this.message = res.data.message
      }
      setTimeout(() => {
        this.showPopUp = false
      }, 5000)
    }
  }
}
</script>