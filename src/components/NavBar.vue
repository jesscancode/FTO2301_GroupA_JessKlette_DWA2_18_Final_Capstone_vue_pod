
<script>
import { ref } from 'vue';
import { useStore } from '../stores/store.js';
import { useRoute, useRouter } from 'vue-router';
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue';
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue';
import Tune from 'vue-material-design-icons/Tune.vue';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const showDropdown = ref(false);

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };

    const setSortMode = (mode) => {
      store.setSortMode(mode);
      toggleDropdown();
    };

    const goBack = () => {
      router.back();
    };

    const goForward = () => {
      router.forward();
    };

    return {
      showDropdown,
      toggleDropdown,
      setSortMode,
      goBack,
      goForward
    };
  },
  components: {
    ChevronLeft,
    ChevronRight,
    Tune,
  },
};
</script>


<template>
  <nav class="bg-black border-gray-200 rounded-lg">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <div class="flex ">
        <button 
          type="button" 
          class="rounded-full bg-pink-600 p-[1-px] cursor-pointer"
          @click="goBack"
        >
          <ChevronLeft fillColor="#FFF" size=30 />
        </button>
        <button 
          type="button" 
          class="rounded-full bg-pink-600 p-[1-px] ml-3 cursor-pointer"
          @click="goForward"
        >
          <ChevronRight fillColor="#FFF" size=30 />
        </button>
        <button 
          type="button" 
          class="rounded-full bg-pink-600 p-[1-px] ml-3 cursor-pointer" 
          @click="toggleDropdown"
        >
          <Tune fillColor="#FFF" size=30 />
        </button>
        <div v-if="showDropdown" class="absolute mt-12 w-48 z-50 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a 
              href="#" 
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-200" 
              role="menuitem" 
              @click="setSortMode('A-Z')"
            >
              A-Z
            </a>
            <a 
              href="#" 
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-200" 
              role="menuitem" 
              @click="setSortMode('Z-A')"
            >
              Z-A
            </a>
            <a 
              href="#" 
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-200" 
              role="menuitem" 
              @click="setSortMode('Date Asc')"
            >
              Date Asc
            </a>
            <a 
              href="#" 
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-200" 
              role="menuitem" 
              @click="setSortMode('Date Desc')"
            >
              Date Desc
            </a>
          </div>
        </div>
        <div class="flex mx-5">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg 
                class="w-4 h-4 text-gray-500" 
                aria-hidden="true" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 20 20"
              >
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
              <span class="sr-only">Search icon</span>
            </div>
            <input 
              type="text" 
              id="search-navbar" 
              class="flex w-full p-2 pl-10 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-pink-500 focus:border-pink-500" 
              placeholder="Search..."
            >
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

