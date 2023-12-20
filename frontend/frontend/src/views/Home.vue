<template>
    <div class="p-4">
        <input type="text" v-model="searchTerm" placeholder="Search..." class="p-2 rounded w-full bg-gray-200" @input="search" />
        <div class="grid grid-cols-4 gap-4 mt-4">
            <div v-for="picture in filteredPictures" :key="picture.id">
                <img class="w-full h-48 object-contain" :src="picture.Path" alt="Picture" @click="openImageDetailModal(picture)" />
            </div>
        </div>
        <UploadButton @click="openUploadModal" class="fixed bottom-4 right-4" />
        <UploadModal ref="uploadModal" />
        <ImageDetailModal ref="detailModal" :picture="selectedPicture" />
    </div>
</template>
  
<script>
import UploadButton from '@/components/UploadButton.vue';
import UploadModal from '@/components/UploadModal.vue';
import ImageDetailModal from '@/components/ImageDetailModal.vue';
import http from '../http';

export default {
    components: {
        UploadButton,
        UploadModal,
        ImageDetailModal
    },
    data() {
        return {
            selectedPicture: null,
            pictures_paths: [],
            searchTerm: '', // add this line
            filteredPictures: [] // add this line
        }
    },
    async mounted() {
        try {
            const response = await http.get('/SmartGalleryAPI/PhotoApi');
            this.pictures_paths = response.data.map(picture => ({
                ...picture,
                Path: `http://127.0.0.1:8000/${picture.Path}`
            }));
            this.filteredPictures = this.pictures_paths; // add this line
        } catch (error) {
            // Handle errors
        }
    },
    methods: {
        openImageDetailModal(picture) {
            this.selectedPicture = picture;
            this.$refs.detailModal.open(picture);
        },
        openUploadModal() {
            this.$refs.uploadModal.open();
        },
        search() { // add this method
            this.filteredPictures = this.pictures_paths.filter(picture =>
                picture.Tag.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        }
    }
}
</script>