import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShowView from '../views/ShowView.vue' 
import FavouriteShowsView from '../views/FavouriteShowsView.vue'
import FavouriteEpisodesView from '../views/FavouriteEpisodesView.vue'
import SeasonView from '../views/SeasonView.vue' 
import PodcastPlayer from '../components/PodcastPlayer.vue' 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/show/:id',
      name: 'Show',
      component: ShowView,
      props: true
    },
    {
      path: '/favourite-shows',
      name: 'favourite-shows',
      component: FavouriteShowsView,
      props: true
    },
    {
      path: '/favourite-episodes',
      name: 'favourite-episodes',
      component: FavouriteEpisodesView,
      props: true
    },
    {
      path: '/show/:id/season/:seasonNumber',
      name: 'Season',
      component: SeasonView,
      props: route => ({ id: route.params.id, seasonNumber: Number(route.params.seasonNumber) })
    },

    {
      path: '/episode/:episodeId',
      name: 'PodcastPlayer',
      component: PodcastPlayer,
      props: true
    },
    
  ]
})

export default router
