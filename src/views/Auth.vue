<template>
    <div class="flex justify-center items-center">
        <div class="w-full h-[500px] md:w-[450px] md:h-[550px] bg-white rounded-md">
            <SignUp />
        </div>
    </div>
</template>

<script lang="ts">
import SignUp from "../components/cards/SignUp.vue"
    export default {
        components: {
            SignUp
        }
    }
</script>