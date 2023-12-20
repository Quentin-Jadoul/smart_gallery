<template>
    <div class="flex flex-col items-center">
      <div class="w-32 h-32 bg-gray-200 rounded-full mb-2">
        <img class="w-full h-full object-cover rounded-full" :src="picture" :alt="name">
      </div>
      <div class="text-center">
        <p class="font-bold text-lg">{{ displayName }}</p>
      </div>
    </div>
</template>
  
<script>
export default {
  props: ['name', 'picture'],
  name: 'PersonCard',
  computed: {
    displayName() {
      return this.name.includes('Unknown-') ? '' : this.name;
    }
  }
}
</script>