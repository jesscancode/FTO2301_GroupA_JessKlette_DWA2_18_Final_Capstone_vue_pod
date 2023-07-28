<script setup>
import { toRefs, ref } from 'vue'
import { RouterLink } from 'vue-router';

const props = defineProps({
    image: String,
    title: String,
    subTitle: String
})
const { image, title, subTitle } = toRefs(props)

const showPlayIcon = ref(false);
</script>


<template>
    <RouterLink to="library">

        <div 
      class="inline-block max-w-xs rounded-lg p-4 overflow-hidden bg-gray-800 transition-colors duration-400 cursor-pointer mb-8 hover:bg-gray-700 mx-2"
      @mouseover="showPlayIcon.value = true"
      @mouseleave="showPlayIcon.value = false"
    >
      <div class="relative mb-5">
        <img 
          class="block w-full shadow-lg" 
          src="https://peterattiamd.com/wp-content/uploads/2018/06/The-Drive-Podcast-Logo-3000x3000-768x768.png" 
          alt="cover" 
        />
        <div 
          class="absolute bottom-0 right-1 w-12 h-12 rounded-full text-white bg-pink-500 shadow-lg opacity-0 transition-opacity duration-400 transform hover:scale-110"
          :class="{'bottom-1 opacity-100': showPlayIcon}"
        >
        <img 
            src="/images/icons/play.png" 
            alt="Play Icon" 
            class="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-6 h-6"
          />    
    </div>
      </div>
      <div class="flex justify-between">


      
      <div class="text-white">
        <h4 class="mb-1">
          <a href="#" class="no-underline text-inherit hover:underline">{{ preview.title }}</a>
        </h4>
        <p class="overflow-hidden box-content h-10 text-sm text-gray-300">
          <a href="#" class="no-underline text-inherit hover:underline">{{ preview.description }}</a>
        </p>
      </div>
      
      <div class=" text-white text-right">
        <h4 class="mb-1">
          <a href="#" class="no-underline text-inherit hover:underline">2022</a>
        </h4>
        <p class="overflow-hidden box-content h-10 text-sm text-gray-300">
          <a href="#" class="no-underline text-inherit hover:underline">{{ preview.title }}</a>
        </p>
      </div>

    </div>
    </div>




    </RouterLink>
</template>
