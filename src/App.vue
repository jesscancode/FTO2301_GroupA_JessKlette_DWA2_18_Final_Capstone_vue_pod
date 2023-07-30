<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';
import MenuItem from './components/MenuItem.vue';
import NavBar from './components/NavBar.vue';
import PodcastPlayer from './components/PodcastPlayer.vue';
import CardCarousel from './components/CardCarousel.vue';

useHead({
  title: 'vue-pod',
  meta: [
    { name: 'title', content: 'vue-pod' },
    { name: 'description', content: '💿 vue-pod 💿 A Podcast App' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://vue-pod.netlify.app/' },
    { property: 'og:title', content: 'vue-pod' },
    { property: 'og:description', content: '💿 vue-pod 💿 A Podcast App' },
    { property: 'og:image', content: 'https://metatags.io/images/meta-tags.png' },
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:url', content: 'https://vue-pod.netlify.app/' },
    { property: 'twitter:title', content: 'vue-pod' },
    { property: 'twitter:description', content: '💿 vue-pod 💿 A Podcast App' },
    { property: 'twitter:image', content: 'https://metatags.io/images/meta-tags.png' },
  ],
});

const route = useRoute();
let id = route.params.id;
let openMenu = ref(false)
</script>



<template>
  <div class="antialiased bg-gray-50 dark:bg-gray-900">
    <nav class="flex flex-wrap bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
      <div class="flex flex-wrap justify-between items-center">
        <div class="flex justify-start items-center">
          <button        
            data-drawer-target="drawer-navigation"
            data-drawer-toggle="drawer-navigation"
            aria-controls="drawer-navigation"
            class="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-pink-200 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg

              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <svg
              
              class="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Toggle sidebar</span>
          </button>
          <a href="https://www.youtube.com/watch?v=xIYJ7VaSxYY" class="flex items-center justify-between mr-4">
            <img
              src="/favicon/favicon.png"
              class="mr-3 h-8"
              alt="Logo"
            />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">VUE POD</span>
          </a>

<!-- PROFILE BUTTON AND DROP DOWN -->
          <div class="relative inline-block">
            
            <button
            @click="openMenu = !openMenu" 
            type="button"
            class="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 hover:ring-4 hover:ring-pink-500 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="dropdown"
          >

          <span class="sr-only">Open user menu</span>
            <img
              class="w-8 h-8 rounded-full"
              src="/images/paramore_profile.jpg"
              alt="user photo"
            />  
          </button>
<!-- Dropdown menu -->
          <div
            v-if="openMenu"
            class="absolute right z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
            id="dropdown"
          >
            <div class="py-3 px-4">
              <span
                class="block text-sm font-semibold text-gray-900 dark:text-white "
                >Hayley Williams</span
              >
              <span
                class="block text-sm text-gray-900 truncate dark:text-white"
                >hayley@paramore.com</span
              >
            </div>
            <ul
              class="py-1 text-gray-700 dark:text-gray-300"
              aria-labelledby="dropdown"
            >
              <li>
                <a
                  href="#"
                  class="block py-2 px-4 text-sm hover:bg-pink-200 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                  >My profile</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-4 text-sm hover:bg-pink-200 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                  >Account settings</a
                >
              </li>
            </ul>
            <ul
              class="py-1 text-gray-700 dark:text-gray-300"
              aria-labelledby="dropdown"
            >
              <li>
                <a
                  href="#"
                  class="flex items-center py-2 px-4 text-sm hover:bg-pink-200 dark:hover:bg-gray-600 dark:hover:text-white "
                  ><svg
                    class="mr-2 w-5 h-5 text-gray-400 "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  My likes</a
                >
              </li>

              <li>
                <a
                  href="#"
                  class="flex justify-between items-center py-2 px-4 text-sm hover:bg-pink-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <span class="flex items-center">
                    <svg
                      
                      class="mr-2 w-5 h-5 text-primary-600 dark:text-primary-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fill="currentColor" d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"/>
                      <path fill="#fff" d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"/>
                    </svg>
                    Subscribe
                  </span>
                  <svg
                    
                    class="w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
              </li>
            </ul>
            <ul
              class="py-1 text-gray-700 dark:text-gray-300"
              aria-labelledby="dropdown"
            >
              <li>
                <a
                  href="#"
                  class="block py-2 px-4 text-sm hover:bg-pink-200 dark:hover:bg-gray-600 dark:hover:text-white"
                  >Sign out</a
                >
              </li>
            </ul>
          </div>
          </div>        
        </div>
      </div>
    </nav>

    <!-- Sidebar -->

    <aside
      class="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidenav"
      id="drawer-navigation"
    >
      <div class="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
        <form action="#" method="GET" class="md:hidden mb-2">
          <label for="sidebar-search" class="sr-only">Search</label>
          <div class="relative">
            <div
              class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
            >
              <svg
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              name="search"
              id="sidebar-search"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Search"
            />
          </div>
        </form>


        
        <ul class="space-y-2">
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                
                class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"/>

              </svg>
              <span class="ml-3">Discover</span>
            </a>
          </li>
          
        </ul>
        <ul
          class="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700"
        >
 
        <RouterLink to="/">
            <MenuItem class="ml-[10px]" :iconSize="23" name="Home" iconString="home" pageUrl="/home" />
        </RouterLink>

        <RouterLink to="/">
            <MenuItem class="ml-[10px]" :iconSize="23" name="Search" iconString="search" pageUrl="/search" />
        </RouterLink>

        <RouterLink to="/">
            <MenuItem class="ml-[10px]" :iconSize="23" name="Recommended" iconString="recommended" pageUrl="/recommended" />
        </RouterLink>

        <RouterLink to="/favourite-shows">
            <MenuItem class="ml-[10px]" :iconSize="23" name="Favourite Shows" iconString="liked" pageUrl="/favourite-shows" />
        </RouterLink>

        <RouterLink to="/favourite-episodes">
            <MenuItem class="ml-[10px]" :iconSize="23" name="My Episode List" iconString="mylist" pageUrl="/favourite-episodes" />
        </RouterLink>

      </ul>

      </div>
    </aside>

    

    <main class="p-4 md:ml-64 h-auto pt-20 gradient-background">

      <NavBar />
      <CardCarousel v-if="route.name === 'Home'" />
      <RouterView />
  

    </main>

    
    <footer>
      <PodcastPlayer :id="id"/>
    </footer>
  </div>
</template>

