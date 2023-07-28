<script>
import { onMounted, computed } from 'vue';
import { useStore } from '../stores/store.js';
import { Swiper, SwiperSlide } from 'swiper/vue';
import LoaderSpinner from '../components/LoaderSpinner.vue';
import 'swiper/css'; 

export default {
  components: {
    Swiper, 
    SwiperSlide,
    LoaderSpinner
  },
  setup() {
    const store = useStore();
    onMounted(() => {
      store.fetchPreviews();
    });

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

    const limitPreviews = computed(() => {
      return store.previews.slice(0, 10);
    });

    return { store, formatDate, getGenres, limitPreviews };
  },
};
</script>

<template>
  <div>
    <h1 class="text-2xl mt-5 font-semibold hover:underline cursor-pointer">Recommended Podcasts</h1>
    <div v-if="store.previews.length > 0">
      <swiper :slides-per-view="1" :space-between="20" :breakpoints="{
        640: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 40
        },
        1280: {
          slidesPerView: 5,
          spaceBetween: 50
        }
      }">
          <swiper-slide v-for="preview in limitPreviews" :key="preview.id">
            <router-link 
              :to="{ name: 'Show', params: { id: preview.id } }"
              class="group flex flex-col shrink rounded-lg p-3 mt-5 h-full overflow-hidden bg-pink-500 transition-colors duration-400 cursor-pointer hover:bg-pink-700"
            >
          <div class="relative mb-5">
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
              <!-- <p class="overflow-hidden box-content h-10 text-sm text-gray-300">
                {{ getGenres(preview.genres) }}
              </p> -->
            </div>
            <div class="text-white text-right">
              <!-- <h4 class="mb-1">
                {{ formatDate(preview.updated) }} 
              </h4> -->
              <p class="overflow-hidden box-content h-10 text-xs text-gray-300">
                Seasons {{ preview.seasons }} 
              </p>
            </div>
          </div>
        </router-link>
      </swiper-slide>
        </swiper>
    </div>
    <div v-else>
      <div class="flex justify-center items-center min-h-screen">
          <LoaderSpinner />
      </div>
    </div>
  </div>
</template>
  