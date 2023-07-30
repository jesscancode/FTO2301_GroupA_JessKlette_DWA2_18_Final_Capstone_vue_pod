import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'main',
  state: () => ({
    previews: [],
    show: null,
    sortMode: '', 
    genres: {}, 
    currentEpisode: null, 
    favoriteEpisodes: [],
  }),
  actions: {
    async fetchPreviews() {
      const response = await fetch('https://podcast-api.netlify.app/shows');
      const data = await response.json();
      this.previews = data;
      this.populateGenres(data); 
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
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        
        if (!response.ok) {
          console.error('Error fetching show:', response.status, response.statusText);
          const text = await response.text();
          console.error('Response content:', text);
          return;
        }
    
        let data = await response.json();
    
        data.seasons.forEach(season => {
          season.episodes.forEach(episode => {
            episode.id = `${data.id}-${episode.episode}`;
          });
        });
    
        this.show = data;
      } catch (error) {
        console.error('Error fetching show:', error);
      }
    },
    

    async fetchEpisode(showId, episodeNumber) {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
        const data = await response.json();
        const seasons = data.seasons;
        for (let season of seasons) {
          for (let episode of season.episodes) {
            if (episode.episode === episodeNumber) {
              this.currentEpisode = episode;
              return;
            }
          }
        }
        console.log("Episode not found");
      } catch (error) {
        console.error("Error fetching episode:", error);
      }
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

    playEpisode(episode) {
      this.currentEpisode = episode;
      let audio = new Audio(this.currentEpisode.file);
      audio.play();
    },

toggleFavoriteEpisode(episode) {
  if (!episode.id) {
    console.error('Episode ID is undefined:', episode);
    return;
  }
  const index = this.favoriteEpisodes.findIndex(favEpisode => favEpisode.id === episode.id);
  if (index !== -1) {
    this.favoriteEpisodes.splice(index, 1);
  } else {
    this.favoriteEpisodes.push({
      ...episode,
      show: this.show.title,
      season: episode.season,
      dateAdded: new Date()
    });
  }
},

sortFavoriteEpisodesByShowTitle(order = 'asc') {
  this.favoriteEpisodes.sort((a, b) => {
    if (order === 'asc') {
      return a.show.localeCompare(b.show);
    } else {
      return b.show.localeCompare(a.show);
    }
  });
},

sortFavoriteEpisodesByDateUpdated(order = 'asc') {
  this.favoriteEpisodes.sort((a, b) => {
    if (order === 'asc') {
      return new Date(a.dateAdded) - new Date(b.dateAdded);
    } else {
      return new Date(b.dateAdded) - new Date(a.dateAdded);
    }
  });
},

    isEpisodeFavorite(episodeId) {
      return this.favoriteEpisodes.some(favEpisode => favEpisode.id === episodeId);
    },
  },
  getters: {
    favoriteEpisodesData() {
      return [...this.favoriteEpisodes]; // return a copy of the array
    }
  }
});




