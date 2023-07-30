<!-- <script>
import { useRoute } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import { useStore } from '../stores/store';
import LoaderSpinner from './LoaderSpinner.vue';

export default {
  name: 'PodcastPlayer',
  components: {
    LoaderSpinner,
  },
  props: [],
  setup(props) {
    console.log(props);
    const store = useStore();
    const route = useRoute();
    const show = ref(null);
    const currentEpisode = ref(store.currentEpisode);
    const playing = ref(false);
    const audioRef = ref(null);
    const loading = ref(false);

    const togglePlay = () => {
      if (playing.value) {
        audioRef.value.pause();
      } else {
        audioRef.value.play();
      }
      playing.value = !playing.value;
    };

    onMounted(async () => {
  const episodeId = route.params.episodeId;
  loading.value = true;
  await store.fetchEpisode(episodeId);
  currentEpisode.value = store.currentEpisode;
  audioRef.value.src = store.currentEpisode.file;
  loading.value = false;
});

watch(() => route.params, async (newParams) => {
  const episodeId = newParams.episodeId;
  loading.value = true;
  await store.fetchEpisode(episodeId);
  currentEpisode.value = store.currentEpisode;
  audioRef.value.src = store.currentEpisode.file;
  loading.value = false;
});

    return { show, currentEpisode, playing, audioRef, togglePlay, loading };
  },
};
</script>


