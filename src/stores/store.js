import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'main',
  state: () => ({
    previews: [],
    show: null,
    sortMode: '', // add a new state to keep track of the current sorting mode
    genres: {}, // add a new state for the genre mappings
  }),
  actions: {
    async fetchPreviews() {
      const response = await fetch('https://podcast-api.netlify.app/shows');
      const data = await response.json();
      this.previews = data;
      this.populateGenres(data); // populate genres after fetching the data
      this.sortPreviews(); 
    },

    populateGenres(data) {
      const genreMappings = {
        1: "Personal Growth",
        2: "True Crime and Investigative Journalism",
        3: "History",
        4: "Comedy",
        5: "Entertainment",
        6: "Business",
        7: "Fiction",
        8: "News",
        9: "Kids and Family",
      };
      data.forEach(show => {
        show.genres.forEach(genreId => {
          this.genres[genreId] = genreMappings[genreId];
        });
      });
    },

    async fetchShow(id) {
      const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
      const data = await response.json();
      this.show = data;
    },

    sortPreviews() {
      switch (this.sortMode) {
        case 'A-Z':
          this.previews.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'Z-A':
          this.previews.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case 'Date Asc':
          this.previews.sort((a, b) => new Date(a.updated) - new Date(b.updated));
          break;
        case 'Date Desc':
          this.previews.sort((a, b) => new Date(b.updated) - new Date(a.updated));
          break;
        default:
          
          break;
      }
    },

    setSortMode(mode) {
      this.sortMode = mode;
      this.sortPreviews(); 
    },
  },
});
