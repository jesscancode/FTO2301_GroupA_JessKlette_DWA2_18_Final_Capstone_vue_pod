<script>
import { useStore } from '../stores/store.js';
import { computed } from 'vue';

export default {
  setup() {
    const store = useStore();
    const favoriteEpisodes = computed(() => store.favoriteEpisodesData);
    const groupedFavorites = computed(() => {
      let grouped = {};
      favoriteEpisodes.value.forEach(episode => {
        if (!grouped[episode.show]) {
          grouped[episode.show] = {};
        }
        if (!grouped[episode.show][episode.season]) {
          grouped[episode.show][episode.season] = [];
        }
        grouped[episode.show][episode.season].push(episode);
      });
      return grouped;
    });
    const sortByShowTitle = (order) => {
      store.sortFavoriteEpisodesByShowTitle(order);
    };
    const sortByDateUpdated = (order) => {
      store.sortFavoriteEpisodesByDateUpdated(order);
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };
    return { groupedFavorites, sortByShowTitle, sortByDateUpdated, formatDate };
  }
};

</script>

<template>
  <div class="p-8">
    <button @click="sortByShowTitle('asc')" class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800">Sort by Show Title (A-Z)</button>
    <button @click="sortByShowTitle('desc')" class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800">Sort by Show Title (Z-A)</button>
    <button @click="sortByDateUpdated('asc')" class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800">Sort by Date Updated (Asc)</button>
    <button @click="sortByDateUpdated('desc')" class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800">Sort by Date Updated (Desc)</button>
    <div v-for="(show, showTitle) in groupedFavorites" :key="showTitle" class="rounded-lg mx-3 mt-5 p-3 h-full overflow-hidden bg-gray-600 transition-colors duration-400 cursor-pointer hover:bg-pink-700">
      <h2 class="text-white font-semibold">{{ showTitle }}</h2>
      <div v-for="(season, seasonNumber) in show" :key="seasonNumber">
        <h3 class="text-white">Season {{ seasonNumber }}</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-240 mb-5">
          <ul>
            <li v-for="episode in season" :key="episode.id" class="items-center bg-gray-100 p-4 rounded-lg my-3">
              <h1 class="font-semibold">Episode: {{ episode.title }} </h1>
              <h2>Added: {{ formatDate(episode.dateAdded)}}</h2>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


