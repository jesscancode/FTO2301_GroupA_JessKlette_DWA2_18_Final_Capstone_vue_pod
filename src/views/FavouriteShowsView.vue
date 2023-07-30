<script setup>
    import FavouriteShowList from '../components/FavouriteShowList.vue'
</script>

<template>
    <div class="p-8">
        <button
            type="button"
            class="text-2xl font-semibold hover:underline cursor-pointer"
        >
        Favourite Shows
        </button>

        <div class="py-1.5"></div>

        <div class="flex items-center">
          <FavouriteShowList />
        </div>
    </div>

   
</template>