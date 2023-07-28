<script>
import { computed } from 'vue';
import { useStore } from '../stores/store.js';

export default {
  name: "ShowView",
  setup(props) {
    const store = useStore();
    const { id } = props;

    store.fetchShow(id);

    const show = computed(() => store.show);

    const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
      
    return `${year}`;
    }
    return { show, formatDate };
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
};
</script>

<!-- <template>
  <div v-if="show" class="group flex flex-col shrink rounded-lg p-3 h-full  w-60 overflow-hidden bg-gray-600 transition-colors duration-400 cursor-pointer hover:bg-pink-700">
    <div class="relative mb-5">
      <img 
        class="block w-full shadow-lg rounded-lg mt-2" 
        :src="show.image" 
        alt="Show image"
      />
      <div 
        class="absolute flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-16 h-16 rounded-full bg-pink-500 opacity-0 group-hover:opacity-100 scale-100 hover:scale-150 transition-transform duration-200"
      >
        <img 
          src="/images/icons/play.png" 
          alt="Play Icon" 
          class="w-10"
        />  
      </div>
    </div>
    <div class="flex justify-between">
      <div class="text-white">
        <h4 class="mb-1 font-semi-bold">
          {{ show.title }}
        </h4>
        <p class="overflow-hidden box-content h-10 text-sm text-gray-300">
          {{ show.description }}
        </p>
      </div>
      <div class="text-white text-right">
        <h4 class="mb-1">
          {{ formatDate(show.updated) }}  
        </h4>
        <p class="overflow-hidden box-content h-10 text-xs text-gray-300">
          Seasons {{ show.seasons.length }} 
        </p>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template> -->


<template>
  <div v-if="show" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 h-240">
    <div 
      v-for="season in show.seasons" 
      :key="season.season" 
      class="group flex flex-col shrink rounded-lg p-3 h-full overflow-hidden bg-gray-600 transition-colors duration-400 cursor-pointer hover:bg-pink-700"
    >
      <div class="relative mb-5">
        <img 
          class="block w-full shadow-lg rounded-lg mt-2" 
          :src="season.image" 
          alt="Season image"
        />
        <div 
          class="absolute flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-16 h-16 rounded-full bg-pink-500 opacity-0 group-hover:opacity-100 scale-100 hover:scale-150 transition-transform duration-200"
        >
          <img 
            src="/images/icons/play.png" 
            alt="Play Icon" 
            class="w-10"
          />  
        </div>
      </div>
      <div class="flex justify-between">
        <div class="text-white">
          <h4 class="mb-1 font-semi-bold">
            {{ season.title }}
          </h4>
          <!-- Display the first episode's description as an example -->
          <p class="overflow-hidden box-content h-10 text-sm text-gray-300">
            {{ season.episodes[0].description }}
          </p>
        </div>
        <div class="text-white text-right">
          <h4 class="mb-1">
            {{ formatDate(show.updated) }} 
          </h4>
          <p class="overflow-hidden box-content h-10 text-xs text-gray-300">
            Episodes {{ season.episodes.length }} 
          </p>
        </div>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>