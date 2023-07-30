<!-- <script>

import { RouterLink } from 'vue-router';
import { useStore } from '../stores/store.js';
import LoaderSpinner from '../components/LoaderSpinner.vue';

export default {
  components: {
    LoaderSpinner
  },
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
</script> -->

<script>
import { useRoute } from 'vue-router';
import { useStore } from '../stores/store.js';
import { watch } from 'vue'; // Import the watch function

import LoaderSpinner from '../components/LoaderSpinner.vue';

export default {
  components: {
    LoaderSpinner
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    store.fetchPreviews();

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const day = String(date.getUTCDate()).padStart(2, '0');

      return `${year}`;
    };

    const getGenres = (genreIds) => {
      return genreIds.map(id => store.genres[id]).join(', ');
    };

    const fetchShowData = async (id) => {
      if (id) {
        await store.fetchShow(id);
      }
    };

    fetchShowData(route.params.id);

    watch(() => route.params.id, (newId, oldId) => {
      if (newId !== oldId) {
        fetchShowData(newId);
      }
    });

    return { store, formatDate, getGenres };
  },
};
</script>

<template>
  <div v-if="store.previews.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 h-240">
    <router-link
  v-for="preview in store.previews"
  :key="preview.id"
  :to="{ name: 'Show', params: { id: preview.id } }"
  class="px-0 pt-2 rounded-lg my-2 relative group"
>
      <div class="flex flex-col shrink rounded-lg mx-3 p-3 h-full overflow-hidden bg-gray-600 transition-colors duration-400 cursor-pointer hover:bg-pink-700">
        <div class="relative mb-5 mx-3">
          <img 
            class="block w-full shadow-lg rounded-lg mt-2" 
            :src="preview.image" 
            alt="Podcast image"
          />
          <!-- <div class="absolute top-5 right-3 rounded-full p-2 bg-pink-500 scale-100 hover:scale-150 transition-transform duration-200">
            <svg class="w-4 h-4 text-gray-900 dark:text-white fill-current" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 20">
              <path stroke="none" class="fill-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m11.479 1.712 2.367 4.8a.532.532 0 0 0 .4.292l5.294.769a.534.534 0 0 1 .3.91l-3.83 3.735a.534.534 0 0 0-.154.473l.9 5.272a.535.535 0 0 1-.775.563l-4.734-2.49a.536.536 0 0 0-.5 0l-4.73 2.487a.534.534 0 0 1-.775-.563l.9-5.272a.534.534 0 0 0-.154-.473L2.158 8.48a.534.534 0 0 1 .3-.911l5.294-.77a.532.532 0 0 0 .4-.292l2.367-4.8a.534.534 0 0 1 .96.004Z"/>
          </svg>
          </div> -->

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
        <div class="flex justify-between ">
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
  <div v-else>
    <div class="flex justify-center items-center min-h-screen">
        <LoaderSpinner />
    </div>
  </div>
</template>

<style>
.fill-current:hover {
  fill: #fff; 
}
</style>
