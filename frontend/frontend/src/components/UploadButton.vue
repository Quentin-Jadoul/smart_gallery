<template>
    <button @click="$emit('click')" class="w-14 h-14 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full flex items-center justify-center text-2xl">
      +
    </button>
  </template>
  
<script>
  export default {
    name: 'UploadButton'
  }
</script>