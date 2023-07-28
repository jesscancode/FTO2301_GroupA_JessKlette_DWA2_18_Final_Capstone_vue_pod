import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShowView from '../views/ShowView.vue' 
import FavouritesView from '../views/FavouritesView.vue'
import SeasonView from '../views/SeasonView.vue' 

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
      path: '/favourites',
      name: 'Favourites',
      component: FavouritesView
    },
    {
      path: '/show/:id/season/:seasonNumber',
      name: 'Season',
      component: SeasonView,
      props: route => ({ id: route.params.id, seasonNumber: Number(route.params.seasonNumber) })
    },
    
  ]
})

export default router
