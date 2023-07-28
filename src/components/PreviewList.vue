<script>

import { RouterLink } from 'vue-router';
import { useStore } from '../stores/store.js';

export default {
  setup() {
  const store = useStore();

  store.fetchPreviews();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
      
    return `${year}`;
  }

  const getGenres = (genreIds) => {
      return genreIds.map(id => store.genres[id]).join(', ');
    }

    return { store, formatDate, getGenres };
},

  
};
</script>
<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 h-240">
    <router-link 
      v-for="preview in store.previews" 
      :key="preview.id" 
      :to="{ name: 'Show', params: { id: preview.id } }"
      class=" px-0 pt-2 rounded-lg my-2"
    >
      <div class="group flex flex-col shrink rounded-lg mx-3 p-3 h-full overflow-hidden bg-gray-600 transition-colors duration-400 cursor-pointer hover:bg-pink-700">
        <div class="relative mb-5 mx-3">
          <img 
            class="block w-full shadow-lg rounded-lg mt-2" 
            :src="preview.image" 
            alt="Podcast image"
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
              {{ preview.title }}
            </h4>
            <p class="overflow-hidden box-content h-10 text-sm text-gray-300">
              {{ getGenres(preview.genres) }}
            </p>
          </div>
          <div class="text-white text-right">
            <h4 class="mb-1">
              {{ formatDate(preview.updated) }} 
            </h4>
            <p class="overflow-hidden box-content h-10 text-xs text-gray-300">
              Seasons {{ preview.seasons }} 
            </p>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>
