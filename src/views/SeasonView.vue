<!-- <script>
import { ref, onMounted, watch } from 'vue';
import { useStore } from '../stores/store.js';
import LoaderSpinner from '../components/LoaderSpinner.vue';

export default {
  name: "SeasonView",
  components: {
    LoaderSpinner
  },
  setup(props) {
    const store = useStore();
    const { id, seasonNumber } = props;
    const season = ref(null);

    onMounted(async () => {
      await store.fetchShow(id);
    });

    watch(() => store.show, (newShow) => {
      if (newShow) {
        season.value = newShow.seasons.find(s => s.season === seasonNumber);
      }
    });

    return { season };
  },
  props: {
    id: {
      type: String,
      required: true
    },
    seasonNumber: {
      type: Number,
      required: true
    }
  },
};
</script>

<template>
    <div v-if="season" class="flex flex-col w-full mb-40 mt-5">
      <ul class="space-y-4">
        <li v-for="(episode, index) in season.episodes" :key="index" class="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
          <article class="flex items-center space-x-4">
            <div class="rounded-full p-3 bg-pink-500" aria-hidden="true"> 
                <span class="font-bold text-lg">{{ index + 1 }}</span>
            </div>
            <div class="mr-20">
              <p class="font-medium">{{ episode.title }}</p>
              <small class="text-gray-500">{{ episode.description }}</small>
            </div>
          </article>
          <div class="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 ml-1">
            <div class="rounded-full p-3 bg-pink-500 cursor-pointer hover:bg-pink-700 scale-100 hover:scale-150 transition-transform duration-200" aria-hidden="true"> 
              <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 20">
                <path class="fill-current" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m11.479 1.712 2.367 4.8a.532.532 0 0 0 .4.292l5.294.769a.534.534 0 0 1 .3.91l-3.83 3.735a.534.534 0 0 0-.154.473l.9 5.272a.535.535 0 0 1-.775.563l-4.734-2.49a.536.536 0 0 0-.5 0l-4.73 2.487a.534.534 0 0 1-.775-.563l.9-5.272a.534.534 0 0 0-.154-.473L2.158 8.48a.534.534 0 0 1 .3-.911l5.294-.77a.532.532 0 0 0 .4-.292l2.367-4.8a.534.534 0 0 1 .96.004Z"/>
              </svg>
            </div>
            <button 
              @click="$emit('play-episode', episode)" 
              class="rounded-full p-3 bg-pink-500 cursor-pointer hover:bg-pink-700 scale-100 hover:scale-150 transition-transform duration-200" 
              aria-hidden="true"
            > 
              <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 10 16">
                <path d="M3.414 1A2 2 0 0 0 0 2.414v11.172A2 2 0 0 0 3.414 15L9 9.414a2 2 0 0 0 0-2.828L3.414 1Z"/>
              </svg>
            </button>
          </div>
        </li>
      </ul>
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
   -->



   <script>
import { ref, onMounted, watch } from 'vue';
import { useStore } from '../stores/store.js';
import LoaderSpinner from '../components/LoaderSpinner.vue';

export default {
  name: "SeasonView",
  components: {
    LoaderSpinner
  },
  setup(props) {
    const store = useStore();
    const { id, seasonNumber } = props;
    const season = ref(null);
    const show = ref(null);
    

    onMounted(async () => {
      await store.fetchShow(id);
    });

    watch(() => store.show, (newShow) => {
      if (newShow) {
        season.value = newShow.seasons.find(s => s.season === seasonNumber);
        show.value = newShow;
      }
    });

    const playEpisode = (episode) => {
      store.playEpisode(episode.file);
      console.log(episode.file)
    };

    return { season, playEpisode, show };
  },
  props: {
    id: {
      type: String,
      required: true
    },
    seasonNumber: {
      type: Number,
      required: true
    }
  },
};
</script>

 
   
   

<template>
    <div v-if="season" class="flex flex-col w-full mb-40 mt-5">
      <ul class="space-y-4">
        <li 
          v-for="(episode, index) in season.episodes" 
          :key="index" 
          class="flex justify-between items-center bg-gray-100 p-4 rounded-lg"
        >
          <article class="flex items-center space-x-4">
            <div class="rounded-full p-3 bg-pink-500" aria-hidden="true"> 
                <span class="font-bold text-lg">{{ index + 1 }}</span>
            </div>
            <div class="mr-20">
              <p class="font-medium">{{ episode.title }}</p>
              <small class="text-gray-500">{{ episode.description }}</small>
            </div>
          </article>
          <div class="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 ml-1">
            <div class="rounded-full p-3 bg-pink-500 cursor-pointer hover:bg-pink-700 scale-100 hover:scale-150 transition-transform duration-200" aria-hidden="true"> 
              <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 20">
                <path class="fill-current" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m11.479 1.712 2.367 4.8a.532.532 0 0 0 .4.292l5.294.769a.534.534 0 0 1 .3.91l-3.83 3.735a.534.534 0 0 0-.154.473l.9 5.272a.535.535 0 0 1-.775.563l-4.734-2.49a.536.536 0 0 0-.5 0l-4.73 2.487a.534.534 0 0 1-.775-.563l.9-5.272a.534.534 0 0 0-.154-.473L2.158 8.48a.534.534 0 0 1 .3-.911l5.294-.77a.532.532 0 0 0 .4-.292l2.367-4.8a.534.534 0 0 1 .96.004Z"/>
              </svg>
            </div>
            <button 
              @click="playEpisode(episode)" 
              class="rounded-full p-3 bg-pink-500 cursor-pointer hover:bg-pink-700 scale-100 hover:scale-150 transition-transform duration-200" 
              aria-hidden="true"
            > 
              <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 10 16">
                <path d="M3.414 1A2 2 0 0 0 0 2.414v11.172A2 2 0 0 0 3.414 15L9 9.414a2 2 0 0 0 0-2.828L3.414 1Z"/>
              </svg>
            </button>
          </div>
        </li>
      </ul>
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