<template>
    <audio :ref="audioRef"></audio>
    <audio ref="player" controls></audio>

    <div class="fixed bottom-0 left-0 z-50 grid w-full h-24 grid-cols-1 px-8 bg-white border-t border-gray-200 md:grid-cols-3 dark:bg-gray-700 dark:border-gray-600">
      <div class="items-center justify-center hidden mr-auto text-gray-500 dark:text-gray-400 md:flex">
        <LoaderSpinner v-if="loading" />
        <img v-if="show" class="h-8 mr-3 rounded" :src="show.image" :alt="show.title">
        <span v-if="show" class="text-sm">{{ show.title }}</span>

      </div>
      <div class="flex items-center w-full">
        <div class="w-full">
            <div class="flex items-center justify-center mx-auto mb-1">
                <button data-tooltip-target="tooltip-shuffle" type="button" class="p-2.5 group rounded-full hover:bg-pink-200 mr-1 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.484 6.166 13 4h6m0 0-3-3m3 3-3 3M1 14h5l1.577-2.253M1 4h5l7 10h6m0 0-3 3m3-3-3-3"/>
                    </svg>
                    <span class="sr-only">Shuffle Podcast</span>
                </button>
                <div id="tooltip-shuffle" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Shuffle Podcast
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
                <button data-tooltip-target="tooltip-previous" type="button" class="p-2.5 group rounded-full hover:bg-pink-200 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 12 16">
                        <path d="M10.819.4a1.974 1.974 0 0 0-2.147.33l-6.5 5.773A2.014 2.014 0 0 0 2 6.7V1a1 1 0 0 0-2 0v14a1 1 0 1 0 2 0V9.3c.055.068.114.133.177.194l6.5 5.773a1.982 1.982 0 0 0 2.147.33A1.977 1.977 0 0 0 12 13.773V2.227A1.977 1.977 0 0 0 10.819.4Z"/>
                    </svg>
                    <span class="sr-only">Previous Podcast</span>
                </button>
                <div id="tooltip-previous" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Previous Podcast
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>

                <button data-tooltip-target="tooltip-pause" type="button" class="inline-flex items-center justify-center p-2.5 mx-2 font-medium bg-pink-600 rounded-full hover:bg-pink-700 group focus:ring-4 focus:ring-pink-300 focus:outline-none dark:focus:ring-pink-800" @click="playing = !playing">
                    <svg v-if="!playing" class="w-3 h-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 10 16">
                        <path fill-rule="evenodd" d="M0 .8C0 .358.32 0 .714 0h1.429c.394 0 .714.358.714.8v14.4c0 .442-.32.8-.714.8H.714a.678.678 0 0 1-.505-.234A.851.851 0 0 1 0 15.2V.8Zm7.143 0c0-.442.32-.8.714-.8h1.429c.19 0 .37.084.505.234.134.15.209.354.209.566v14.4c0 .442-.32.8-.714.8H7.857c-.394 0-.714-.358-.714-.8V.8Z" clip-rule="evenodd"/>
                    </svg>
                    <svg v-else class="w-3 h-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 10 16">
                    <path d="M0 .984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L1.506.139A1 1 0 0 0 0 .984Z"/>    </svg>
                    <span class="sr-only">{{ playing ? 'Pause' : 'Play' }} Podcast</span>
                </button>

                <button data-tooltip-target="tooltip-next" type="button" class="p-2.5 group rounded-full hover:bg-pink-200 mr-1 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 12 16">
                        <path d="M11 0a1 1 0 0 0-1 1v5.7a2.028 2.028 0 0 0-.177-.194L3.33.732A2 2 0 0 0 0 2.227v11.546A1.977 1.977 0 0 0 1.181 15.6a1.982 1.982 0 0 0 2.147-.33l6.5-5.773A1.88 1.88 0 0 0 10 9.3V15a1 1 0 1 0 2 0V1a1 1 0 0 0-1-1Z"/>
                    </svg>
                    <span class="sr-only">Next Podcast</span>
                </button>
                <div id="tooltip-next" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Next Podcast
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
                <button data-tooltip-target="tooltip-restart" type="button" class="p-2.5 group rounded-full hover:bg-pink-200 mr-1 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"/>
                    </svg>
                    <span class="sr-only">Restart Podcast</span>
                </button>
                <div id="tooltip-restart" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Restart Podcast
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
            </div>
            <div class="flex items-center justify-between space-x-2">
                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">3:45</span>
                <div class="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-800">
                    <div class="bg-pink-600 h-1.5 rounded-full" style="width: 65%"></div>
                </div>
                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">5:00</span>
            </div>
        </div>
    </div>
    <div class="items-center justify-center hidden ml-auto md:flex">
        <button data-tooltip-target="tooltip-playlist" type="button" class="p-2.5 group rounded-full hover:bg-pink-200 mr-1 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 16">
                <path d="M14.316.051A1 1 0 0 0 13 1v8.473A4.49 4.49 0 0 0 11 9c-2.206 0-4 1.525-4 3.4s1.794 3.4 4 3.4 4-1.526 4-3.4a2.945 2.945 0 0 0-.067-.566c.041-.107.064-.22.067-.334V2.763A2.974 2.974 0 0 1 16 5a1 1 0 0 0 2 0C18 1.322 14.467.1 14.316.051ZM10 3H1a1 1 0 0 1 0-2h9a1 1 0 1 1 0 2Z"/>
                <path d="M10 7H1a1 1 0 0 1 0-2h9a1 1 0 1 1 0 2Zm-5 4H1a1 1 0 0 1 0-2h4a1 1 0 1 1 0 2Z"/>
            </svg>
            <span class="sr-only">View playlist</span>
        </button>
        <div id="tooltip-playlist" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            View playlist
            <div class="tooltip-arrow" data-popper-arrow></div>
        </div>

      
        <button data-tooltip-target="tooltip-volume" type="button" class="p-2.5 group rounded-full hover:bg-pink-200 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M10.836.357a1.978 1.978 0 0 0-2.138.3L3.63 5H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h1.63l5.07 4.344a1.985 1.985 0 0 0 2.142.299A1.98 1.98 0 0 0 12 15.826V2.174A1.98 1.98 0 0 0 10.836.357Zm2.728 4.695a1.001 1.001 0 0 0-.29 1.385 4.887 4.887 0 0 1 0 5.126 1 1 0 0 0 1.674 1.095A6.645 6.645 0 0 0 16 9a6.65 6.65 0 0 0-1.052-3.658 1 1 0 0 0-1.384-.29Zm4.441-2.904a1 1 0 0 0-1.664 1.11A10.429 10.429 0 0 1 18 9a10.465 10.465 0 0 1-1.614 5.675 1 1 0 1 0 1.674 1.095A12.325 12.325 0 0 0 20 9a12.457 12.457 0 0 0-1.995-6.852Z"/>
            </svg>
            <span class="sr-only">Adjust volume</span>
        </button>
        <div id="tooltip-volume" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Adjust volume
            <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
    </div>
</div>

</template> -->

<script>
import { ref, onMounted, watch } from 'vue';
import { useStore } from '../stores/store';
import LoaderSpinner from './LoaderSpinner.vue';

