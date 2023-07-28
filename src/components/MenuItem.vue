<script setup>
import { ref, toRefs, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const props = defineProps({
    iconString: String,
    iconSize: Number,
    pageUrl: String,
    name: String
})
const { iconString, pageUrl, name, iconSize } = toRefs(props)

let icon = ref(null)
let textIsHover = ref(false)

watchEffect(() => {
    if (route.path == pageUrl.value) {
        icon.value = iconString.value + '-active'
        textIsHover.value = true
    } else {
        icon.value = iconString.value + '-inactive'
        textIsHover.value = false
    }
})

const isHover = () => {
    if (icon.value === iconString.value + '-active') return

    if (icon.value === iconString.value + '-inactive') {
        icon.value = iconString.value + '-inactive-hover'
        textIsHover.value = true
    } else if (icon.value === iconString.value + '-inactive-hover') {
        icon.value = iconString.value + '-inactive'
        textIsHover.value = false
    }
}
</script>

<template>
    <li 
        class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" 
        @mouseenter="isHover()" 
        @mouseleave="isHover()"
    >
        <img :width="iconSize" :src="`/images/icons/${icon}.png`">
        <div
            :class="textIsHover ? 'text-pink-500 ' : 'text-black'"
            class="font-semibold text-[14px] ml-4 mt-0.5"
        >
            <span :class="route.path == pageUrl ? 'text-black' : ''">{{ name }}</span>
        </div>
    </li>
</template>