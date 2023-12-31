<script>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '../stores/store.js';
import LoaderSpinner from '../components/LoaderSpinner.vue';

export default {
  name: "ShowView",
  components: {
    LoaderSpinner
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const id = route.params.id;

    onMounted(() => {
      if (id) {
        store.fetchShow(id);
      }
    });

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
};
</script>

<template>
  <div v-if="show" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 h-240">
    <router-link 
      v-for="season in show.seasons" 
      :key="season.season" 
      :to="{ name: 'Season', params: { id: id, seasonNumber: season.season } }"
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
    </router-link>
  </div>
  <div v-else>
      <div class="flex justify-center items-center min-h-screen">
          <LoaderSpinner />
      </div>
  </div>
</template>