export default {
  name: 'PodcastPlayer',
  components: {
    LoaderSpinner,
  },
  props: ['id'],
  setup(props) {
    console.log(props);
    const store = useStore();
    const show = ref(null);
    const currentEpisode = ref(store.currentEpisode);
    const playing = ref(false);
    const audioRef = ref(null);
    const loading = ref(false);

    const togglePlay = () => {
      if (playing.value) {
        audioRef.value.pause();
      } else {
        audioRef.value.play();
      }
      playing.value = !playing.value;
    };

    // onMounted(async () => {
    //   await store.fetchShow(props.id);
    //   show.value = store.show;

      
    // });
    onMounted(async () => {
        loading.value = true;
        await store.fetchShow(props.id);
        show.value = store.show;
        loading.value = false;

        if (store.currentEpisode && audioRef.value) {
            currentEpisode.value = store.currentEpisode;
            audioRef.value.src = store.currentEpisode.file;

        if (playing.value) {
        audioRef.value.play();
        }
    }
    });

    watch(() => store.currentEpisode, (newEpisode) => {
    if (newEpisode && audioRef.value) {
    currentEpisode.value = newEpisode;
    audioRef.value.src = newEpisode.file;
    if (playing.value) {
      audioRef.value.play();
        }
      }
    });

    return { show, currentEpisode, playing, audioRef, togglePlay, loading };
  },
};
</script>


