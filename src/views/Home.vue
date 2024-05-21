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

        <div class="flex justify-between md:justify-evenly items-center flex-wrap mb-20 md:mb-24">
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
                    class="w-full h-fu absolute ease-in-out duration-300" :class="{ 'z-50': index === 0 }"
                    @selectedDate="getDate" />

            </div>

            <button @click="next"
                class="w-10 h-10 grid place-content-center rounded-full border border-background hover:bg-background order-2 md:order-1 mb-3 md:mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9.5 6L8 7.5L12.5703 12.0703L8 16.6406L9.5 18.1406L15.5703 12.0703L9.5 6Z"
                        fill="#ffffff" />
                </svg>
            </button>
        </div>

        <div v-if="events.length" class="md:ml-12 mb-3 md:mb-6">
            <div class="hidden md:flex justify-between items-center mb-3 md:mb-5">
                <div class="text-title md:text-title0 text-white">Upcoming Events</div>
                <div class="flex gap-2">
                    <button @click="scrollPrevious"
                        class="w-8 h-8 grid place-content-center rounded-full border border-background hover:bg-background">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M14.0703 6L8 12.0703L14.0703 18.1406L15.5703 16.6406L11 12.0703L15.5703 7.5L14.0703 6Z"
                                fill="#ffffff" />
                        </svg>
                    </button>
                    <button @click="scrollNext"
                        class="w-8 h-8 grid place-content-center rounded-full border border-background hover:bg-background mb-3 md:mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M9.5 6L8 7.5L12.5703 12.0703L8 16.6406L9.5 18.1406L15.5703 12.0703L9.5 6Z"
                                fill="#ffffff" />
                        </svg>
                    </button>
                </div>
            </div>

            <div id="scrollbar" class="flex items-center gap-3 overflow-x-scroll scroll-smooth">
                <div class="bg-white px-3 py-2 rounded-lg w-[200px] shrink-0" v-for="(item, index) in events"
                    :key="index + '&&'">
                    <div class="flex justify-between">
                        <div class="text-caption md:text-body1 text-pink">{{ `${item.day} ${months[item.month - 1]}` }}
                        </div>

                        <div>
                            <button class="h-6 w-6 rounded-full grid place-content-center hover:bg-background group">
                                <svg class="fill-[#7A6FCB] group-hover:fill-white" xmlns="http://www.w3.org/2000/svg"
                                    width="14" height="14" viewBox="0 0 14 14">
                                    <path
                                        d="M11.1906 5.43884L11.8878 4.74169C12.6118 4.01769 12.6118 2.83941 11.8878 2.11512C11.5372 1.76484 11.0712 1.57227 10.5744 1.57227C10.0775 1.57227 9.61121 1.76512 9.26092 2.11541L8.56407 2.81227L11.1906 5.43884ZM7.95807 3.41827L2.79549 8.58084C2.68549 8.69084 2.60178 8.82655 2.55321 8.97369L1.59607 11.8654C1.54492 12.0191 1.58521 12.1886 1.69978 12.3031C1.78178 12.3848 1.89092 12.4286 2.00292 12.4286C2.04807 12.4286 2.09349 12.4214 2.13778 12.4068L5.02864 11.4494C5.17635 11.4008 5.31235 11.3171 5.42235 11.2068L10.5846 6.04455L7.95807 3.41827Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="text-title md:text-title0 line-clamp-1">{{ item.title }}</div>
                    <div class="text-gray-400 text-body1 md:text-title">{{ `${item.currentHour} : ${item.currentMintue}
                        ${item.time}` }}</div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div v-if="openModal" class="overlay">
            <CreateEvent :selected-date="selectedDate" @send-data="createEvent" @close="closeModal" />
        </div>
    </div>
</template>

<script lang="ts">
import Calendar from "../components/cards/Calendar.vue"
import CreateEvent from "../components/modal/CreateEvent.vue"

export default {
    components: {
        Calendar,
        CreateEvent
    },
    data() {
        return {
            year: 2024,
            cards: [] as number[],
            events: [] as event[],
            scrollBar: 0 as any,
            openModal: false as boolean,
            selectedDate: {} as date,
            currentMonth: (new Date().getMonth()) + 1,
            months: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
            db: null as any,
            objectStore: null as any,
            transaction: null as any
        }
    },
    mounted() {
        this.scrollBar = document.getElementById('scrollbar')
        this.cards = Array.from(Array(4), () => {
            return this.currentMonth++;
        })
        this.initiateIndexedDB()
    },
    methods: {
        initiateIndexedDB() {
            const request = indexedDB.open("Calendar", 1)

            request.onerror = (err: any) => {
                console.error(`Database error: ${err.target.errorCode}`);
            }

            request.onsuccess = (evt: any) => {
                this.db = evt.target.result
                this.getAllEvents()
            }

            request.onupgradeneeded = (evt: any) => {
                this.db = evt.target.result
                this.objectStore = this.db.createObjectStore("events", { keyPath: "id" })
                this.objectStore.createIndex("id", "id", { unique: true })
            }
        },
        getAllEvents() {
            const request = this.db.transaction('events').objectStore('events').getAll();

            request.onerror = (err: any) => {
                console.error(`Error to get all events: ${err}`)
            }

            request.onsuccess = () => {
                this.events = JSON.parse(JSON.stringify(request.result))
                console.table(request.result)
            }
        },
        previous() {
            if (this.cards[0] !== 1) {
                this.currentMonth = 0
                this.cards.unshift(this.cards[this.cards.length - 1] - 4)
                this.cards.pop()
            }
        },
        next() {
            if (this.cards[0] !== 12) {
                this.currentMonth = 0
                this.cards.shift()
                this.cards.push(this.cards[this.cards.length - 1] + 1)
            }
        },
        scrollNext() {
            this.scrollBar.scrollLeft += 212
            if (this.scrollBar.scrollLeft + this.scrollBar.clientWidth >= this.scrollBar.scrollBar) {
                this.scrollBar.scrollLeft = 0;
            }
        },
        scrollPrevious() {
            if (this.scrollBar.scrollLeft > 0) {
                this.scrollBar.scrollLeft -= 212
            }
        },
        getDate(date: date) {
            this.openModal = true
            this.selectedDate = date
        },
        createEvent(event: event) {
            event.id = Date.now()
            this.events.push(event)

            this.transaction = this.db.transaction(["events"], "readwrite")

            this.transaction.onerror = (event: any) => {
                console.log("A error has occured during transaction")
            }

            this.objectStore = this.transaction.objectStore("events")
            const request = this.objectStore.add(JSON.parse(JSON.stringify(event)));
            request.onsuccess = (evt: any) => {
                // console.log(evt.target.result)
            }

            this.closeModal()
        },
        closeModal() {
            this.openModal = false
        }
    }
}
</script>