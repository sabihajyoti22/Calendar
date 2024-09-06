<template>
    <div>
        <div class="flex justify-between items-center text-white mb-5">
            <div class="text-title md:text-title1">Calendar</div>
            <div>
                <div class="text-caption md:text-title flex items-center gap-1 p-1 rounded-md hover:bg-background1 hover:bg-opacity-50 hover:cursor-pointer"
                    @click="toggelYear">
                    <div>{{ year }}</div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M7.5 8L6 9.5L12.0703 15.5703L18.1406 9.5L16.6406 8L12.0703 12.5703L7.5 8Z"
                            fill="#ffffff" />
                    </svg>
                </div>

                <div v-if="expandYears" class="fixed bg-white rounded-md mt-1 z-50 shadow-lg">
                    <div class="text-secondary1 text-caption md:text-title px-4 py-1 text-center hover:bg-background1 hover:bg-opacity-50 hover:cursor-pointer"
                        v-for="item in years" :key="item" @click="selectYear(item)">{{ item }}</div>
                </div>
            </div>
        </div>

        <div class="flex justify-between md:justify-evenly items-center flex-wrap mb-20 md:mb-24">
            <button @click="previous"
                class="w-10 h-10 grid place-content-center rounded-full border border-background1 hover:bg-background1 order-1 md:order-1 mb-3 md:mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M14.0703 6L8 12.0703L14.0703 18.1406L15.5703 16.6406L11 12.0703L15.5703 7.5L14.0703 6Z"
                        fill="#ffffff" />
                </svg>
            </button>

            <div class="order-3 md:order-1 w-full h-[500px] md:w-[400px] md:h-[550px] relative">
                <Calendar :month="item" :year="year" v-for="(item, index) in cards" :key="item"
                    :style="{ transform: `scale(${4 / (4 + (index * 0.1))}) translate(0px, ${index * 25}px)`, opacity: `${(4 - index) / 4}` }"
                    class="w-full h-fu absolute ease-in-out duration-300" :class="{ 'z-40': index === 0 }"
                    @selectedDate="getDate" />

            </div>

            <button @click="next"
                class="w-10 h-10 grid place-content-center rounded-full border border-background1 hover:bg-background1 order-2 md:order-1 mb-3 md:mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9.5 6L8 7.5L12.5703 12.0703L8 16.6406L9.5 18.1406L15.5703 12.0703L9.5 6Z"
                        fill="#ffffff" />
                </svg>
            </button>
        </div>

        <div v-if="events.length" class="md:ml-12 mb-3 md:mb-6">
            <div class="hidden md:flex justify-between items-center mb-3 md:mb-5">
                <div class="text-title md:text-title0 text-white">Upcoming Events</div>
                <div v-if="events.length > 4" class="flex gap-2">
                    <button @click="scrollPrevious"
                        class="w-8 h-8 grid place-content-center rounded-full border border-background1 hover:bg-background1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M14.0703 6L8 12.0703L14.0703 18.1406L15.5703 16.6406L11 12.0703L15.5703 7.5L14.0703 6Z"
                                fill="#ffffff" />
                        </svg>
                    </button>
                    <button @click="scrollNext"
                        class="w-8 h-8 grid place-content-center rounded-full border border-background1 hover:bg-background1 mb-3 md:mb-0">
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

                        <div class="flex gap-1">
                            <button @click="editData(item)"
                                class="h-6 w-6 rounded-full grid place-content-center hover:bg-background1 group">
                                <svg class="fill-[#7A6FCB] group-hover:fill-white" xmlns="http://www.w3.org/2000/svg"
                                    width="18" height="18" viewBox="0 0 24 24">
                                    <path
                                        d="M18.4141 2C18.1581 2 17.902 2.09797 17.707 2.29297L15.707 4.29297L14.293 5.70703L3 17V21H7L21.707 6.29297C22.098 5.90197 22.098 5.26891 21.707 4.87891L19.1211 2.29297C18.9261 2.09797 18.6701 2 18.4141 2ZM18.4141 4.41406L19.5859 5.58594L18.293 6.87891L17.1211 5.70703L18.4141 4.41406ZM15.707 7.12109L16.8789 8.29297L6.17188 19H5V17.8281L15.707 7.12109Z" />
                                </svg>
                            </button>

                            <button @click="deleteEvent(item.id)"
                                class="h-6 w-6 rounded-full grid place-content-center hover:bg-pink hover:bg-opacity-50 group">
                                <svg class="fill-[#F44D84] group-hover:fill-white" xmlns="http://www.w3.org/2000/svg"
                                    width="18" height="18" viewBox="0 0 24 24">
                                    <path
                                        d="M16 9V19H8V9H16ZM14.5 3H9.5L8.5 4H5V6H19V4H15.5L14.5 3ZM18 7H6V19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="text-title md:text-title0 line-clamp-1">{{ item.title }}</div>
                    <div class="text-gray-400 text-body1 md:text-title">{{ `${item.currentHour < 10 ? '0' +
                        item.currentHour : item.currentHour} : ${item.currentMintue < 10 ? '0' + item.currentMintue
                            : item.currentMintue} ${item.time}` }}
                    </div>
                </div>
            </div>
        </div>

        <div v-if="openModal" class="overlay">
            <CreateEvent :selected-date="selectedDate" :updatedValue="updatedValue" @send-data="getData"
                @close="closeModal" />
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
        function opt<T>() { return undefined as T | undefined }
        return {
            year: 2024,
            years: [2024, 2025, 2026, 2027, 2028, 2029, 2030] as number[],
            cards: [] as number[],
            events: [] as event[],
            scrollBar: 0 as any,
            expandYears: false as boolean,
            openModal: false as boolean,
            selectedDate: {} as date,
            currentMonth: (new Date().getMonth()) + 1,
            months: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
            updatedValue: opt<event>(),
            channel2: new BroadcastChannel('channel2'),
            channel1: new BroadcastChannel('channel1'),
            msg: new MessageChannel()
        }
    },
    mounted() {
        this.cards = Array.from(Array(4), () => {
            return this.currentMonth++
        })

        this.channel1.postMessage('initialised IndexedDB')

        this.channel2.onmessage = (event) => {
            if(event.data.toDo === "getAllEvents"){
                this.events = JSON.parse(JSON.stringify(event.data.data))
            }
            else if(event.data.toDo === 'sendNotification' && Notification.permission === 'granted'){
                console.log("notified")
                this.notify(JSON.parse(JSON.stringify(event.data.data)))
                this.deleteEvent(JSON.parse(JSON.stringify(event.data.data.id)))
            }
        }

        navigator.serviceWorker.onmessage = (event) => {
            console.log('event in app.js nav on msg', event);
            // if (event.data.toUpdate) {
            //     alert('Please refresh your page to upadate service worker');
            // }
        }
    },
    methods: {
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
            this.scrollBar = document.getElementById('scrollbar')
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
            this.updatedValue = undefined
        },
        toggelYear() {
            this.expandYears = !this.expandYears
        },
        selectYear(year: number) {
            this.year = year
        },
        editData(event: event) {
            this.updatedValue = event

            const { id, title, currentHour, currentMintue, time, ...rest } = this.updatedValue
            this.selectedDate = rest

            this.openModal = true
        },
        getData(event: event) {
            if(event){
                if (event.id) {
                this.channel2.postMessage({
                    toDo: 'update',
                    data: JSON.parse(JSON.stringify(event))
                })
            } else {
                this.channel2.postMessage({
                    toDo: 'create',
                    data: JSON.parse(JSON.stringify(event))
                })
            }
            }
            this.closeModal()
        },
        deleteEvent(id: number) {
            navigator.serviceWorker.controller?.postMessage({
                toDo: 'delete',
                id: JSON.parse(JSON.stringify(id))
            })
            // this.channel2.postMessage({
            //     toDo: 'delete',
            //     id: JSON.parse(JSON.stringify(id))
            // })
        },
        closeModal() {
            this.openModal = false
        },
        notify(currentEvent: event) {
            const title: string = 'Notify Calendar'
            const msg: string = `${currentEvent.title} is on ${currentEvent.currentHour} : ${currentEvent.currentMintue < 10 ? '0' + currentEvent.currentMintue : currentEvent.currentMintue} ${currentEvent.time}`
            const icon: string = '/images/calendarLogo.jpg'

            navigator.serviceWorker.ready.then(function(registrations) {
                registrations.showNotification(title, {
                    icon: icon,
                    body: msg,
                    tag: 'calendar'
                })
            })
        }
    }
}
</script>