<template>
    <!-- <audio :ref="audioRef"></audio> -->
    <!-- <audio ref="player" controls></audio> -->

    <div class="fixed bottom-0 left-0 z-50 grid w-full h-24 grid-cols-1 px-8 bg-white border-t border-gray-200 md:grid-cols-3 dark:bg-gray-700 dark:border-gray-600">
      <div class="items-center justify-center hidden mr-auto text-gray-500 dark:text-gray-400 md:flex">
        <LoaderSpinner v-if="loading" />
        <img v-if="show" class="h-8 mr-3 rounded" :src="show.image" :alt="show.title">
        <span v-if="show" class="text-sm">{{ show.title }}</span>

      </div>
      <div class="flex items-center w-full">
        <div class="w-full">
            <div class="flex items-center justify-center mx-auto mb-1">
                <button data-tooltip-target="tooltip-shuffle" type="button" class="p-2.5 group rounded-full hover:bg-pink-200 mr-1 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.484 6.166 13 4h6m0 0-3-3m3 3-3 3M1 14h5l1.577-2.253M1 4h5l7 10h6m0 0-3 3m3-3-3-3"/>
                    </svg>
                    <span class="sr-only">Shuffle Podcast</span>
                </button>
                <div id="tooltip-shuffle" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Shuffle Podcast
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
                <button data-tooltip-target="tooltip-previous" type="button" class="p-2.5 group rounded-full hover:bg-pink-200 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 12 16">
                        <path d="M10.819.4a1.974 1.974 0 0 0-2.147.33l-6.5 5.773A2.014 2.014 0 0 0 2 6.7V1a1 1 0 0 0-2 0v14a1 1 0 1 0 2 0V9.3c.055.068.114.133.177.194l6.5 5.773a1.982 1.982 0 0 0 2.147.33A1.977 1.977 0 0 0 12 13.773V2.227A1.977 1.977 0 0 0 10.819.4Z"/>
                    </svg>
                    <span class="sr-only">Previous Podcast</span>
                </button>
                <div id="tooltip-previous" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Previous Podcast
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>

                <button data-tooltip-target="tooltip-pause" type="button" class="inline-flex items-center justify-center p-2.5 mx-2 font-medium bg-pink-600 rounded-full hover:bg-pink-700 group focus:ring-4 focus:ring-pink-300 focus:outline-none dark:focus:ring-pink-800" @click="playing = !playing">
                    <svg v-if="!playing" class="w-3 h-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 10 16">
                        <path fill-rule="evenodd" d="M0 .8C0 .358.32 0 .714 0h1.429c.394 0 .714.358.714.8v14.4c0 .442-.32.8-.714.8H.714a.678.678 0 0 1-.505-.234A.851.851 0 0 1 0 15.2V.8Zm7.143 0c0-.442.32-.8.714-.8h1.429c.19 0 .37.084.505.234.134.15.209.354.209.566v14.4c0 .442-.32.8-.714.8H7.857c-.394 0-.714-.358-.714-.8V.8Z" clip-rule="evenodd"/>
                    </svg>
                    <svg v-else class="w-3 h-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 10 16">
                    <path d="M0 .984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L1.506.139A1 1 0 0 0 0 .984Z"/>    </svg>
                    <span class="sr-only">{{ playing ? 'Pause' : 'Play' }} Podcast</span>
                </button>

                <button data-tooltip-target="tooltip-next" type="button" class="p-2.5 group rounded-full hover:bg-pink-200 mr-1 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 12 16">
                        <path d="M11 0a1 1 0 0 0-1 1v5.7a2.028 2.028 0 0 0-.177-.194L3.33.732A2 2 0 0 0 0 2.227v11.546A1.977 1.977 0 0 0 1.181 15.6a1.982 1.982 0 0 0 2.147-.33l6.5-5.773A1.88 1.88 0 0 0 10 9.3V15a1 1 0 1 0 2 0V1a1 1 0 0 0-1-1Z"/>
                    </svg>
                    <span class="sr-only">Next Podcast</span>
                </button>
                <div id="tooltip-next" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Next Podcast
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
                <button data-tooltip-target="tooltip-restart" type="button" class="p-2.5 group rounded-full hover:bg-pink-200 mr-1 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"/>
                    </svg>
                    <span class="sr-only">Restart Podcast</span>
                </button>
                <div id="tooltip-restart" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Restart Podcast
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
            </div>
            <div class="flex items-center justify-between space-x-2">
                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">3:45</span>
                <div class="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-800">
                    <div class="bg-pink-600 h-1.5 rounded-full" style="width: 65%"></div>
                </div>
                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">5:00</span>
            </div>
        </div>
    </div>
    <div class="items-center justify-center hidden ml-auto md:flex">
        <button data-tooltip-target="tooltip-playlist" type="button" class="p-2.5 group rounded-full hover:bg-pink-200 mr-1 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 16">
                <path d="M14.316.051A1 1 0 0 0 13 1v8.473A4.49 4.49 0 0 0 11 9c-2.206 0-4 1.525-4 3.4s1.794 3.4 4 3.4 4-1.526 4-3.4a2.945 2.945 0 0 0-.067-.566c.041-.107.064-.22.067-.334V2.763A2.974 2.974 0 0 1 16 5a1 1 0 0 0 2 0C18 1.322 14.467.1 14.316.051ZM10 3H1a1 1 0 0 1 0-2h9a1 1 0 1 1 0 2Z"/>
                <path d="M10 7H1a1 1 0 0 1 0-2h9a1 1 0 1 1 0 2Zm-5 4H1a1 1 0 0 1 0-2h4a1 1 0 1 1 0 2Z"/>
            </svg>
            <span class="sr-only">View playlist</span>
        </button>
        <div id="tooltip-playlist" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            View playlist
            <div class="tooltip-arrow" data-popper-arrow></div>
        </div>

      
        <button data-tooltip-target="tooltip-volume" type="button" class="p-2.5 group rounded-full hover:bg-pink-200 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M10.836.357a1.978 1.978 0 0 0-2.138.3L3.63 5H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h1.63l5.07 4.344a1.985 1.985 0 0 0 2.142.299A1.98 1.98 0 0 0 12 15.826V2.174A1.98 1.98 0 0 0 10.836.357Zm2.728 4.695a1.001 1.001 0 0 0-.29 1.385 4.887 4.887 0 0 1 0 5.126 1 1 0 0 0 1.674 1.095A6.645 6.645 0 0 0 16 9a6.65 6.65 0 0 0-1.052-3.658 1 1 0 0 0-1.384-.29Zm4.441-2.904a1 1 0 0 0-1.664 1.11A10.429 10.429 0 0 1 18 9a10.465 10.465 0 0 1-1.614 5.675 1 1 0 1 0 1.674 1.095A12.325 12.325 0 0 0 20 9a12.457 12.457 0 0 0-1.995-6.852Z"/>
            </svg>
            <span class="sr-only">Adjust volume</span>
        </button>
        <div id="tooltip-volume" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Adjust volume
            <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
    </div>
</div>

</template>