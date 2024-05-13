<template>
    <div>
        <div class="flex justify-between items-center text-white mb-5">
            <div class="text-title md:text-title1">Calendar</div>
            <div
                class="text-caption md:text-title flex items-center gap-1 p-1 rounded-md hover:bg-background hover:bg-opacity-50 cursor-pointer">
                <div>{{ year }}</div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M7.5 8L6 9.5L12.0703 15.5703L18.1406 9.5L16.6406 8L12.0703 12.5703L7.5 8Z"
                        fill="#ffffff" />
                </svg>
            </div>
        </div>

        <div class="flex justify-between md:justify-evenly items-center flex-wrap">
            <button @click="previous"
                class="w-10 h-10 grid place-content-center rounded-full border border-background hover:bg-background order-1 md:order-1 mb-3 md:mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M14.0703 6L8 12.0703L14.0703 18.1406L15.5703 16.6406L11 12.0703L15.5703 7.5L14.0703 6Z"
                        fill="#ffffff" />
                </svg>
            </button>

            <div class="order-3 md:order-1 w-full h-[500px] md:w-[400px] md:h-[550px] relative">
                <Calendar :month="item" :year="year" v-for="(item, index) in cards" :key="item"
                    :style="{ transform: `scale(${4 / (4 + (index * 0.1))}) translate(0px, ${index * 25}px)`, opacity: `${(4 - index) / 4}` }"
                    class="w-full h-fu absolute ease-in-out duration-300" :class="{ 'z-50': index === 0 }" />

            </div>

            <button @click="next"
                class="w-10 h-10 grid place-content-center rounded-full border border-background hover:bg-background order-2 md:order-1 mb-3 md:mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9.5 6L8 7.5L12.5703 12.0703L8 16.6406L9.5 18.1406L15.5703 12.0703L9.5 6Z"
                        fill="#ffffff" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import Calendar from "../components/cards/Calendar.vue"

export default {
    components: {
        Calendar,
    },
    data() {
        return {
            year: 2024,
            cards: [1, 2, 3, 4]
        }
    },
    methods: {
        previous() {
            if (this.cards[0] !== 1) {
                this.cards.unshift(this.cards[this.cards.length - 1] - 4)
                this.cards.pop()
            }
        },
        next() {
            if (this.cards[0] !== 12) {
                this.cards.shift()
                this.cards.push(this.cards[this.cards.length - 1] + 1)
            }
        }
    }
}
</script>