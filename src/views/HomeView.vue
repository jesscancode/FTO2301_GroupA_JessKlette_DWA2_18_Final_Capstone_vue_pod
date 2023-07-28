<script setup>
    import PreviewList from '../components/PreviewList.vue'
</script>

<template>
    <div class="p-8">
        <button
            type="button"
            class="text-2xl font-semibold hover:underline cursor-pointer"
        >
            Podcast Library
        </button>

        <div class="py-1.5"></div>

        <div class="flex items-center">
          <PreviewList />
        </div>
    </div>

   
</template>