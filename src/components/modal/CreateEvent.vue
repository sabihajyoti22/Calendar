<template>
  <div class="w-[450px] mx-3 bg-white p-3 md:p-5 rounded-md">
    <div class="text-secondary1 text-title tracking-tight">
      {{ selectedWeek }}, {{ selectedMonth }} {{ selectedDate.day }}
    </div>

    <input type="text" v-model="event.title"
      class="w-full p-3 text-title md:text-title0 text-secondary1 placeholder:text-secondary1 placeholder:opacity-50 placeholder:text-title0 appearance-none outline-none"
      placeholder="Add title">

    <div class="flex justify-center items-center gap-3 mb-5">
      <div class="grid place-content-center relative">
        <button @click="changeHour('-')" class="rotate-90" :disabled="event.currentHour === 1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M14.0703 6L8 12.0703L14.0703 18.1406L15.5703 16.6406L11 12.0703L15.5703 7.5L14.0703 6Z"
              fill="#7A6FCB" />
          </svg>
        </button>

        <div id="scrollbar" class="max-h-[120px] overflow-y-hidden hour">
          <div @click="showHours = true" v-for="hour in  hours " :key="hour" class="text-title1 text-secondary1 text-center ease-in-out duration-500 py-1" :style="{ transform: `scale(${hour == event.currentHour ? 1 : 0.7})`, opacity: `${hour == event.currentHour ? 1 : 0.5}` }">
            {{ hour < 10 ? '0' + hour : hour }} 
          </div>
        </div>

        <button @click="changeHour('+')" class="-rotate-90" :disabled="event.currentHour === 12">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M14.0703 6L8 12.0703L14.0703 18.1406L15.5703 16.6406L11 12.0703L15.5703 7.5L14.0703 6Z"
              fill="#7A6FCB" />
          </svg>
        </button>

        <div v-if="showHours" class="grid grid-cols-2 gap-2 absolute top-4 -left-28 py-1 px-2 border rounded bg-white text-title1 text-secondary1 shadow-md z-50">
          <div @click="changeHour(item*2)" class="text-center p-1 hover:cursor-pointer hover:bg-secondary1/20 rounded" v-for="item in 6" :key="item">
            {{ item*2 < 10 ? '0'+item*2 : item*2 }}
          </div>
        </div>
      </div>

      <div class="text-title1 text-secondary1">
        :
      </div>

      <div class="grid place-content-center relative">
        <button @click="changeMintue('-')" class="rotate-90" :disabled="event.currentMintue === 60">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M14.0703 6L8 12.0703L14.0703 18.1406L15.5703 16.6406L11 12.0703L15.5703 7.5L14.0703 6Z"
              fill="#7A6FCB" />
          </svg>
        </button>

        <div id="scrollbar" class="max-h-[120px] overflow-y-hidden mintue">
          <div  @click="showMintues = true" v-for="mintue in  mintues " :key="mintue"
            class="text-title1 text-secondary1 text-center ease-in-out duration-500 py-1"
            :style="{ transform: `scale(${mintue == event.currentMintue ? 1 : 0.7})`, opacity: `${mintue == event.currentMintue ? 1 : 0.5}` }">
            {{ mintue < 10 ? '0' + mintue : mintue }} 
          </div>
        </div>

        <button @click="changeMintue('+')" class="-rotate-90" :disabled="event.currentMintue === 0">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M14.0703 6L8 12.0703L14.0703 18.1406L15.5703 16.6406L11 12.0703L15.5703 7.5L14.0703 6Z"
              fill="#7A6FCB" />
          </svg>
        </button>
        <div v-if="showMintues" class="grid grid-cols-2 gap-2 absolute top-4 -right-28 py-1 px-2 border rounded bg-white text-title1 text-secondary1 shadow-md z-50">
          <div @click="changeMintue(item*10)" class="text-center p-1 hover:cursor-pointer hover:bg-secondary1/20 rounded" v-for="item in 6" :key="item">
            {{ item*10 }}
          </div>
        </div>
      </div>

        <div class="text-title0 text-secondary1 flex flex-col">
          <button @click="event.time = 'AM'" class="ease-in-out duration-300"
            :class="event.time === 'AM' ? 'opacity-100 scale-100' : 'opacity-50 scale-75'">AM</button>
          <button @click="event.time = 'PM'" class="ease-in-out duration-300"
            :class="event.time === 'PM' ? 'opacity-100 scale-100' : 'opacity-50 scale-75'">PM</button>
        </div>
      </div>

      <button 
        :disabled="!event.title" 
        @click="saveButton"
        class="w-full py-1 bg-primary1 text-title text-white rounded-md mb-2 disabled:bg-primary1/55">
        Save
      </button>
      <button
        @click="closeButton" 
        class="w-full py-1 bg-pink text-title text-white rounded-md">
        Close
      </button>
    </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as number[],
      mintues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
      ] as number[],
      event: {
        title: '',
        currentHour: 6,
        currentMintue: 30,
        time: 'AM',
      } as event,
      hourScroll: 0 as any,
      mintueScroll: 0 as any,
      showHours: false as boolean,
      showMintues: false as boolean
    }
  },
  emits: ['sendData', 'close'],
  props: {
    selectedDate: {
      type: Object,
      default: {} as date
    },
    updatedValue: {
      type: Object,
      default: {} as event
    }
  },
  computed: {
    selectedMonth() {
      return new Date(this.selectedDate.year, (this.selectedDate.month - 1)).toLocaleString("default", { month: "long" })
    },
    selectedWeek() {
      return new Date(this.selectedDate.year, (this.selectedDate.month - 1), this.selectedDate.day).toLocaleString("default", { weekday: "long" })
    }
  },
  mounted() {
    if (this.updatedValue.id) {
      this.event = JSON.parse(JSON.stringify(this.updatedValue))
      if (this.event.currentHour > 2) {
        this.hourScroll = document.querySelector('.hour')
        this.hourScroll.scrollTop = ((this.event.currentHour - 2) * 40)
      }
      if (this.event.currentMintue > 2) {
        this.mintueScroll = document.querySelector('.mintue')
        this.mintueScroll.scrollTop = ((this.event.currentMintue - 1) * 40)
      }
    } else {
      this.hourScroll = document.querySelector('.hour')
      this.hourScroll.scrollTop = 160
      this.mintueScroll = document.querySelector('.mintue')
      this.mintueScroll.scrollTop = 1160
    }
  },
  methods: {
    changeHour(hour: any){
      this.showHours = false
      if(hour === '+'){
        this.event.currentHour++
      }else if(hour === '-'){
        this.event.currentHour--
      }else{
        this.event.currentHour = hour
      }
      this.hourScroll.scrollTop = (this.event.currentHour - 2) * 40
    },
    changeMintue(mintue: any){
      this.showMintues = false
      if(mintue === '+'){
        this.event.currentMintue++
      }else if(mintue === '-'){
        this.event.currentMintue--
      }else{
        this.event.currentMintue = mintue
      }
      this.mintueScroll.scrollTop = (this.event.currentMintue - 1) * 40
    },
    saveButton() {
      this.event = { ...this.selectedDate, ...this.event }
      this.$emit('sendData', this.event)
    },
    closeButton() {
      this.$emit('close')
    }
  }
}
</script>