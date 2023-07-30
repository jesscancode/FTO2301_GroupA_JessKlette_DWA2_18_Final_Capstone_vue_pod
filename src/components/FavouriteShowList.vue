<script>

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
</script>
<template>
  <div v-if="store.previews.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 h-240">
    <h1>Favourite Shows</h1>
          
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
