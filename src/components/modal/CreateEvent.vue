<template>
  <div class="w-[450px] mx-3 bg-white p-3 md:p-5 rounded-md">
    <!-- <div class="text-secondary text-title tracking-tight">
      Sunday, January 25
    </div>

    <input type="text"
      class="w-full p-3 text-title md:text-title0 text-secondary placeholder:text-secondary placeholder:opacity-50 placeholder:text-title0 appearance-none outline-none"
      placeholder="Add title"> -->



    <div class="flex justify-center items-center gap-3 mb-3">
      <div class="grid place-content-center">
        <button @click="decreaseHour" class="rotate-90">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M14.0703 6L8 12.0703L14.0703 18.1406L15.5703 16.6406L11 12.0703L15.5703 7.5L14.0703 6Z"
              fill="#7A6FCB" />
          </svg>
        </button>
        <div id="scrollbar" class="max-h-[108px] overflow-y-hidden hour snap-y snap-mandator">
          <div v-for="hour in  hours " :key="hour"
            class="text-title1 text-secondary text-center ease-in-out duration-300 snap-start py-1"
            :style="{ transform: `scale(${hour == currentHour ? 1 : 0.7})`, opacity: `${hour == currentHour ? 1 : 0.5}` }">
            {{ hour < 10 ? '0' + hour : hour }} </div>
          </div>
          <button @click="increaseHour" class="-rotate-90">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M14.0703 6L8 12.0703L14.0703 18.1406L15.5703 16.6406L11 12.0703L15.5703 7.5L14.0703 6Z"
                fill="#7A6FCB" />
            </svg>
          </button>
        </div>

        <div class="grid place-content-center">
          <button @click="decreaseMintue" class="rotate-90">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M14.0703 6L8 12.0703L14.0703 18.1406L15.5703 16.6406L11 12.0703L15.5703 7.5L14.0703 6Z"
                fill="#7A6FCB" />
            </svg>
          </button>
          <div id="scrollbar" class="max-h-[108px] overflow-y-hidden mintue snap-y snap-mandator">
            <div v-for="mintue in  mintues " :key="mintue"
              class="text-title1 text-secondary text-center ease-in-out duration-300 snap-start py-1"
              :style="{ transform: `scale(${mintue == currentMintue ? 1 : 0.7})`, opacity: `${mintue == currentMintue ? 1 : 0.5}` }">
              {{ mintue < 10 ? '0' + mintue : mintue }} </div>
            </div>
            <button @click="increaseMintue" class="-rotate-90">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M14.0703 6L8 12.0703L14.0703 18.1406L15.5703 16.6406L11 12.0703L15.5703 7.5L14.0703 6Z"
                  fill="#7A6FCB" />
              </svg>
            </button>
          </div>

          <div class="text-title0 text-secondary flex flex-col">
            <button @click="temp = 'AM'" class="ease-in-out duration-300"
              :class="temp === 'AM' ? 'opacity-100 scale-100' : 'opacity-50 scale-75'">AM</button>
            <button @click="temp = 'PM'" class="ease-in-out duration-300"
              :class="temp === 'PM' ? 'opacity-100 scale-100' : 'opacity-50 scale-75'">PM</button>
          </div>
        </div>

        <!-- <button class=" w-full py-1 bg-primary text-title text-white rounded-md mb-2">Save</button>
        <button class="w-full py-1 bg-pink text-title text-white rounded-md">Close</button> -->
      </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      mintues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
      ],
      currentHour: 6,
      currentMintue: 30,
      hourScroll: 0 as any,
      mintueScroll: 0 as any,
      temp: 'AM'
    }
  },
  mounted() {
    this.hourScroll = document.querySelector('.hour')
    this.hourScroll.scrollTop = 360 / 2
    this.mintueScroll = document.querySelector('.mintue')
    this.mintueScroll.scrollTop = 2250 / 2
  },
  methods: {
    increaseHour() {
      this.hourScroll.scrollTop += 40
      this.currentHour++
    },
    decreaseHour() {
      this.hourScroll.scrollTop -= 40
      this.currentHour--
    },
    increaseMintue() {
      this.mintueScroll.scrollTop += 40
      this.currentMintue++
    },
    decreaseMintue() {
      this.mintueScroll.scrollTop -= 40
      this.currentMintue--
    }
  }
}
</script>