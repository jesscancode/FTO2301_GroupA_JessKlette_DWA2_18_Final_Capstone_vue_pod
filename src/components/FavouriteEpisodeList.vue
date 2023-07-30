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
    return { groupedFavorites, sortByShowTitle, sortByDateUpdated };
  }
};

</script>

<template>
  <div class="p-8">
    <button @click="sortByShowTitle('asc')" class="rounded-lg bg-pink-600 p-2 ml-3 cursor-pointer">Sort by Show Title (A-Z)</button>
    <button @click="sortByShowTitle('desc')" class="rounded-lg bg-pink-600 p-2 ml-3 cursor-pointer">Sort by Show Title (Z-A)</button>
    <button @click="sortByDateUpdated('asc')" class="rounded-lg bg-pink-600 p-2 ml-3 cursor-pointer">Sort by Date Updated (Asc)</button>
    <button @click="sortByDateUpdated('desc')" class="rounded-lg bg-pink-600 p-2 ml-3 cursor-pointer">Sort by Date Updated (Desc)</button>
    <div v-for="(show, showTitle) in groupedFavorites" :key="showTitle" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-240">
      <div class="flex flex-col shrink rounded-lg mx-3 p-3 h-full overflow-hidden bg-gray-600 transition-colors duration-400 cursor-pointer hover:bg-pink-700">
        <div v-for="(season, seasonNumber) in show" :key="seasonNumber">
        <div class="px-0 pt-2 rounded-lg my-2 relative group">
          <div >
            <h2 class="text-white">{{ showTitle }}</h2>
            <h3 class="text-white">Season {{ seasonNumber }}</h3>
            <ul>
              <li v-for="episode in season" :key="episode.id" class="text-white">
                {{ episode.title }} - Added: {{ episode.dateAdded }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>


